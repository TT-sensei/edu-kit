# EDU KIT

小学校向けWeb教材の共通基盤を、AIと人が一つの入口から参照するためのハブです。

## まずここを見る

- [学習アプリ設計10原則](DESIGN-PRINCIPLES.md)
- [公開サイト](https://tt-sensei.github.io/edu-kit/)
- [AI向け統合ガイド](AI-GUIDE.md)
- [機械可読マニフェスト](edu-kit.json)

新しい教材の作成・改修では、まず設計10原則を確認し、学習目標と学習行動を決めてから、edu-kitの必要な資産を選びます。

5つの資産そのものは役割別リポジトリで管理し、`edu-kit`には選び方・実在する参照先・組み合わせ方を集約します。中身を重複コピーするリポジトリではありません。

| 資産 | 役割 | カタログ |
| --- | --- | --- |
| [edu-components](https://github.com/TT-sensei/edu-components) | 動作・ロジック・状態管理 | [開く](https://tt-sensei.github.io/edu-components/) |
| [edu-effects](https://github.com/TT-sensei/edu-effects) | UI・CSS・視覚演出 | [開く](https://tt-sensei.github.io/edu-effects/) |
| [sounds-recipe-](https://github.com/TT-sensei/sounds-recipe-) | Web Audio APIの教材用サウンド | [開く](https://tt-sensei.github.io/sounds-recipe-/) |
| [edu-assets](https://github.com/TT-sensei/edu-assets) | バッジ・報酬画像 | [開く](https://tt-sensei.github.io/edu-assets/) |
| [navi-character-](https://github.com/TT-sensei/navi-character-) | ナビゲーションキャラクター画像 | [開く](https://tt-sensei.github.io/navi-character-/) |

## AIへの基本指示

```text
制作前に https://github.com/TT-sensei/edu-kit を起点として確認してください。
最初に DESIGN-PRINCIPLES.md の設計原則を確認してください。
AI-GUIDE.mdに従い、必要な資産だけを選んでください。
READMEだけで判断せず、参照先の実装と公開カタログで実在を確認してください。
```

## 方針

- HTML / CSS / Vanilla JavaScript
- npm・ビルド・APIキー・外部DB不要
- 既存部品を教材側で再実装しない
- `EDU_EVENTS`を資産間の接続点にする
- 問題データ、画面文言、達成条件は教材側に置く
- タッチ、マウス、必要に応じてキーボードに対応する
- 長押しやドラッグだけを必須操作にしない
