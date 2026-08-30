# EDU KIT

小学校向けWeb教材を、AIと人が同じ設計基盤から安全に作成・改修するためのハブです。

edu-kitは、共通資産を重複コピーする場所ではありません。学習目標に合う部品を選び、正本の実装・公開カタログ・実在する画像パスへ案内する「設計と確認の入口」です。

## まずここを見る

- [学習アプリ設計原則](DESIGN-PRINCIPLES.md)
- [AI開発プロトコル](DEVELOPMENT-PROTOCOL.md)
- [AI向け統合ガイド](AI-GUIDE.md)
- [AI Agent Entry Point](AGENTS.md)
- [ナビキャラ利用原則](NAVI-CHARACTER-GUIDELINES.md)
- [更新・検証ルール](MAINTENANCE.md)
- [機械可読マニフェスト](edu-kit.json)
- [公開サイト](https://tt-sensei.github.io/edu-kit/)

新しい教材の作成・改修では、設計原則とAI開発プロトコル、AI-GUIDEを確認し、学習目標・繰り返す学習行動・対象端末・保存の要否を決めてから、必要な資産だけを選びます。

## AI開発の基本線

AIは「いきなり書き換える」のではなく、次の6段階で作業します。

1. DISCOVER — 現状把握
2. PROTECT — 保護対象と影響範囲
3. DIAGNOSE — 原因特定と実装方針
4. IMPLEMENT — 小さく実装
5. VERIFY — 変更箇所の検証
6. REGRESSION — 回帰確認

特に既存教材では、問題・正答・判定・保存・学習順序を守り、不具合の原因が分からないまま全面書き換えで直したことにしません。実装したことではなく、確認できたことを完了条件にします。

## 最近の基本線

- **学習の入口を一目で分かるようにする。** 問題を解く、シミュレーションを試すなど、最初に選ぶ内容を明確にする。
- **タブレット横向きの1画面を基本にする。** 問題・操作・現在地を優先し、カードや絵を大きくしすぎない。スクロールは必要な場所だけにする。
- **子どもが止まらないようにする。** ヒント、解説、答えを見る、次へ進むなど、学習上意味のある脱出口を用意する。
- **シミュレーターは「条件を変える → 現象が変わる → 短く確かめる」。** 長い記録入力を主役にせず、何度も試せる構成にする。
- **できたことを残す。** 学習履歴、進捗、バッジ、記録などは教材固有の保存領域で管理し、リロード後も続きが分かるようにする。
- **補助要素は学習のそばに置く。** ナビキャラ、演出、音、報酬は問題・観察・操作より前に出さない。
- **Web画像は軽量WebPを優先する。** 原本は印刷・高解像度・再編集などに使い、軽量版がない場合だけ原本へフォールバックする。
- **実在しないものを推測しない。** API、CSSクラス、音ID、画像URL、キャラクター名は正本と公開カタログで確認する。

## 共通資産

| 資産 | 役割 | カタログ |
| --- | --- | --- |
| [edu-components](https://github.com/TT-sensei/edu-components) | 出題、判定、進行、採点、保存などのロジック | [開く](https://tt-sensei.github.io/edu-components/) |
| [edu-effects](https://github.com/TT-sensei/edu-effects) | 学習UI、レイアウト、正誤、進捗、視覚演出 | [開く](https://tt-sensei.github.io/edu-effects/) |
| [sounds-recipe-](https://github.com/TT-sensei/sounds-recipe-) | Web Audio APIによる教材用効果音 | [開く](https://tt-sensei.github.io/sounds-recipe-/) |
| [edu-assets](https://github.com/TT-sensei/edu-assets) | バッジ、コレクション、エレメントなどの画像 | [開く](https://tt-sensei.github.io/edu-assets/) |
| [navi-character-](https://github.com/TT-sensei/navi-character-) | 案内・励まし・達成を補助するキャラクター画像 | [開く](https://tt-sensei.github.io/navi-character-/) |

## 作業の順番

1. 学年・教科・単元・学習目標を確認する。
2. 新規作成か既存教材の改修かを判断し、既存の問題・判定・保存・画像リンクを確認する。
3. DEVELOPMENT-PROTOCOL.mdに沿って、保護対象・影響範囲・実装方針を整理する。
4. 子どもが繰り返す学習行動と、1回の学習単位を決める。
5. 必要な共通資産と使わない資産を決める。
6. 正本の実装と公開カタログで、API・クラス・ID・画像パスを確認する。
7. 学習骨格を作り、タブレット横向きの1画面で主要操作を確認する。
8. 必要な場合だけ、ナビキャラ・音・演出・バッジを加える。
9. 変更箇所を検証する。
10. 正解・不正解・つまずき・再挑戦・結果・ホーム復帰・リロードまで回帰確認する。
11. [更新・検証ルール](MAINTENANCE.md)に沿って点検する。

## skillsの位置づけ

skills/*/SKILL.mdは、Claude Code・CodexなどのAIエージェントが作業手順として直接読むための実行仕様です。自動読込に対応しないAIでも、AI-GUIDEと該当Skillを依頼文・チェックリストとして参照できます。

各Skillは「いつ使うか」「最初に確認するもの」「使用候補」「手順」「完了条件」を持ちます。複数該当する場合も必要なものだけを選び、最後にfinal-reviewを実行します。

## AIへの基本指示

~~~text
制作前に https://github.com/TT-sensei/edu-kit を起点として確認してください。
最初に DESIGN-PRINCIPLES.md、DEVELOPMENT-PROTOCOL.md、AI-GUIDE.md、該当する skills/*/SKILL.md を読んでください。
既存教材では、編集前に問題データ・正答・判定・保存・画像リンクを確認し、保護対象と影響範囲を明記してください。
不具合修正では、再現→原因特定→最小修正→変更箇所の検証→回帰確認の順で進めてください。
READMEだけで判断せず、参照先の実装と公開カタログでAPI、CSSクラス、音ID、画像URLの実在を確認してください。
タブレット横向きの1画面を基準に、子どもが迷わず学び、止まっても再開できる導線を作ってください。
実装しただけで完成扱いにせず、基本フロー・保存・リロード・端末表示・コンソールエラーまで確認してください。
~~~

## 整合性確認

Node.js 18以上で、外部パッケージを追加せずに実行できます。

~~~bash
node scripts/verify-repositories.mjs
~~~

5資産の入口、ガイド、主要ファイル、edu-effectsのCSS記載、navi-character-の画像パス、edu-kit内のSkill構造を確認します。詳細は[更新・検証ルール](MAINTENANCE.md)を参照してください。

## 実装の前提

- HTML / CSS / Vanilla JavaScript
- GitHub Pagesから直接動作する
- npm、ビルド、APIキー、外部DBを教材本体の前提にしない
- 新規教材の保存は教材固有namespaceを使い、既存教材の保存形式は理由なく変更しない
- localStorageを使う場合は、教材内で直接散在させず、原則としてStorageManagerに集約する
- EDU_EVENTSを共通資産間の接続点にする
- 問題データ、画面文言、正答、達成条件は教材側に置く
- タッチ、マウス、必要に応じてキーボードに対応する
- 長押しやドラッグだけを必須操作にしない
- prefers-reduced-motionでも学習の意味が伝わる

## License

このリポジトリのソフトウェアコードは、PolyForm Noncommercial License 1.0.0 の条件で提供します。

学校・家庭での非営利利用、教育機関での利用、研究・実験・個人学習などの非商用目的で利用できます。商用目的での利用は許可していません。

ライセンスの全文は [LICENSE](LICENSE) を確認してください。

このリポジトリから参照する `edu-components`、`edu-effects`、`edu-assets`、`navi-character-` などの共通資産には、それぞれのリポジトリに定める個別のライセンス・利用条件が適用されます。

Copyright © 2026 TT-sensei.
