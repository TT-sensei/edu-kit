# EDU KIT

**小学校向けWeb教材を、学習内容から設計し、安全に作成・改修するための統合ハブです。**

- 公開サイト：https://tt-sensei.github.io/edu-kit/
- AI向け統合ガイド：[AI-GUIDE.md](AI-GUIDE.md)
- 設計原則：[DESIGN-PRINCIPLES.md](DESIGN-PRINCIPLES.md)
- 開発プロトコル：[DEVELOPMENT-PROTOCOL.md](DEVELOPMENT-PROTOCOL.md)

EDU KITは、共通資産をコピーして集める場所ではありません。学ぶ内容と目標を整理し、必要な共通基盤を選び、各リポジトリの正本を確認して接続し、最後に動作を検証するための入口です。

## まず、何を学ぶ教材かを決める

教材の見た目やゲームの仕組みより先に、学年・教科・単元・学習目標をはっきりさせます。

**[JP Learning Taxonomy — 学習マップ](https://tt-sensei.github.io/jp-learning-taxonomy/site/)**  
国語・算数・社会・理科の学習項目と、前提・関連・発展のつながりを確認できます。[データとレビュー記録](https://github.com/TT-sensei/jp-learning-taxonomy)も参照できます。

この学習マップは、EDU KITの5つの共通基盤ではなく、教材の学習内容を検討するための参照先です。学年配当や項目間の関係には確認中の候補が含まれるため、公式の必修順序とみなさず、学習指導要領や教科書と照合してください。教材固有の学習目標・問題・正答・達成条件は、教材側で管理します。

## 5つの共通基盤と、学びのマップ

最初に [JP Learning Taxonomy — 学習マップ](https://tt-sensei.github.io/jp-learning-taxonomy/site/) で学習内容を確認し、その後に必要な共通基盤を選びます。学びのマップは6つ目の技術基盤ではなく、教材の内容を考えるための参照先です。5つの共通基盤すべてを使う必要はありません。学習目標に必要なものだけを選びます。

| 基盤 | 役割 | 参照先 |
| --- | --- | --- |
| **edu-components** | 出題、判定、状態、進行、タイマー、保存などのロジック | [公開カタログ](https://tt-sensei.github.io/edu-components/) · [AI-GUIDE](https://github.com/TT-sensei/edu-components/blob/main/AI-GUIDE.md) |
| **edu-effects** | ボタン、カード、正誤、進捗、アニメーションなどのUI・視覚表現 | [公開カタログ](https://tt-sensei.github.io/edu-effects/) · [AI-GUIDE](https://github.com/TT-sensei/edu-effects/blob/main/AI-GUIDE.md) |
| **sounds-recipe-** | 操作、正解、達成などを支える効果音 | [公開カタログ](https://tt-sensei.github.io/sounds-recipe-/) · [SOUND_GUIDE](https://github.com/TT-sensei/sounds-recipe-/blob/main/SOUND_GUIDE.md) |
| **edu-assets** | バッジ、コレクション、エレメントなどの画像 | [公開カタログ](https://tt-sensei.github.io/edu-assets/) |
| **navi-character-** | ナビキャラ、学習シーン、背景、ファンタジー・モンスター素材 | [公開カタログ](https://tt-sensei.github.io/navi-character-/) · [利用原則](NAVI-CHARACTER-GUIDELINES.md) |

役割は分けて考えます。たとえば正誤判定はcomponents、判定結果の見せ方はeffects、効果音はsounds、バッジ画像はassets、必要に応じたキャラクター案内はnavi-characterが担当します。状態や正誤を複数の場所で重複管理しないでください。

## 教材づくりの流れ

```text
学習マップ・教科書などで学習内容を確認
                    ↓
             学習目標と活動を決める
                    ↓
              EDU KITのガイドを読む
                    ↓
        必要な共通基盤だけを選び、正本を確認
                    ↓
             学習の骨格を先に実装
                    ↓
           必要な共通基盤を接続する
                    ↓
        動作・保存・表示・回帰を検証する
```

AIによる新規作成・改修では、次の6段階を基本にします。

1. **DISCOVER** — ソース、データ、公開画面、既存の動作を調べる
2. **PROTECT** — 変えてはいけない部分と影響範囲を整理する
3. **DIAGNOSE** — 原因を特定し、必要な変更を決める
4. **IMPLEMENT** — 目的に必要な範囲だけを実装する
5. **VERIFY** — 変更箇所が意図どおり動くか確認する
6. **REGRESSION** — 既存の学習、保存、再開などが壊れていないか確認する

## 先に読むファイル

| ファイル | 目的 |
| --- | --- |
| [AGENTS.md](AGENTS.md) | AIエージェントの作業開始点と参照順 |
| [DESIGN-PRINCIPLES.md](DESIGN-PRINCIPLES.md) | 子どもの学びを主役にする設計原則 |
| [DEVELOPMENT-PROTOCOL.md](DEVELOPMENT-PROTOCOL.md) | 調査から回帰確認までの作業手順 |
| [AI-GUIDE.md](AI-GUIDE.md) | 共通基盤の選び方と接続時の注意 |
| [NAVI-CHARACTER-GUIDELINES.md](NAVI-CHARACTER-GUIDELINES.md) | ナビキャラの役割と使用方針 |
| [MAINTENANCE.md](MAINTENANCE.md) | 更新責任、検証、自動確認と実運用確認 |
| [edu-kit.json](edu-kit.json) | AIやツールが参照する機械可読の設定 |
| [skills/](skills/) | 作業別の手順と完了条件 |

## 設計・実装で守ること

- **学習内容が主役。** 問題、観察対象、式、文章、主要操作を、キャラクターや演出より目立たせます。
- **タブレット横向き優先。** 問題・観察・主要操作・現在地を、可能な限り1画面で確認できるようにします。
- **子どもが自分で進める。** 入口で何をするか分かり、つまずいたときはヒント・解説・再挑戦などから次の行動へ進めるようにします。
- **答えを見たことと正答を分ける。** 答えの表示だけで正答やマスター達成として記録しません。
- **シミュレーターは変化をすぐ見せる。** 条件変更→観察→短い確認→再試行を基本にします。
- **保存は教材ごとに分ける。** 新規教材ではStorageManagerと教材固有namespaceを基本とし、既存教材の保存形式は調査せずに変更しません。
- **共通仕様を推測しない。** API、イベント、CSSクラス、音ID、画像パスは、各リポジトリの実装・ガイド・公開カタログで実在を確認します。
- **Web画像は軽量版を優先。** 軽量WebPの実在を確認して使用し、原本は印刷・編集など必要な用途に使います。
- **補助要素が失敗しても学習を止めない。** 画像・音・演出が読み込めなくても、主要な学習活動を続けられるようにします。
- **実装だけで完成にしない。** リロード、端末表示、基本フロー、コンソールエラー、実際の音再生など、必要な動作を確認します。

## AIに依頼するとき

まず [AI-GUIDE.md](AI-GUIDE.md) と該当するSkillを確認してください。依頼文には、学年・教科・単元・学習目標、変更したい箇所、保護したい既存機能を明記すると、不要な変更を防ぎやすくなります。

既存教材の改修では、問題データ・正答・判定・問題数・進行・保存・画像リンクを先に調査します。READMEの記載だけで実装を決めず、使う共通基盤の正本を確認してください。

## 整合性チェック

Node.js 18以上の環境で、追加パッケージなしで実行できます。

```bash
node scripts/verify-repositories.mjs
```

このスクリプトは、マニフェストの形式と基盤ID、各リポジトリや公開カタログ・ガイド・入口の応答、edu-effectsのCSS記載、navi-character-の画像パス、各Skillの構造などを確認します。学習内容の妥当性やブラウザ上の操作をすべて保証するものではありません。変更した教材では、[MAINTENANCE.md](MAINTENANCE.md)の手順に沿って実際の学習フローも確認してください。

## 利用条件

このリポジトリのソフトウェアコードは、[PolyForm Noncommercial License 1.0.0](LICENSE)の条件に従います。商用利用は許可されていません。

参照先の共通基盤・画像・音などには、それぞれのリポジトリのライセンスと利用条件が適用されます。利用前に各リポジトリの条件を確認してください。

Copyright © 2026 TT-sensei.
