---
title: "【もりけん塾 @JS課題16】 WebAPIを使用した 動的なタブUIを作る part1"
date: "2021-11-06"
categories: 
  - "javascript"
tags: 
  - "javascript"
  - "js_lesson"
  - "プログラミング"
  - "morikenjuku"
  - "学習記録"
coverImage: "WebブラウザにWebサイトが表示までの旅へ-1.jpg"
---

現在、もりけん塾で  
[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/sae-github/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます。  
今回は課題16の実装で学んだことをブログへまとめます

## 課題16

[yahooのトップページ](https://www.yahoo.co.jp/)にある様なタブUIを作成しました  
JSONデータを作成 fetchで取得 タブ、コンテンツを作成しDOMへ追加しました  
  
以下、今回のPRで含んでいる仕様です

☑︎それぞれのカテゴリタブを開くことができてそれぞれのジャンルに応じた記事が4つ表示できる。(記事のタイトル名は適当)  
☑︎それぞれのカテゴリにはそれぞれ固有の画像が入る(右側四角。画像は適当)  
☑︎カテゴリタブは切り替えられる。面倒なら2つのカテゴリだけでよいです。その場合ニュースと経済だけにします  
☑︎どのカテゴリタブを初期表示時に選んでいるかはデータとして持っている  
☑︎htmlはulだけ作ってあとはcreateElementで作る  
☑︎try-catchでエラー時はulの中に「ただいまサーバー側で通信がぶっ壊れています」みたいなテキストを画面内に表示すること  

### 今回のコード

https://codesandbox.io/s/js-lesson16-dtekc

### 実装ポイント

① 全てのカテゴリーデータを取得する  
② タブの作成と、コンテンツ部分の大枠を作成  
③ 取得したJSONデータに含まれている selectキーがtrueであればそのカテゴリーを初期選択させる  
・表示内容はタイトルと、各々カテゴリーが所有する画像  
④ クリックしたタブの カテゴリーのデータを取得し 表示、タブを切り替える  
・データ取得中はローディング画像をくるくる、取得後外す  
・タブの切り替えはCSSのクラスを付け替える

## 学んだこと

### タブのクリック回にリクエストする仕様について

課題の仕様には記載はありませんが、  
私が作成したタブメニューは タブがクリックされる度に リクエストを起こす仕様にしていました

ここに関して もりた先生からアドバイスをいただきました  
  
クリック回にリクエストをするのであれば、  
APIをカテゴリーごとに分ける方法 をとることを 教えて頂きました

たしかに....  
DOMに追加するわけでもなく、全カテゴリーのデータを取得していたら、  
それこそパフォーマンスが悪い  

カテゴリーごとに 以下のサイトで APIを作成しました

https://myjson.dit.upm.es/

### addEventListener(イベントバブリング)

今回の課題ではHTMLはulのみの状態からという仕様です。

そのため、動的に作った要素に対してclickイベントを定義するのではなく  
親要素にクリックイベントの定義を行い、  
イベントオブジェクトを使用し 実際にクリックされた要素の取得を行いました

```
const tabMenuList = document.getElementById("js-ul"); // ul要素取得、変数へ格納
　
tabMenuList.addEventListener("click", (e) => { 　　　　　　　　　　　　　　
  console.log(e.currentTarget);   // 　イベントが定義されている要素　(=this)
 　console.log(e.target);               // クリックされた要素
});
```

![](/images/スクリーンショット-2021-11-06-12.19.03.png)

＊ 黄枠がul、赤枠がfetchしたデータをもとに動的に生成したタブ  
今回はこの黄枠にクリックイベントを定義しました

#### クリックイベントの内容

① 現在選択されているタブの取得、tab-selectクラスを e.targetに付け替える  
② 現在表示中の画像、テキスト除去  
③ e.targetのカテゴリーのAPIをリクエスト

```
tabMenuList.addEventListener("click", (e) => {
  const hasActiveClassElement = document.getElementsByClassName(
    "tab-select")[0]; 

  if (hasActiveClassElement) {
    hasActiveClassElement.classList.remove("tab-select");
    e.target.classList.add("tab-select");
 }
    const imgWrapper = document.getElementById("js-img-wrapper");
    const tabContentList = document.getElementById("js-tab-content__list");

    tabContentList.textContent = "";
    imgWrapper.textContent = "";

    createClickedTabContent(e.target);
 
});
```

#### タブ以外をクリックされた場合の制御

上記のコードのままだと、一つ懸念点が出てきました

タブ部分以外をクリックされた場合(今回の例で言えば 黒丸部分)、  
その後の処理で 予期していないデータのため エラーが出ます  
黒丸をクリックされた場合は 処理させない、弾くような条件式を書きました

![](/images/スクリーンショット-2021-11-06-12.19.03-1.png)

**e.currentTarget !== e.target** 　として  
クリックイベントを定義したulと 実際にクリックした要素が一致しなければ その後の処理を実行する

```
tabMenuList.addEventListener("click", (e) => {
  const hasActiveClassElement = document.getElementsByClassName("tab-select")[0];

  if (hasActiveClassElement && e.currentTarget !== e.target) {
    hasActiveClassElement.classList.remove("tab-select");
    e.target.classList.add("tab-select");

    const imgWrapper = document.getElementById("js-img-wrapper");
    const tabContentList = document.getElementById("js-tab-content__list");

    tabContentList.textContent = "";
    imgWrapper.textContent = "";

    createClickedTabContent(e.target);
  }
});
```

なんかもっとCSSとかで制御できないかね...と思ったのですが  
わからなかった...

### 配列 / オブジェクトの取り扱い

#### 全カテゴリーデータを取得(fetch)する

まずはそれぞれのAPIをオブジェクトへまとめました  
オブジェクトの書き方も もりた先生に教えて頂きました

```
const API = {
  news: "https://jsondata.okiba.me/v1/json/p4k7o211104194632",
  book: "https://jsondata.okiba.me/v1/json/C2haH211104194737",
  travel: "https://jsondata.okiba.me/v1/json/vbUXI211104194810",
  economy: "https://jsondata.okiba.me/v1/json/RSWyy211104194854"
};
```

https://twitter.com/terrace\_tech/status/1456605312073363461?s=20

上記オブジェクトの 全カテゴリーデータを取得し、  
 undefined以外のものを 返す様な処理をかきました

```
async function getArrayFetchData() {
  try {
    const data = await Promise.all(Object.values(API).map(getJsonOrError));
    return data.filter((value) => value !== undefined);
  } catch (e) {
    addErrorMessage(e);
  }
}

async function getJsonOrError(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}
```

Object.valuesで列挙可能なプロパティの値を配列で返し、  
配列内の値を順にgetJsonOrError()で処理させ、新たな配列を変数dataへ  
filterを使用し、undefind以外の値で 新たな配列をかえす

また、Promise.allはrejectされた場合はすぐにcatchへと処理が移ります

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Object/values

#### 特定の値を持つオブジェクトを返す find

取得したデータのselectキーがtrueのオブジェクトを取得し 初期選択させます

こちらは 塾生の[もなかさん](https://twitter.com/ruby443n)からレビューを頂きました

```
const hasSelectData = data.find((value) => value.select === true);
```

> `find` メソッドは、配列のそれぞれの添字に対して一度ずつ、`callback` 関数を実行し、`callback` 関数が [truthy](https://developer.mozilla.org/ja/docs/Glossary/Truthy) な値を返すまで繰り返します。その場合、`find` は直ちにその要素の値を返します。そうでなければ、`find` は [`undefined`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/undefined) を返します。
> 
> https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global\_Objects/Array/find

分割代入を使用して 以下の様に書くこともできました

```
const hasSelectData = data.find(({select}) => select === true);
```

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global\_Objects/Array/find

## 挑戦 ： WAI-ARAIを使用した実装

タブがクリックされた際のスタイルをclassをつけ実装していましたが、  
WAI-ARAIを使用した実装にもチャレンジしてみました

参考にさせて頂きました

https://koppe-pan.net/?p=169

```
// タブを作成する関数
function createTabMenu(data) {
  for (let i = 0; i < data.length; i++) {
    const tabMenuItem = document.createElement("li");
    tabMenuItem.setAttribute("role", "tab");　　　　　　　　　　　　　　　　　　　　　　　　　　　　 // 役割　
    tabMenuItem.setAttribute("aria-selected", "false");　　　　　　　　　　　// 選択されているタブか否か
    tabMenuItem.setAttribute("aria-setsize", data.length);     // タブが連なっている数
    tabMenuItem.setAttribute("aria-posinset", [i + 1])           // そのうちの何番目か
    tabMenuItem.id = data[i].category;
    tabMenuItem.textContent = data[i].category;
    tabMenuList.appendChild(tabMenuItem);
  }
}
```

上の処理で生成された要素↓

![](/images/スクリーンショット-2021-11-06-22.41.01.png)

クリックが起きた際は  
li\[aria-selected="true"\]となっている要素を取得し、  
属性値がかわる様に処理をかきました

```
// クリックイベント
tabMenuList.addEventListener("click", (e) => {
  const selectedElement = document.querySelector('li[aria-selected="true"]');

  if (selectedElement && e.currentTarget !== e.target) {
    selectedElement.setAttribute("aria-selected", "false");
    e.target.setAttribute("aria-selected", "true");

//　省略
  }
});
```

CSSも以下の様にしました

```
li[aria-selected="true"]{
  background-color: #fff;
  color: #333;
  font-weight: bold;
}
```

https://developer.mozilla.org/ja/docs/Learn/Accessibility/WAI-ARIA\_basics

## 感想・まとめ

今回の様なバニラJavaScriptで何かを作るのは初めてだったので  
課題を見たときは 「できるのか、、これ、、」となりました（小声）

まずは綺麗に書こうとか、関数にしようとか考えず  
だぁああああっとわかるところから書き始めました  
（気持ちとしては、考えるな！手を動かせ！)

そこから頭の整理ができてきて、  
順を追って、考えることができる様になりました

また、配列やオブジェクトの扱いはとても重要な点だと思うので  
復習や、色々なパターンで書いてみることで 理解を深めていきたいです。  
（ここの引き出し増やしたら、割と強そう）

次回はタブメニューに機能を追加します。  
コメント数と、3日前までのニュースであればNewマークが出る様な機能を追加します。

今回もレビューいただきありがとうございました  
Thanks... [もりた先生](https://twitter.com/terrace_tech)　[もなかさん](https://twitter.com/ruby443n)  

* * *

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
