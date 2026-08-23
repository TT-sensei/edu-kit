import { readFile } from 'node:fs/promises';

const OWNER = 'TT-sensei';
const REQUIRED_IDS = ['components', 'effects', 'sounds', 'assets', 'navi-characters'];
const REQUIRED_SKILL_SECTIONS = ['## いつ使うか', '## 最初に確認するもの', '## 使用候補', '## 手順', '## 完了条件'];
const SKILLS = [
  'create-learning-app',
  'improve-existing-app',
  'add-navi-character',
  'add-feedback',
  'add-rewards',
  'learning-entrance-effects',
  'tablet-optimization',
  'final-review'
];

const failures = [];
const passes = [];

function pass(message) {
  passes.push(message);
  console.log(`✓ ${message}`);
}

function fail(message) {
  failures.push(message);
  console.error(`✗ ${message}`);
}

async function request(url, label, { json = false } = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'TT-sensei-edu-kit-verifier'
      },
      redirect: 'follow'
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const body = json ? await response.json() : await response.text();
    pass(label);
    return body;
  } catch (error) {
    fail(`${label}: ${error.message}`);
    return null;
  }
}

function repoName(url) {
  const match = url.match(/github\.com\/([^/]+\/[^/#]+)/);
  return match?.[1]?.replace(/\.git$/, '') ?? null;
}

async function verifyManifest() {
  let manifest;
  try {
    manifest = JSON.parse(await readFile(new URL('../edu-kit.json', import.meta.url), 'utf8'));
    pass('edu-kit.json is valid JSON');
  } catch (error) {
    fail(`edu-kit.json: ${error.message}`);
    return null;
  }

  const ids = manifest.resources?.map((resource) => resource.id) ?? [];
  for (const id of REQUIRED_IDS) {
    ids.includes(id) ? pass(`resource id: ${id}`) : fail(`missing resource id: ${id}`);
  }
  if (ids.length !== REQUIRED_IDS.length) fail(`expected ${REQUIRED_IDS.length} resources, found ${ids.length}`);
  return manifest;
}

async function verifyResource(resource) {
  const fullName = repoName(resource.repository);
  if (!fullName) {
    fail(`${resource.id}: invalid repository URL`);
    return;
  }
  await request(`https://api.github.com/repos/${fullName}`, `${resource.id}: repository`, { json: true });
  const urls = Object.entries(resource).filter(([key, value]) =>
    ['catalog', 'entry', 'guide', 'manifest'].includes(key) && typeof value === 'string'
  );
  for (const [key, url] of urls) await request(url, `${resource.id}: ${key}`);
}

async function verifyEffects() {
  const directory = await request(
    `https://api.github.com/repos/${OWNER}/edu-effects/contents/css`,
    'edu-effects: css directory',
    { json: true }
  );
  const guide = await request(
    `https://raw.githubusercontent.com/${OWNER}/edu-effects/main/AI-GUIDE.md`,
    'edu-effects: AI guide'
  );
  if (!directory || !guide) return;
  const cssFiles = directory.filter((item) => item.type === 'file' && item.name.endsWith('.css')).map((item) => item.name);
  const undocumented = cssFiles.filter((name) => !guide.includes(name));
  if (undocumented.length) fail(`edu-effects: undocumented CSS: ${undocumented.join(', ')}`);
  else pass(`edu-effects: all ${cssFiles.length} active CSS files are documented`);
}

async function verifyNaviCharacters() {
  const catalog = await request(
    `https://raw.githubusercontent.com/${OWNER}/navi-character-/main/catalog.json`,
    'navi-character: catalog',
    { json: true }
  );
  const tree = await request(
    `https://api.github.com/repos/${OWNER}/navi-character-/git/trees/main?recursive=1`,
    'navi-character: repository tree',
    { json: true }
  );
  if (!catalog || !tree?.tree) return;
  const paths = new Set(tree.tree.filter((item) => item.type === 'blob').map((item) => item.path));
  const expected = [];
  for (const [id, character] of Object.entries(catalog.characters ?? {})) {
    expected.push(`${catalog.basePath}/${id}/${character.reference}`);
    for (const pose of character.fullbody ?? []) expected.push(`${catalog.basePath}/${id}/fullbody/${pose}.png`);
    for (const expression of character.expressions ?? []) expected.push(`${catalog.basePath}/${id}/expressions/${expression}.png`);
  }
  for (const file of catalog.groups?.files ?? []) expected.push(`${catalog.groups.basePath}/${file}`);
  const missing = expected.filter((path) => !paths.has(path));
  if (missing.length) fail(`navi-character: ${missing.length} catalog paths missing\n  ${missing.join('\n  ')}`);
  else pass(`navi-character: all ${expected.length} catalog paths exist`);
}

async function verifySkills() {
  for (const skill of SKILLS) {
    try {
      const source = await readFile(new URL(`../skills/${skill}/SKILL.md`, import.meta.url), 'utf8');
      const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatter) {
        fail(`${skill}: missing YAML frontmatter`);
        continue;
      }
      const declaredName = frontmatter[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
      const description = frontmatter[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();
      if (declaredName !== skill) fail(`${skill}: frontmatter name must match folder name`);
      if (!description) fail(`${skill}: missing frontmatter description`);
      const missing = REQUIRED_SKILL_SECTIONS.filter((section) => !source.includes(section));
      if (missing.length) fail(`${skill}: missing ${missing.join(', ')}`);
      else if (declaredName === skill && description) pass(`${skill}: frontmatter and required sections`);
    } catch (error) {
      fail(`${skill}: ${error.message}`);
    }
  }
}

const manifest = await verifyManifest();
if (manifest) {
  for (const resource of manifest.resources) await verifyResource(resource);
}
await verifyEffects();
await verifyNaviCharacters();
await verifySkills();

console.log(`\n${passes.length} passed, ${failures.length} failed`);
if (failures.length) process.exitCode = 1;
