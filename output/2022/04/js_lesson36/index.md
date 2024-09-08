---
title: "【もりけん塾 @JS課題36】無限スクロールの実装"
date: "2022-04-11"
categories: 
  - "javascript"
tags: 
  - "javascript"
  - "js_lesson"
  - "プログラミング"
  - "morikenjuku"
  - "学習記録"
coverImage: "Twitter-post-15-2.png"
---

  
現在、もりけん塾で  
[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます！  
今回は課題36の実装で学んだこと、実装のポイントをブログへまとめます

## 課題36

無限スクロールの実装

### 制作物

スクロールが一番下まで到達したら リクエストを実行、データを取得し加工後 DOMヘ挿入します

![](/images/061d326ec7ca566a531325a34e4939da.gif)

### codesandbox

https://codesandbox.io/s/lesson36-rvu9wn?file=/js/article.js

## IntersectionObserver

スクロール検知には`IntersectionObserver`を使用しました

https://developer.mozilla.org/en-US/docs/Web/API/Intersection\_Observer\_API

課題で使用するのは３回目なのでだいぶ仲良くなってきた気がする...

https://itosae.com/intersection-0bserver/

https://itosae.com/js\_lesson24/

今回は以下の様なオブジェクトを作り、実装してみました

```
const observeConfig = {
  observe: null,
  option: { threshold: 1.0 },
  startObserve: (target, callback) => {
    observeConfig.observe = new IntersectionObserver(callback, observeConfig.option);
    observeConfig.observe.observe(target);
  },
  stopObserve: (target) => {
    observeConfig.observe.unobserve(target);
  }
}
```

`startObserve` が実行すると、`observer`のインスタンスを生成し  
オブジェクト内の`observe`プロパティの値に格納され 監視が開始します。  
引数へは、監視したいtarget要素と交差発生時に実行するコールバック関数を渡せる様にしました。  
`stopObserve`は、交差が発生した際に `observer`の監視を停止しするのに使用しました。  
交差が発生し、リクエストを投げ、新たに取得したデータを加工しDOMへ追加する際に監視が続いているとバグが発生する恐れがあったためです。引数へは監視をやめたいtarget要素が渡ります。

初期表示を行う関数内で、先ほどオブジェクトで定義した 監視を開始する関数を実行します。  
監視するのtarget要素を記事の一番最後の要素を指定しました

```
const init = async () => {
// 省略
  observeConfig.startObserve(articleList.lastElementChild, intersectHandler);
}
init();
```

### コールバック関数

コールバック関数は以下の関数を指定しています

```
const intersectHandler = ([entry]) => {
  if (!entry.isIntersecting) return;
  // 監視を停止
  observeConfig.stopObserve(entry.target);   
  const articleItems = document.querySelectorAll(".article__item");
  // 表示中の記事数がデータの総数より少なければ、リクエスト→記事取得・追加を行う
  if (articleItems.length < post.total) {
    renderLoading();
    setTimeout(getArticleDataAndUpdate, 500);
  }
}
```

引数の`[entry]`へは `IntersectionObserverEntryオブジェクト`が渡ってきます。  
`` `IntersectionObserverEntryオブジェクト` ``はtarget要素の数の分だけ、配列に格納された状態で渡ってきます。  
今回 target要素は1つだけなので 分割代入を使用し 一番最初の要素だけを割り当てて使用しました  
`isIntersecting` プロパティはtarget要素とrootの交差状況についてがBooleanで読み取ることができ、  
falseの場合は早期リターンさせて その後の処理をさせない様にしています。

https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/isIntersecting

## データの取得

スクロールが一番下まで到達したら、再度リクエストを投げますが、  
その際のエンドポイントを以下の様にして指定しました

```
const endpointConfig = {
  path: "https://api.javascripttutorial.net/v1/quotes/",
  limit: 10,
  currentPage: 1,
  get endpoint() {
    const url = new URL(this.path);
    url.searchParams.set("page", this.currentPage);
    url.searchParams.set("limit", this.limit);
    return url.href;
  }
}
```

レビューで教えて頂いた`getter`を使用し、endpointを取得する際には  
パラメーターがセットされたURLが返る様にしました

また、リクエストに応じてオブジェクト内のcurrentPageを更新します  
  
データを無事取得したら、データを加工し、DOMへ挿入します。  
また、その後は`startObserve`を実行しtarget要素へは表示中の最後の記事を指定してしました

```
const getArticleDataAndUpdate = async () => {
  // currentPageを更新
  ++endpointConfig.currentPage;  
  //　データを取得
  const articleData = await getArticleData(endpointConfig.endpoint); 
  removeLoading();
  if (articleData) {
　　　　　　　// レンダリング
    renderArticleItems(articleData.data); 
    // 監視開始
    observeConfig.startObserve(articleList.lastElementChild, intersectHandler);
  }
}
```

## まとめ

この課題は、私から先生へリクエストさせて頂き 追加してもらった課題です。  
実装してみたかった無限スクロールを課題に取り入れてくださりありがとうございます。  
  
今回の実装では 持っておきたい値がいくつかあった事もあり、  
オブジェクトにまとめ見通しがよくなるように意識しました。  
また、スクロールを何度もされた場合にバグが起きない様にするのに苦戦しました  
交差の監視を停止したりすることで解決し、学びになりました。  
  
今回も塾生の皆さんにレビューや動作の確認をして頂きました。ありがとうございました！

* * *

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
