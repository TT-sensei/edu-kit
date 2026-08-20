const recipes = {
  quiz: { title: '基本クイズ', description: '選択式・入力式など、通常の反復学習。', items: [
    ['LOGIC', 'ScreenManager / QuestionPool / 問題形式 / ScoreManager', '#2762d4'],
    ['STYLE', '問題UI / 選択肢 / 正解・不正解フィードバック', '#ee6a52'],
    ['SOUND', 'correct / wrong または softFail', '#c98917'],
    ['ASSET', '報酬を付ける場合だけBadge Labから選択', '#2f8b68']
  ]},
  challenge: { title: '60秒チャレンジ', description: '制限時間内にテンポよく答え、記録更新を目指す教材。', items: [
    ['LOGIC', 'QuestionPool / Challenge60 / ScoreManager / ComboManager', '#2762d4'],
    ['STYLE', 'タイマー / スコア / コンボ / ランクカード', '#ee6a52'],
    ['SOUND', 'correct / combo3・5・10 / warning / timeUpSoft', '#c98917'],
    ['ASSET', '新記録やランク達成の報酬に必要なら追加', '#2f8b68']
  ]},
  badge: { title: 'バッジ付き教材', description: '学習の達成を保存し、実在する報酬画像を獲得する教材。', items: [
    ['LOGIC', 'StorageManager / AchievementManager / BadgeManager', '#2762d4'],
    ['STYLE', 'effect-badge-unlock / achievement-glow', '#ee6a52'],
    ['SOUND', 'badge / rareBadge / mission', '#c98917'],
    ['ASSET', 'Badge Labで画像を選び、実在URLをコピー', '#2f8b68']
  ]},
  explore: { title: '探究・振り返り', description: '問い、ヒント、根拠、振り返りを落ち着いて記録する教材。', items: [
    ['LOGIC', 'ScreenManager / StorageManager / ProgressManager', '#2762d4'],
    ['STYLE', 'learning-panels / 21st-composer / learning-shell', '#ee6a52'],
    ['SOUND', '操作や完了の節目だけ。不要なら使わない', '#c98917'],
    ['ASSET', '発見図鑑や単元達成を付ける場合だけ追加', '#2f8b68']
  ]}
};

const panel = document.querySelector('#recipe-panel');
const renderRecipe = (key) => {
  const recipe = recipes[key];
  panel.innerHTML = `<h3>${recipe.title}</h3><p>${recipe.description}</p><div class="recipe-columns">${recipe.items.map(([label, body, color]) => `<div class="recipe-item" style="--color:${color}"><small>${label}</small><p>${body}</p></div>`).join('')}</div>`;
};

document.querySelectorAll('[data-recipe]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-recipe]').forEach((item) => item.setAttribute('aria-selected', 'false'));
    button.setAttribute('aria-selected', 'true');
    renderRecipe(button.dataset.recipe);
  });
});
renderRecipe('quiz');

const form = document.querySelector('#prompt-builder');
const output = document.querySelector('#prompt-output');
const result = document.querySelector('#prompt-result');
const toast = document.querySelector('#toast');
const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 1800);
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const subject = document.querySelector('#subject').value.trim() || '小学校向け';
  const purpose = document.querySelector('#purpose').value.trim() || 'Web教材';
  const notes = document.querySelector('#notes').value.trim();
  const features = [...form.querySelectorAll('[name="feature"]:checked')].map((item) => item.value);
  output.value = `次の教材を作成してください。\n\n【教材】${subject}「${purpose}」\n【追加要素】${features.length ? features.join('、') : '学習目標に必要なものだけ'}${notes ? `\n【補足】${notes}` : ''}\n\n制作前に、教材制作共通基盤 EDU KIT を起点として確認してください。\nhttps://github.com/TT-sensei/edu-kit\n\n必ず edu-kit/AI-GUIDE.md に従い、必要な資産だけを選んでください。READMEだけで判断せず、参照先の実装と公開カタログで、API・イベント名・CSSクラス・音ID・画像URLが実在することを確認してください。既存部品を教材側で再実装せず、教材固有の問題データと画面文言は教材側に置いてください。HTML / CSS / Vanilla JavaScriptのみ、npm・ビルド・APIキー・外部DBなしで、タブレット横向きとタッチ操作に対応させてください。`;
  result.hidden = false;
  output.focus();
});

document.querySelector('#copy-prompt').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(output.value); showToast('依頼文をコピーしました'); }
  catch { output.select(); document.execCommand('copy'); showToast('依頼文をコピーしました'); }
});
