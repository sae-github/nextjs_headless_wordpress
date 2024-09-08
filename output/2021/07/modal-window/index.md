---
title: "【もりけん塾】Modal Window"
date: "2021-07-30"
categories: 
  - "javascript"
tags: 
  - "javascript"
  - "プログラミング"
  - "morikenjuku"
  - "学習記録"
coverImage: "印刷しやすい-シンプルなフォルダー-ラベル-10-1.png"
---

もりけん塾で取り組んだ課題のアウトプットです。  
今回はモーダルウィンドウをJavaScriptで実装しました。  

## レビュー前の完成形

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WNjzvoZ" data-user="Sae_codepen" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span>See the Pen <a href="https://codepen.io/Sae_codepen/pen/WNjzvoZ"></a>by Sae (<a href="https://codepen.io/Sae_codepen">@Sae_codepen</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## レビュー

今回ももりけん先生にレビューを頂きました。  
ありがとうございます。

### レビュー①上下中央配置の方がいいのではないか？

私が実装したものはTOPから10px下の位置にポップアップが出る様スタイルを当てていました。  
（なんとなく...見やすいと思ったからです...）

ですが、色々なサイトやサンプルを見ると、基本的に上下中央配置が多かったです。

  
マテリアルデザインには以下の様にあります。

> ダイアログとは、アプリのコンテンツの前に現れ、重要な情報を提供したり、判断を求めたりするモーダルウィンドウの一種です。ダイアログは、表示されるとアプリのすべての機能を無効にし、確認されるか、解除されるか、必要な行動が取られるまで画面に表示されます。
> 
> https://material.io/components/dialogs

> ダイアログは、その内容が確実に扱われるようにユーザーの注意を引きつけます。
> 
> https://material.io/components/dialogs

ユーザーの注意を惹きつけるためには、やはり上下中央配置がいいのでは、と思い直しました。  

https://material.io/components/dialogs

### レビュー②先生の書いたコードから学んだこと

#### アロー関数

アロー関数ではfunctionキーワードは書かず、代わりにアロー(=>)で引数と関数本体を繋ぎます。

```
(引数,.....) => {....関数の本体....}
```

```
//例文
let getTriangle = (base,height) => {
 return base * height / 2; 
};
```

例文をアロー関数を使用して書き直します↓↓

▪️ 関数本体が1文である場合は{ }は省略することが可能  
▪️ 文の戻り値がそのまま戻り値となる為returnは省略可能  
▪️ 引数が1つの場合は、引数をくくる( )も省略が可能。引数がない場合は( )の省略は不可

```
let getTriangle = (base,height) => base * height / 2; 
```

▪️ オブジェクトを返す場合は( )が必要

```
hoge => ({obj: "a;"})
```

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow\_functions

#### addEventListenerとonclickの違い

> 主な違いは、イベントリスナーのメソッドを使うと、複数のイベントハンドラーを追加 (または削除) できることです。
> 
> https://developer.mozilla.org/ja/docs/Web/Events/Event\_handlers

https://developer.mozilla.org/ja/docs/Web/Events/Event\_handlers

## 完成後

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MWmVead" data-user="Sae_codepen" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span>See the Pen <a href="https://codepen.io/Sae_codepen/pen/MWmVead"></a>by Sae (<a href="https://codepen.io/Sae_codepen">@Sae_codepen</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

だいぶスッキリしました！

* * *

次回からJS課題をメインに進めていきます。

先生、今回もレビューをありがとうございました！

* * *

![](/images/217_4-1.png)

現在、もりけん塾でJavaScriptを中心に学習をしています！

もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
