# EDU KIT — AI向け統合ガイド

## この文書の役割

小学校向けWeb教材を作るAIは、最初にこの文書を読みます。ここは4つの共通資産を一つに複製した場所ではなく、必要な資産を正しく選び、実在する実装へ案内する正本です。

## 絶対ルール

1. READMEの説明だけでAPI、CSSクラス、音ID、画像URLを推測しない。
2. 参照先の実装ファイルと公開カタログで、利用する名前とパスの実在を確認する。
3. 4資産すべてを必ず使わない。学習目標に必要な資産だけを選ぶ。
4. 既存部品と同じ処理を教材側で再実装しない。
5. 教材固有の問題データ、画面文言、正答、達成条件は教材リポジトリ側に置く。
6. Managerの内部へDOM、CSS、音、画像を混在させない。
7. 保存は教材固有のnamespaceを指定した`StorageManager`を使い、`localStorage`を各所から直接操作しない。
8. HTML / CSS / Vanilla JavaScriptだけで動かし、npm、ビルド、APIキー、外部DBを前提にしない。
9. タッチとマウスに対応する。並べ替えも長押し・ドラッグだけを必須にしない。

## 参照順序

1. 学年、教科、学習目標、問題形式、1回の問題数、保存の要否を整理する。
2. この文書の「目的別レシピ」で候補を絞る。
3. `edu-components`の`index.js`と実装で必要なロジックを確認する。
4. `edu-effects`のAIガイドとカタログで、読み込むCSSファイルとクラスを確認する。
5. 音が必要な場合だけ`sounds.js`でIDを確認する。
6. 報酬画像が必要な場合だけBadge Labで画像を開き、URLをコピーする。
7. イベントを接続点として教材側で組み合わせる。
8. タブレット横向き、タッチ、キーボード、`prefers-reduced-motion`で確認する。

## 4資産の役割と正本

| 資産 | 担当 | 実装・ガイド | 公開カタログ |
| --- | --- | --- | --- |
| `edu-components` | 動作・ロジック・状態管理 | [index.js](https://github.com/TT-sensei/edu-components/blob/main/index.js) / [AI-GUIDE](https://github.com/TT-sensei/edu-components/blob/main/AI-GUIDE.md) | [Catalog](https://tt-sensei.github.io/edu-components/) |
| `edu-effects` | UI・CSS・視覚演出 | [css/](https://github.com/TT-sensei/edu-effects/tree/main/css) / [AI-GUIDE](https://github.com/TT-sensei/edu-effects/blob/main/AI-GUIDE.md) | [Catalog](https://tt-sensei.github.io/edu-effects/) |
| `sounds-recipe-` | Web Audio APIの効果音 | [sounds.js](https://github.com/TT-sensei/sounds-recipe-/blob/main/sounds.js) / [SOUND_GUIDE](https://github.com/TT-sensei/sounds-recipe-/blob/main/SOUND_GUIDE.md) | [Catalog](https://tt-sensei.github.io/sounds-recipe-/) |
| `edu-assets` | バッジ・エレメント・コレクション画像 | [assets/](https://github.com/TT-sensei/edu-assets/tree/main/assets) | [Badge Lab](https://tt-sensei.github.io/edu-assets/) |

機械可読の入口は[`edu-kit.json`](edu-kit.json)です。

## edu-componentsの選び方

| 目的 | 部品 |
| --- | --- |
| 画面切り替え | `ScreenManager` |
| ランダム・順番出題、絞り込み | `QuestionPool` |
| 文字列・数値・複数候補の判定 | `AnswerChecker` |
| 2〜4択 | `ChoiceQuestion` |
| ○× | `TrueFalseQuestion` |
| 文字入力 | `InputQuestion` |
| 数字入力・教材内テンキー | `NumberInput` |
| タップ式並べ替え | `SortQuestion` |
| 複数選択 | `MultiSelect` |
| 得点・正答率 | `ScoreManager` |
| 連続正解 | `ComboManager` |
| 間違い直し | `RetryWrong` |
| カウントダウン・計時 | `CountdownTimer` / `CountUpTimer` |
| 時間制チャレンジ | `TimeAttack` / `Challenge60` |
| 結果ランク・新記録 | `RankCalculator` / `NewRecordJudge` |
| namespace単位の保存 | `StorageManager` |
| 完了状況・進捗率 | `ProgressManager` |
| 数値レベル | `LevelManager` |
| ステージ・単元の解放 | `UnlockManager` |
| 達成項目 | `AchievementManager` |
| バッジ定義・獲得状態 | `BadgeManager` |

基本読み込み：

```js
import {
  EDU_EVENTS,
  ScreenManager,
  QuestionPool,
  ChoiceQuestion,
  ScoreManager
} from 'https://tt-sensei.github.io/edu-components/index.js';
```

部品のコンストラクタ、メソッド、イベントdetailは必ず[実装](https://github.com/TT-sensei/edu-components/tree/main/js)または[専用AIガイド](https://github.com/TT-sensei/edu-components/blob/main/AI-GUIDE.md)で再確認します。

## edu-effectsの選び方

最初に[公開カタログ](https://tt-sensei.github.io/edu-effects/)で見た目を確認し、[CSS一覧](https://github.com/TT-sensei/edu-effects/tree/main/css)から必要なファイルだけを読み込みます。

- 基本UI・学習UI：`edu-effects.css`、`edu-learning.css`
- 正誤や結果：`edu-feedback.css`、`edu-effects-library.css`
- 問題画面の共通構造：`edu-effects-learning-shell.css`
- 問い・ヒント・振り返り：`edu-effects-learning-panels.css`、`edu-effects-21st-composer.css`
- 操作と画面遷移：`edu-effects-interaction-kit.css`
- 学習向けモーション：`edu-effects-learning-motion.css`
- 触った感触：`edu-effects-kinetic.css`
- 追加UI：`edu-ui-variants.css`
- 3D・画像フィルター：`edu-effects-3d.css`、`edu-effects-filters.css`

ここにあるファイル名だけではクラスの実在確認になりません。使用クラスはCSS本体またはカタログのコピー機能で確認します。

## sounds-recipe-の使い方

音声ファイル集ではありません。`sounds.js`がexportする`soundList`から実在IDを探し、各レシピの`play()`を呼びます。`playSound()`という共通APIはありません。

```js
import { soundList } from 'https://tt-sensei.github.io/sounds-recipe-/sounds.js';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

async function playRecipe(id, volume = 0.25) {
  if (audioContext.state === 'suspended') await audioContext.resume();
  const recipe = soundList.find((item) => item.id === id);
  if (!recipe) return false;
  recipe.play(audioContext, volume);
  return true;
}
```

代表的な確認済みID：`correct`、`wrong`、`softFail`、`combo3`、`combo5`、`combo10`、`warning`、`timeUpSoft`、`badge`、`rareBadge`、`levelup`、`unlock`、`mission`、`allclear`。全IDは[sounds.js](https://github.com/TT-sensei/sounds-recipe-/blob/main/sounds.js)または[カタログ](https://tt-sensei.github.io/sounds-recipe-/)で確認します。

AudioContextは最初のユーザー操作後に`resume()`し、音量・ミュート設定を教材側に用意します。

## edu-assetsの使い方

- 共通・教科別：`assets/badges/common/`、`japanese/`、`math/`、`science/`、`social/`
- エレメント：`assets/elements/<属性>/level-1|level-2|level-3/badge.png`
- コレクション：`assets/collections/<シリーズ>/common|rare|super-rare|secret/<項目>/badge.png`

フォルダ名からURLを組み立てて推測しません。[Badge Lab](https://tt-sensei.github.io/edu-assets/)で画像を開き、「URLをコピー」で実在URLを取得します。

## イベントを連携の中心にする

イベント名の正本は[`js/core/events.js`](https://github.com/TT-sensei/edu-components/blob/main/js/core/events.js)です。Managerはロジックと状態を担当し、イベントを受けた教材側がCSS演出、音、画像表示を接続します。

| イベント | 主な用途 | 接続例 |
| --- | --- | --- |
| `edu:correct` | 正解 | 正解演出 + `correct` |
| `edu:wrong` | 不正解 | 不正解演出 + `wrong` / `softFail` |
| `edu:screenchange` | 画面切替 | ページ遷移演出 |
| `edu:combo` | コンボ更新 | コンボ表示 + `combo3` / `combo5` / `combo10` |
| `edu:timerwarning` | 残り時間警告 | タイマー警告 + `warning` |
| `edu:timeup` | 時間切れ | 終了表示 + `timeUpSoft` |
| `edu:newrecord` | 新記録 | 記録表示 + 記録用サウンド |
| `edu:progress` | 進捗更新 | 進捗バー更新 |
| `edu:levelchange` | レベル変更 | レベルアップ演出 + `levelup` |
| `edu:unlock` | 項目解放 | 解放演出 + `unlock` |
| `edu:achievement` | 新しい達成 | 達成演出 + `mission` |
| `edu:badge` | 新しいバッジ獲得 | `event.detail.badge.image` + 獲得演出 + `badge` |

イベント名とdetailは実装更新の可能性があるため、利用時に正本を確認します。

## 目的別レシピ

### 基本クイズ

- logic：`ScreenManager`、`QuestionPool`、問題形式、`ScoreManager`
- style：問題UI、選択肢、正誤フィードバック
- sound：`correct`、`wrong`または`softFail`
- asset：報酬が必要な場合だけ

### 60秒チャレンジ

- logic：`QuestionPool`、`Challenge60`、`ScoreManager`、`ComboManager`
- style：タイマー、スコア、コンボ、ランクカード
- sound：`correct`、コンボ音、`warning`、`timeUpSoft`
- asset：新記録や達成に報酬を付ける場合だけ

### バッジ付き教材

- logic：`StorageManager`、`AchievementManager`、`BadgeManager`
- style：バッジ獲得・達成演出
- sound：`badge`、必要なら`rareBadge`、`mission`
- asset：Badge Labで選んだ実在URL

### 探究・振り返り

- logic：`ScreenManager`、`StorageManager`、`ProgressManager`
- style：learning shell / panels / composerから必要なもの
- sound：節目に必要な場合だけ
- asset：発見図鑑や達成報酬を付ける場合だけ

## 完成前チェック

- 学習目標と問題形式が一致している。
- 使用するimport名、メソッド、イベント名が実装に存在する。
- 読み込むCSSファイルと利用クラスが実在する。
- 音IDが`soundList`に存在する。
- 画像URLをBadge Labまたは実ファイルで確認した。
- 共通資産を教材側へ重複実装していない。
- 問題データと処理が分離されている。
- 保存namespaceが教材固有である。
- タブレット横向きで主要操作が一画面に収まり、必要な場所だけがスクロールする。
- 色だけで正誤を伝えていない。
- `prefers-reduced-motion`でも意味が伝わる。
- タッチ、マウス、必要に応じてキーボードで操作できる。

## AIへの短い依頼テンプレート

```text
制作前に https://github.com/TT-sensei/edu-kit を起点として確認してください。
AI-GUIDE.mdに従い、学習目標に必要な共通資産だけを選んでください。
READMEだけで判断せず、参照先の実装と公開カタログでAPI、イベント、CSSクラス、音ID、画像URLの実在を確認してください。
既存部品を教材側で再実装せず、教材固有の問題データと画面文言は教材側に置いてください。
```
