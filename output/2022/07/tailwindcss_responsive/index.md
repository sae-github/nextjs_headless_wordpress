---
title: 'TailwindCSSでレスポンシブな実装をやってみる'
date: '2022-07-18'
categories:
  - 'css'
tags:
  - 'css'
  - 'tailwindcss'
  - 'プログラミング'
  - 'morikenjuku'
  - '学習記録'
coverImage: 'Twitter-post-18.png'
---

今回はtailwindCSSを使用してレスポンシブなレイアウトやstyleの実装をやってみます  
もりけん先生のブログを参考にして進めています。

https://kenjimorita.jp/tailwindcss-vite/

## 環境

vite 3.0.0  
_tailwindcss_ 3.1.6

## ブレイクポイント

デフォルトで用意されているブレイクポイントがあり、それらを使用して実装することができる

```
sm:	640px	@media (min-width: 640px) { ... }
md:	768px	@media (min-width: 768px) { ... }
lg:	1024px	@media (min-width: 1024px) { ... }
xl:	1280px	@media (min-width: 1280px) { ... }
2xl: 1536px	@media (min-width: 1536px) { ... }
```

上でキーとなっている名称を頭につけ使用する

```
<button class="md:bg-slate-300">ボタン</button>
```

https://tailwindcss.com/docs/responsive-design

## 独自のブレイクポイントを作成する

`tailwind.config.cjs`に以下のように指定する

```
module.exports = {
  content: ["./index.html"],
  theme: {
    screens: {
      sp: "350px",
      pc: "1200px",
    },
  },
  plugins: [],
};
```

先ほど設定したキーを使用し、クラスをあてることで実装できる

```
<button class="pc:bg-slate-300">ボタン</button>
```

## デフォルトのブレイクポイントを修正・追加する

extendの中にscreensを書くことで、デフォルトの設定を継承しつつ  
screensで指定したブレイクポイントを新たに追加、または上書きできる

```
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      screens: {
        xs: "200px",  // 上書き
        sm: "375px",　　　// 上書き
        xxx: "1600px",  // 新たに追加
      },
    },
  },
  plugins: [],
};
```

## 【おまけ】tailwind.config.cjsのcontentについて

設定のカスタマイズを定義するファイル

```
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

https://tailwindcss.com/docs/configuration

### content

tailwindCSSを使用するファイルのパスを設定する  
以下のようにすることでindex.htmlとmain.jsでtailwindCSSを使用することができる  
またパスはプロジェクトのルートからの相対パスを指定する

```
module.exports = {
  content: ["./index.html", "./main.js"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

https://tailwindcss.com/docs/content-configuration

## 【おまけ】resetcssはいらないの？

これまではreset.cssを読み込んだあとstyle.cssを読み込み実装を行なっていたが  
tailwindCSSの場合はどうなるのか...?

style.cssで@tailwind baseを読み込むことで解決している

```
@tailwind base; // here
@tailwind components;
@tailwind utilities;
```

https://tailwindcss.com/docs/preflight

## まとめ

今回はブレイクポイントについてをメインに、調べる過程で疑問に思った箇所もおまけとして残しました。  
勉強会を機にtailwindCSSに触れ、その便利さに既に心を奪われました...  
まだ見慣れなさもあるのですが、クラス名の悩みからは解放されそうです。  
今後もtailwindCSSを触りつつ、また学んだことはブログで更新していこうと思います。

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
