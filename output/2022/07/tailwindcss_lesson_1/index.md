---
title: "【TailwindCSS】@applyと@layerを使用してカスタムCSSクラスを作る"
date: "2022-07-23"
categories: 
  - "css"
tags: 
  - "css"
  - "morikenjuku"
  - "学習記録"
coverImage: "Twitter-post-19.png"
---

![管理人](/images/43D8A608-67A3-48E2-9600-EFFAEB7E218E_1_201_a-150x150.jpeg)

管理人

こんにちは、さえと申します👩‍💻  
フロントエンドエンジニアになるために 日々勉強をしています  
このブログは その勉強の記録と アウトプットのために運営をしています✨

今回はtailwindCSSの`@apply`と`@layer`の違いについてを調べました  
また、それらを使用しカスタムCSSクラスの作成を行いました！

  
環境については下記のもりけん先生のブログを参考に進めています

https://kenjimorita.jp/tailwindcss-vite/

## 環境

vite 3.0.0  
_tailwindcss_ 3.1.6

## @layer

`@layer`内で定義したカスタムスタイルがどのレイヤーに属するかを指定することができる。  
定義したカスタムスタイルは対象のレイヤーへ自動的に移動する

例えば以下のようにすることで、hogeクラスはcomponentsに属することになる

```
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .hoge {
    background-color: skyblue;
  }
}
```

https://tailwindcss.com/docs/functions-and-directives#layer

### デフォルトのレイヤーの役割

```
@tailwind base; // リセットCSS的な存在。デフォルトのスタイル調整
@tailwind components; // クラスベースのスタイル用
@tailwind utilities;  // 最優先されるユーティリティクラス
```

### 使用例

2つのクラスを付与する場合、後に定義したもののスタイルが優先され実装される

例えば、下記のようにstyle.cssでカスタムクラスをそれぞれのレイヤーの一番下に定義した場合

```
@tailwind base;
@tailwind components;
@tailwind utilities;

// here
.text {
  background-color: skyblue;
}
```

index.htmlに先ほど作成したクラスと、デフォルトで定義されているクラスを付与する

```
<p class="text bg-pink-200">テスト</p>
```

結果はカスタムクラスが優先され、`bg-pink-200` は適応されていない

![](/images/8085e62972f03adb5ad367a75400e1e7-1024x92.png)

理由は`@tailwind utilities`の後にtextクラスが定義されているため

@layerでどこに属するかを指定し、その中で定義することで解決する

```
@layer components {
  .text {
    background-color: skyblue;
  }
}
```

![](/images/2426ef54c49e5e6a081eb315dc38d652-1024x85.png)

また、以下のように`@tailwind utilities` の前に定義することで解決することもできる

```
@tailwind base;
@tailwind components;
.text {
  background-color: skyblue;
}
@tailwind utilities;
```

例の通り、@layerを使用することで定義順を気にする必要がなくなる点もメリットと言えそう。

ドキュメントを読むともう一つ特徴があって  
@layer内で追加されたカスタムCSSは使用されない限り、最終的なビルドに含まれないと書いてあった。また、逆に@layerに含めず定義したカスタムCSSは使用の有無関係なく、最終的なビルドに含まれるそう。これも頭に入れとこう...

## @apply

> Use @apply to inline any existing utility classes into your own custom CSS.
> 
> 既存のユーティリティクラスを独自のカスタム CSS にインライン化するには、@apply を使用します。
> 
> https://tailwindcss.com/docs/functions-and-directives#apply

### 使用例

```
.text {
  @apply bg-yellow-200;
}
```

### theme

theme関数を使用して指定することもできる

```
.text {
  background-color: theme(colors.yellow.200);
}
```

https://tailwindcss.com/docs/functions-and-directives#theme

## 参考記事

https://bloggie.io/@kinopyo/organize-your-css-in-the-tailwind-style-with-layer-directive

https://tailwindcss.com/docs/reusing-styles

* * *

もりけん塾で学習をしています٩( 'ω' )و  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
