# 実運用パイロット: かなどっち？

## 対象

- 教材: `TT-sensei/kanadocchi-`
- 適用Skill: `improve-existing-app`、`add-feedback`、`add-navi-character`、`add-rewards`、`tablet-optimization`、`final-review`
- 保護対象: `questions.js`の問題データ・正答、選択判定、学習順序

## edu-kitから辿れた実装

| 目的 | 確認した正本 | 教材での利用 |
| --- | --- | --- |
| 出題・採点・保存 | edu-components `index.js` / AI-GUIDE | `QuestionPool`、`ChoiceQuestion`、`ScoreManager`、`StorageManager`、`ProgressManager`、`BadgeManager` |
| 学習UI・正誤 | edu-effects `css/` / AI-GUIDE | 基本UI、学習UI、正誤、モーション、UI variants |
| 効果音 | sounds-recipe- `sounds.js` | `soundList`からIDを検索し、失敗時も学習を継続 |
| 報酬 | edu-assets実在URL | 30バッジの定義を教材側に保持 |
| ナビキャラ | navi-character- `catalog.json` | 6人の実在IDと共通表情名を利用 |

## 確認結果

- 学習入口はステージ選択で、キャラクター・バッジより優先されている。
- 問題データは`questions.js`、処理は`app.js`に分離されている。
- 保存namespaceは`kanadocchi`で教材固有。
- 正解・不正解の両方で一定時間後に次問へ進み、停止しない構造。
- 問題中のナビキャラは補助表示、正誤画像は約52px基準の設計。
- 結果画面から再挑戦とホーム復帰の両方がある。
- 画像・音の失敗が学習ロジックを止めない構造になっている。

## パイロットで明確化したこと

1. Skillは単なるリンク集ではなく、作業の実行仕様であることをREADMEへ明記した。
2. 共通資産の詳細をedu-kitへ複製せず、正本確認を必須にした。
3. 5資産の入口と、CSS・キャラ画像の実在を自動検証できるようにした。
4. 既存教材では最初に保護対象を宣言し、最後に基本フローを回帰確認する順路を固定した。

## 継続確認

ブラウザの見た目・タッチ操作・読み上げは自動検証だけでは完結しません。教材を変更した回は、`final-review`に沿って実機またはブラウザで確認します。
