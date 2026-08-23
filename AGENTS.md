# edu-kit — AI Agent Entry Point

このリポジトリは、小学校向けWeb教材を作成・改修するAIのための設計ハブです。

## 最優先

**主役は学ぶ子ども。**

コード、AI、ゲーム、バッジ、音、演出、キャラクターはすべて学習を支える道具です。学習内容や学習導線より前に出してはいけません。

## 作業開始時の参照順

1. `DESIGN-PRINCIPLES.md` — 上位の教材設計原則
2. `AI-GUIDE.md` — 共通資産の実装・参照方法
3. 該当する `skills/*/SKILL.md` — 作業別の実行仕様
4. `edu-kit.json` — 機械可読の入口
5. 各資産リポジトリの実装・AIガイド — API、CSSクラス、ID、画像パスの実在確認

`skills/*/SKILL.md`は対応AIが直接読む作業手順です。自動読込に対応しない環境でも、同じファイルを依頼文と完了チェックとして使います。

## 共通資産

- `edu-components` — 問題、採点、進行、タイマー、保存などのロジック
- `edu-effects` — 学習UI、正誤、進捗、達成などの視覚表現
- `sounds-recipe-` — 学習を補助する効果音
- `edu-assets` — バッジ、コレクション、エレメント画像
- `navi-character-` — 励ます・褒める・案内するナビキャラクター

## Web画像の最優先ルール

**教材サイト・GitHub Pagesで画像を表示する場合は、軽量Web版を最優先する。**

- `edu-assets`：まず `assets/web/` 以下のWebPを使用する。
- `navi-character-`：まず `assets/web/` 以下のWebPを使用する。
- 原本PNG/JPGはマスター素材として保持し、通常のWeb表示では直接参照しない。
- 原本を使うのは、高解像度ダウンロード、印刷、制作・再編集、またはWeb版では不足する特殊用途に限る。
- Web版の実在を確認してからURLを使用し、画像パスを推測しない。
- Web版が存在しない場合のみ原本へフォールバックする。

## 基本ワークフロー

1. 学年・教科・学習目標を確認する
2. 子どもが繰り返す学習行動を決める
3. 既存教材なら壊してはいけない領域を特定する
4. 必要なSkillを選ぶ
5. edu-kitから必要な共通資産だけを選ぶ
6. 実在するAPI・CSS・ID・パスを確認して実装する
7. キャラクター・演出・報酬は最後に必要な分だけ加える
8. `skills/final-review/SKILL.md`に沿って回帰確認する

## 禁止・注意

- 学習内容を確認せずにデザインから作り始めない
- READMEだけを根拠にAPIやパスを推測しない
- edu-kitにある機能を全部使おうとしない
- 既存教材の問題データ、判定、保存を理由なく変更しない
- キャラクター、バッジ、ご褒美を学習入口より目立たせない
- 入口演出を通常の問題遷移やホーム復帰のたびに使わない
- 長押し・ドラッグだけを必須操作にしない
- npm、ビルド、APIキー、外部DBを教材本体の前提にしない
- 共通化済みの機能を教材側で重複実装しない
- Web表示で軽量版がある画像の大容量マスターPNG/JPGを理由なく直接参照しない

## Skill一覧

- `skills/create-learning-app/SKILL.md` — 新規教材を設計・作成
- `skills/improve-existing-app/SKILL.md` — 既存教材を安全に改善
- `skills/add-navi-character/SKILL.md` — ナビキャラを控えめに導入
- `skills/add-feedback/SKILL.md` — 正誤・達成フィードバックを設計
- `skills/add-rewards/SKILL.md` — バッジ・コレクション等を追加
- `skills/learning-entrance-effects/SKILL.md` — 意味のある節目だけに入口演出を使う
- `skills/tablet-optimization/SKILL.md` — PC・タブレット・スマホ最適化
- `skills/final-review/SKILL.md` — 最終点検・回帰確認

## 更新時の検証

5資産のURLやファイル構成、Skillを変更した場合は`MAINTENANCE.md`を確認し、次を実行します。

```bash
node scripts/verify-repositories.mjs
```

詳細仕様をedu-kitへ複製せず、各資産リポジトリを正本として維持します。

## 判断原則

迷った場合は、機能が多い案ではなく、**子どもが迷わず学び、考え、間違え、もう一度挑戦できる案**を選びます。

新しい教材で再利用できる良い仕組みが生まれた場合は、教材だけに閉じ込めず、共通資産へ還元できるか検討します。
