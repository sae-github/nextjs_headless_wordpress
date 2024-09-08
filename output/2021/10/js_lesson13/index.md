---
title: '【もりけん塾】JS課題13 addEventListener/ モーダルウィンドウ / fetch'
date: '2021-10-10'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'js_lesson'
  - 'morikenjuku'
  - '学習記録'
coverImage: 'WebブラウザにWebサイトが表示までの旅へ-2-1.jpg'
---

現在、もりけん塾で  
[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/sae-github/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます。  
今回は課題13の実装で学んだことをブログへまとめます。

## 課題

①ボタンをクリックしたらモーダルが表示  
②モーダル内のボタンをクリックしたらfetchを使用しJSONデータを取得  
(データ取得の間はくるくるさせる)  
③取得したデータを加工し、ブラウザに表示

今回実装したコード

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="GRvRmyV" data-user="Sae_codepen" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span>See the Pen <a href="https://codepen.io/Sae_codepen/pen/GRvRmyV">Click modal &amp; Click Request</a> by Sae (<a href="https://codepen.io/Sae_codepen">@Sae_codepen</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

課題を実装するにあたりイベントハンドラについて調べました！  
以下、学んだことをまとめていきます。

## addEventListener

```
element.addEventListener(event, handler[, phase]);
```

イベントは以下の様な流れをするそうです

① イベント発生  
② **_キャプチャリングフェーズ_**  
最上位にあるwindowオブジェクトから下位要素にイベントが伝播する  
③ **_ターゲットフェーズ_**  
イベントの発生元に到達  
④ **_バブリングフェーズ_**  
イベントの発生元から最上位のwindowオブジェクトまで伝播する

### イベントバブリング

イベントが親へ親へと流れていくことを **イベントバブリング** という

以下の例を見ると どの様にイベントバブリングが起きているかがわかります

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="PoKoNPr" data-user="Sae_codepen" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span>See the Pen <a href="https://codepen.io/Sae_codepen/pen/PoKoNPr">Untitled</a> by Sae (<a href="https://codepen.io/Sae_codepen">@Sae_codepen</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

一番下位要素のbuttonをクリックすると...  
button→div→body とイベントが伝播していることがわかります

### イベントキャプチャ

addEventListenerの第三引数にtrueを指定すると、  
伝播の流れが変わり イベントキャプチャが行われます  
(使用されるケースは, ほとんどない とありました...)

```
document.getElementById('js-button').addEventListener('click', () => {
  alert("button");
},true);
```

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="ZEJEWmr" data-user="Sae_codepen" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span>See the Pen <a href="https://codepen.io/Sae_codepen/pen/ZEJEWmr">Untitled</a> by Sae (<a href="https://codepen.io/Sae_codepen">@Sae_codepen</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

先ほどと同様、最下位の要素buttonをクリックすると  
今回は最上位のbodyから順に下位へイベントの伝播が起きていることが確認できました

### onclick

onclickもaddEventListenerと同様、  
クリックが起きた際のイベントハンドラを設定することができる  
またクリックだけではなく、onの後にイベントの種類を指定することも可能

```
on<event>
```

addEventListenerとの違いをまとめてみました

・複数のイベントハンドラを指定することが出来ない。ハンドラを追加した場合は 上書きされてしまう  
・addEventListenerでは第三引数でイベントの伝播を制御することが可能だがonclickでは制御することができない  
・HTMLの属性として追加することが可能

## 参考記事

https://blog.bitsrc.io/event-bubbling-and-capturing-in-javascript-6bc908321b22

https://ja.javascript.info/introduction-browser-events

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
