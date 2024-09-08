---
title: '【もりけん塾 @JS課題18】Vanilla JSでスライドショー作成③ auto機能を追加する編'
date: '2022-01-01'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'js_lesson'
  - 'プログラミング'
  - 'morikenjuku'
  - '学習記録'
coverImage: 'WebブラウザにWebサイトが表示までの旅へ-1.jpg'
---

現在、もりけん塾で  
[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/sae-github/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます。  
今回は課題18の実装で学んだことをブログへまとめます

前回に引き続きスライドショーの作成です

前回までの復習ブログ

https://itosae.com/js\_lesson17/

https://itosae.com/js\_lesson18-1/

## 課題18

3秒毎に次のスライドに自動で切り替わる`auto`機能を提供してください

### 制作物

[![Image from Gyazo](/images/ca342dd160ae669077b0cd2f291b4b08.gif)](https://gyazo.com/ca342dd160ae669077b0cd2f291b4b08)

https://codesandbox.io/s/js-lesson18-part2-1hd28?file=/main.js

## 表示中の要素

前回までは 以下の関数を使用して、表示されているスライドのindexを取得していました

```
const findIndexOfDisplayedItem = () => {
  // スライドを全て取得
  const slideItemArray = [...document.querySelectorAll(".slide-item")];
  // is-displayingクラスを持つ要素のindexを返す
  return slideItemArray.findIndex(el => el.classList.contains("is-displaying"));
}
```

ですが今回からは 変数で表示中のindexを管理し、状況応じて 値を変更する方法に変更しました  
例 ) nexボタンが押された場合は、+1する

```
/**
 * index of the element being displayed.
 * @type {Number}
 */

let currentIndex = 0;
```

理由としては、一つの変数で管理した方が明示的になると考えたからです

## auto機能

3秒ごとに次のスライドへ切り替えるauto機能を追加しました

```
let autoPlayerId;
const autoPlay = {
  start: function () {
    autoPlayerId = setInterval(() => {
      // スライドを全て取得
      const slideItems = [...document.querySelectorAll(".slide-item")];
　　　   　　//　表示中のスライドが最後の要素ではない場合、インクリメントした値を代入、それ以外は0を代入
      currentIndex < slideItems.length - 1 ? ++currentIndex : currentIndex = 0;
     // スライドショー実行
      playOfSlideshow();
    }, 3000);
  },
  reset: function () {
    clearInterval(autoPlayerId);
    this.start();
  }
}

const playOfSlideshow = () => {
// ページネーション切り替え
  switchIndicator(currentIndex);
// スライド切り替え
  switchSlideImg(currentIndex);
//  カウンター更新
  updateOfCounter(currentIndex);
// disabled切り替え
  toggleTheDisabled();
}
```

autoPlayという変数にオブジェクトを格納しました  
オブジェクト内でstratとresetというキーにそれぞれの仕事を紐付けています  
startはauto機能を開始し、resetは一度止め、再開させます  
アローボタンや、ページネーションがクリックされた場合に、resetを実行しています。

### 気になる点...

auto機能の部分をオブジェクトにした理由は、  
start(開始)とreset(一旦止めて、再開)を切り替えたかった為と、  
setIntervalの戻り値である idを干渉し合いたかったので この様にしました。

が...よくよく考えるとautoPlayerIdをグローバルに定義していることで  
オブジェクトにしたメリットは無いのでは...?と思いました

JavaScript best practicesを読んでみると、グローバル変数・関数の回避方法が載っていました

https://www.w3.org/wiki/JavaScript\_best\_practices

```
const autoPlay = function () {
  let autoPlayerId;
  const start = () => {
    autoPlayerId = setInterval(() => {
      const slideItems = [...document.querySelectorAll(".slide-item")];
      currentIndex < slideItems.length - 1 ? ++currentIndex : currentIndex = 0;
      playOfSlideshow();
    }, 3000)
  }
  const reset = () => {
    clearInterval(autoPlayerId);
    start();
  }
  return {
    start,
    reset
  }
}();
```

この様に 即時関数を使用して書くことを学びました

### 文字列をNumber型へ変換する

ページネーションがクリックされた場合 currentIndex(表示中のスライドのindex)に data属性で指定した数字を代入します  
データ属性へのアクセスは datasetプロパティを使用して行い、値は文字列として取得されます

```
const setClickEventInIndicator = () => {
  const indicators = document.querySelectorAll(".indicator-item");
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", (e) => {
      autoPlay.reset();
      currentIndex = e.target.dataset.num;  <- ココ
      playOfSlideshow();
    });
  });
};
```

値が文字列として currentIndexへ格納されるのでカウンターの更新で弊害がありました  
以下の関数を実行すると、currentIndex + 1の部分が "文字列 + 1"となり計算がされません

```
const updateOfCounter = () => {
  /**
   * The counter will display the value of index plus one.
   */
  document.querySelector(".current-number").textContent = currentIndex + 1;
};
```

currentIndexをNumber型に変え、プラス1した値を表示させたい....

以下の記事を参考に Number型への変換方法を学びました

https://dev.to/sanchithasr/7-ways-to-convert-a-string-to-number-in-javascript-4l

今回はNumberでラップし 型変換を行いました

```
const updateOfCounter = () => {
  /**
   * The counter will display the value of index plus one.
   */
  document.querySelector(".current-number").textContent =
    Number(currentIndex) + 1;
};
```

#### Missing radix parameter. (radix)

```
currentIndex = parseInt(e.target.dataset.num);
```

parseIntを使用すると、codesandboxで警告がでました

該当箇所に波線がひかれ **_Missing radix parameter. (radix)_** とあります

![](/images/スクリーンショット-2022-01-01-11.52.33-1-1024x486.png)

下記にまとめた参考記事とドキュメントを読むと  
第二引数のradix(基数)を省略した際の挙動が原因とありました

> 1\. 入力した `string` が "`0x`" または "`0X`" (ゼロに続いて小文字または大文字の X) で始まった場合は、`radix` は `16` と仮定され、残りの文字列が 16 進数として解釈されます。  
> 2\. 入力した `string` がその他の値で始まるときは、基数は `10` (10 進数) となります。
>
> https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global\_Objects/parseInt

また以前の仕様では `0` で始まる数字の文字列を 8 進数として解釈していたともありました(現在は廃止されている)  
こういった背景もあり、基数を指定することで予期せぬ変換を防ぐための警告だそうです。

この様にすることで、警告は消えました

```
currentIndex = parseInt(e.target.dataset.num,10);
```

参考

https://stackoverflow.com/questions/7818903/jslint-says-missing-radix-parameter

https://github.com/eslint/eslint/blob/648fe1adfc02900ee3b96e50043a768a32771fc3/docs/rules/radix.md

https://davidwalsh.name/parseint-radix

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global\_Objects/parseInt#description

## まとめ

課題17~18でスライドショーの作成・機能追加を実装しましたが  
機能を後から追加していくことの難しさを感じました。

レビューしてくれた皆さんありがとうございました！  
thanks 💛 .... もなかさん([@ruby443n](https://twitter.com/ruby443n)) はるさん([@fuwafuwahappy](https://twitter.com/fuwafuwahappy)) yukaさん([@mamuuu08)](https://twitter.com/mamuuu08)

また課題19では、以前課題16で実装したタブメニューと、スライドショーを合わせたページを実装しました。

https://codesandbox.io/s/js-lesson19-gelvt

それぞれで 命名の統一や、if文の書き方が統一されていなかったり していました  
小さなパーツから統一感のあるコーディング、わかりやすい命名をすることが 後々見返す際に大切だと感じました。

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
