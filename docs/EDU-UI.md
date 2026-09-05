# EDU UI

OpenSource UIの考え方を参考にしつつ、TT-senseiの既存edu-kitへ合わせてVanilla CSSで再設計した共通UI部品です。

React、npm、ビルド環境は不要です。既存教材から `style.css` を読み込むだけで利用できます。

## 部品

| クラス | 用途 | 主な利用先 |
| --- | --- | --- |
| `.edu-notebook` | ノート・短い記述 | キャリア探究、総合、理科LAB |
| `.edu-progress` | 学習・ゲーム進捗 | 九九、漢字、算数ゲーム、迷路 |
| `.edu-timer` | タイマー表示 | 九九ファンタジー、時間制ゲーム |
| `.edu-stack` | 重なったカード | ナビキャラ図鑑、モンスター図鑑、コレクション |
| `.edu-device` | タブレット・端末風フレーム | 操作説明、教材紹介 |
| `.edu-annotation` | 注目箇所・説明 | 公式仕分け、ICT操作説明 |
| `.edu-status` | 現在地・発見数などの状態 | 迷路、ゲーム、探究 |
| `.edu-choice-grid` / `.edu-choice` | 大きく押せる選択肢 | 学習ゲーム、モード選択 |
| `.edu-filmstrip` | 記録を横に並べる | 理科LAB、実験記録 |
| `.edu-download` | 開く・保存・ダウンロード操作 | ワークシート、資料 |

## 設計方針

- HTML / CSS / Vanilla JavaScriptで利用できる。
- edu-kitの色、角丸、余白、文字サイズを継承する。
- タブレット横向きを優先し、学習内容を圧迫しない。
- タッチ操作を前提に、選択肢は十分な押下領域を確保する。
- ドラッグや長押しだけを必須操作にしない。
- `prefers-reduced-motion` に対応する。
- 装飾は問題、観察対象、主要操作より優先しない。

## 例

```html
<div class="edu-progress">
  <div class="edu-progress__top">
    <span class="edu-progress__label">ステージ 3</span>
    <strong class="edu-progress__value">12 / 20</strong>
  </div>
  <div class="edu-progress__track">
    <div class="edu-progress__bar" style="--edu-progress:60%"></div>
  </div>
</div>
```

```html
<div class="edu-status">
  <div class="edu-status__item">
    <span class="edu-status__icon">📍</span>
    <span><small class="edu-status__label">現在地</small><strong class="edu-status__value">12</strong></span>
  </div>
  <div class="edu-status__item">
    <span class="edu-status__icon">⭐</span>
    <span><small class="edu-status__label">発見</small><strong class="edu-status__value">18</strong></span>
  </div>
</div>
```

## 注意

これはOpenSource UIのコードをそのまま移植したものではありません。現代的なUIパターンを参考に、edu-kitの既存ルールとGitHub Pages向けの構成に合わせて実装しています。

教材固有の問題、判定、保存、学習ロジックは教材リポジトリ側に置きます。共通UIは表示と操作の見た目を担当します。
