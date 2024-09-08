---
title: '【もりけん塾】フローティングアイテム/スムーススクロール'
date: '2021-07-21'
categories:
  - 'javascript'
tags:
  - 'morikenjuku'
coverImage: '印刷しやすい-シンプルなフォルダー-ラベル-1-1.png'
---

今回の内容はもりけん塾で取り組んだ課題の学習ログです。  
フローティングアイテム/スムーススクロールの実装を行いました。

## レビュー前の完成形

レビューをいただく前のコードです↓↓  
headerが追従してくる...よくある実装です。

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html" data-slug-hash="OJmmzyE" data-user="Sae_codepen" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span>See the Pen <a href="https://codepen.io/Sae_codepen/pen/OJmmzyE"></a>by Sae (<a href="https://codepen.io/Sae_codepen">@Sae_codepen</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## スムーススクロールの実装

### 要素の取得 querySelectorAllメソッド

取得したい要素：aタグ、属性hrefの値が#で始まるもの

querySelectorAllを使用しました。このメソッドは、セレクター一式で文章を検索し、  
合致した要素をすべて含んだNodeList オブジェクトを戻り値として返します。

```
const sectionLink = document.querySelectorAll('a[href^="#"]');
console.log(sectionLink);
```

![](/images/スクリーンショット-2021-07-15-21.09.17.png)

https://developer.mozilla.org/ja/docs/Web/API/NodeList

このままの状態では使用することができないので、  
for文を使用し、一つずつ取り出し変数へ格納しました。

```
for(let i = 0; i < globalNav.length; i++) {
  const globalNavItem = globalNav[i];
}
```

#### querySelector

querySelectorを使用すると、対象の要素の一番先頭のみ取得できます。

```
const sectionLink = document.querySelector('a[href^="#"]');
console.log(sectionLink);
```

![](/images/スクリーンショット-2021-07-15-21.09.43.png)

#### getElementByIdとquerySelectorの使い分け

今回の課題を行っている際に、塾内で出ていた話題でした。  
塾生の[もなかさん](https://twitter.com/ruby443n)が調べてくれた記事を拝見し、その使い分けについて学びました。

https://careerkarma.com/blog/javascript-queryselector-vs-getelementbyid/

JavaScript本格入門では以下の様に書かれていました。

> querySelector/querySelectorAllメソッドは高機能なメソッドですが、getElementBy\*\*メソッドに比べると低速です。  
> //省略  
> 特に、getElementByIdメソッドは高速なので、それでまかなえる時はできるだけid値で検索することをおすすめします。
>
> JavaScript本格入門

まとめると、、、

- idで要素を検索する場合はgetElementByIdを使用する方が、明示的でバグが起こりづらい。
- より複雑な条件で検索したい場合にquerySelector/querySelectorAllを使用する。

## レビュー

今回も[先生](https://twitter.com/terrace_tech)にレビューをしていただきました。お時間頂きありがとうございました。

### レビュー①：IntersectionObserverを使用したscrollイベントの定義

トップへ戻るボタンの実装に対してのレビューを頂きました。

私が書いたコードはaddEventListenerを使用しscrollイベントを定義しました。↓↓

```
window.addEventListener('scroll', function() {
　　const topUp = document.getElementById('topup');
　　const scroll = window.pageYOffset;
　　if (scroll > 100) {
　　　　topUp.classList.add('is-show');
   } else {
     topUp.classList.remove('is-show');
   }
 });
```

IntersectionObserverを使用する理由を先生が教えてくれました。

スクロールイベントはユーザーがスクロールする度に計算される為、パフォーマンスが悪いそうです。  
以下の動画を見ればわかる通り、スクロールするたびにwindow.pageYOffset;で値を取得し続けています。

[![Image from Gyazo](/images/e7f9464afff7c0dd0b9a1f5b2cc0d9d1.gif)](https://gyazo.com/e7f9464afff7c0dd0b9a1f5b2cc0d9d1)

その点、intersectionObserverは要素が交差したタイミングで発火する為、  
より良いパフォーマンスが発揮できます。

> Intersection Observer API (交差監視 API) は、ターゲットとなる要素が、祖先要素もしくは文書の最上位の[ビューポート](https://developer.mozilla.org/ja/docs/Glossary/Viewport)と交差する変更を非同期的に監視する方法を提供します。
>
> https://developer.mozilla.org/ja/docs/Web/API/Intersection\_Observer\_API

以下、先生のアドバイスを元に書き直したコードです(先生に修正もして頂きました...)

```
//callback関数の定義
const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.boundingClientRect.top < 0) {
      topUp.classList.remove("is-show");
      if (entry.isIntersecting) {
        topUp.classList.remove("is-show");
      } else {
        topUp.classList.add("is-show");
      }
    }
  });
};

//オブジェクトの作成、実行する時にcallback関数を渡す
const observer = new IntersectionObserver(callback);

//監視したい要素
observer.observe(document.getElementById("section2"));
```

https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver

https://ics.media/entry/190902/

### レビュー②：addEventListenerについて

EventListenerのtargetをaタグではなく、js-global-nav-listのidを持つulへ修正しました。

```
const globalNav = document.getElementById("js-global-nav-list");
globalNav.addEventListener("click", function (e) {
  e.preventDefault();
  const globalNavItem = e.target;
  const headerHeight = document.getElementById("js-header").clientHeight;
  const href = globalNavItem.getAttribute("href");
  const sectionName = href.replace("#", "");
  const sectionId = document.getElementById(sectionName);
  const rect = sectionId.getBoundingClientRect().top;
  const offset = window.pageYOffset;
  const target = rect + offset - headerHeight;
  window.scrollTo({
    top: target,
    behavior: "smooth"
  });
});
```

#### イベントオブジェクト

- イベントハンドラー/イベントリスナーは引数として、イベントオブジェクトを受け取る。
- イベントオブジェクトのプロパティにアクセスすることで、さまざまな情報にアクセスすることができ、発生したイベントによってアクセスできるプロパティは変わる。
- イベントリスナーに引数として **_e_** を指定すればアクセスができる。(下記、例を参照)

targetプロパティではイベントが**発生した要素**を指し、  
currentTargetプロパテではイベントを**登録した対象の要素**を指す。

```
//id="js-global-nav-list"を持つulを変数に格納
const globalNav = document.getElementById('js-global-nav-list');

globalNav.addEventListener('click', function (e) {
//子要素であるliを指す
    console.log(e.target);
//id="js-global-nav-list"を持つul
    console.log(e.currentTarget);　
  });
```

![](/images/スクリーンショット-2021-07-20-21.23.07.png)

## 最終的なコード

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="bGWoGxg" data-user="Sae_codepen" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span>See the Pen <a href="https://codepen.io/Sae_codepen/pen/bGWoGxg"></a>by Sae (<a href="https://codepen.io/Sae_codepen">@Sae_codepen</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

今回は以上のコードでapproveをもらい、mergeしました。

## 調べた用語

### API

Application Programming Interface

> 開発者が複雑な機能をより簡単に作成できるよう、プログラミング言語から提供される構造です。複雑なコードを抽象化し、それにかわる簡潔な構文を提供します。
>
> https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side\_web\_APIs/Introduction

https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side\_web\_APIs/Introduction

### DOM

Document Object Model

マークアップ言語で書かれたドキュメントへアクセスするための仕組みのこと。  
W3Cで標準化が進められ、JavaScriptだけではなく、他の言語でも標準でサポートしている。  
DOMはドキュメントを文章ツリーとして扱い、  
文書に含まれる要素や属性、テキストをオブジェクトとみなしノード呼ぶ、  
そのオブジェクトの集合体を文章と考える。  
DOMはこれらのノードを抽出・置換・追加などをするための手段を提供するためのAPIである。

### イベントハンドラー/イベントリスナー

イベントをトリガーとして処理を実行する際に、  
そのイベントに対しての処理内容を定義したコードのかたまり(関数)のこと。

---

以上です。

今回もレビューをしてくださった、先生。ありがとうございました。  
課題と向き合い、レビューを頂く度に自分の課題がより浮き彫りになります。。。  
今はひとつひとつの課題に丁寧に、根気強く(ここ大事)、向き合って行きたいと思います。

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
