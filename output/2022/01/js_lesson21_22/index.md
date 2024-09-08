---
title: '【もりけん塾 @JS課題21・22】JSONデータからtableを作成する sort機能追加 編'
date: '2022-01-23'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'js_lesson'
  - 'プログラミング'
  - 'morikenjuku'
  - '学習記録'
coverImage: 'Twitter-post-7.jpg'
---

![管理人](/images/43D8A608-67A3-48E2-9600-EFFAEB7E218E_1_201_a-150x150.jpeg)

管理人

こんにちは、さえと申します👩‍💻  
現在 フロントエンドエンジニアになるために 日々勉強をしています  
このブログは その勉強の記録と アウトプットのために運営をしています✨

現在、もりけん塾で  
[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/sae-github/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます。  
今回は課題21・22の実装で学んだことをブログへまとめます

## 課題21・22

前回の課題で作成したtableへ機能追加を行いました

前回の課題

https://itosae.com/js\_lesson20/

### 課題の仕様

- id・年齢に sort機能を追加する
- 初期状態は サーバーからのレスポンス順
- 上下の矢印両方が共にクリッカブル領域になっていて 押すと以下の順で変化する  
   初期状態 ▶︎ 昇順 ▶︎ 降順 ▶︎ 初期状態 ...

### 制作物

[![Image from Gyazo](/images/4ff4e42f7901e40e3d574eb9c812c4f7.gif)](https://gyazo.com/4ff4e42f7901e40e3d574eb9c812c4f7)

https://codesandbox.io/s/lesson22-9b83p

## sortボタンの作成・追加

sortボタンの状態を data属性で管理する仕様にしました  
状態は全部で3種類で、初期状態(default)、昇順(asc)、降順(desc) です

```
const createSortButton = () => {
  const sortButton = createElementWithClassName(
    "button",
    "sort-button js-sort-button"
  );
  //　サーバーからからのレスポンス順を初期設定とする
  sortButton.dataset.sortStatus = "default";
  return sortButton;
};
```

※ createElementWithClassName(type,class)はclass名を付与したHTMLタグを生成する関数

また、矢印画像は CSSで実装しました

```
.sort-button[data-sort-status="default"] {
  background-image: url(./img/standard.svg);
}

.sort-button[data-sort-status="asc"] {
  background-image: url(./img/asc.svg);
}

.sort-button[data-sort-status="desc"] {
  background-image: url(./img/desc.svg);
}
```

## イベント定義

作成したsortボタンに クリックイベントを定義します

定義するイベントは...  
\- sortボタンの状態(status)を切り替える  
\- クリックが起きたセル(id or 年齢)を取得し、状態に合わせてsortさせる  
\- 順番を書き換える  
\- クリックされたセル以外の項目のsortボタンはstatusをdefaultにする  
(例 : "ID"がクリックされた場合、"年齢"のsortボタンの状態は defaultにする)

```
const setClickInSortButton = () => {

// sort前の初期状態のrowsを配列に
  const defaultRows = [...document.querySelectorAll(".js-tr-inTbody")];
// sortボタンを全て取得し配列に
  const sortButtons = [...document.querySelectorAll(".js-sort-button")];

  sortButtons.forEach((sortButton) => {
    sortButton.addEventListener("click", (e) => {
      resetSortButtonsExceptTarget(sortButtons, e.target);
      const nextStatus = switchSortStatus(e.target.dataset.sortStatus);
      e.target.dataset.sortStatus = nextStatus;
      const sortedRows = getSortedRows(nextStatus, defaultRows, e.target);
      const tbody = document.querySelector("tbody");
      sortedRows.forEach((row) => {
        tbody.appendChild(row);
      });
    });
  });
};
```

関数をもう少し細かく見ていきます

### 状態(status)の切り替え

sortボタンに設定している data属性の切り替えを行います  
引数のstatusには sortボタンの現在の状態(status)が渡ってきます  
渡ってきた 状態(status)を元に switch文を使用し 切り替えを行います  
また、caseのどれにも当てはまらない場合は defaultの状態にする様にしました

```
const switchSortStatus = (status) => {
  switch (status) {
    case "default":
      return "asc";

    case "desc":
      return "default";

    case "asc":
      return "desc";

    default:
      return "default";
  }
};
```

### sort

sortする方法を整理します

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Array/sort

以下の様な関数を定義しました  
引数へは（現在のstatus、配列に格納された初期状態の列達(row)、イベントが起きたbutton要素）が渡ってきます

まず最初に sortボタンのstatusがdefaultなのか それ以外なのか で分岐します  
\- statusがdefault ..... 早期リターンし defaultRows(初期状態の列群)を返す  
\- statusがdefault以外 ...... statusによってさらに条件分岐

一つめの関門でstatusがdefault以外だった場合、asc(昇順) or desc(降順) で更に条件分岐します  
また、ascでもdescでもなかった場合はエラーをポイと投げます

```
const getSortedRows = (status, defaultRows, target) => {
  if (status === "default") return defaultRows;
  const index = findClickedCellIndex(target);
  switch (status) {
    case "asc":
      return [...defaultRows].sort(
        (a, b) => a.children[index].textContent - b.children[index].textContent
      );
    case "desc":
      return [...defaultRows].sort(
        (a, b) => b.children[index].textContent - a.children[index].textContent
      );
    default:
      throw new Error(`${status} is not provided.`);
  }
};
```

変数findClickedCellIndexへは、クリックが起きたセルのindexが格納されます  
このindexを元にsortを行いました

```
const findClickedCellIndex = (target) =>[...document.querySelectorAll(".js-th")].indexOf(target.parentElement);
```

sort部分は以下の様なコードで実装しました  
sortは破壊的メソッドで、元の配列に影響を与えてしまうので、  
\[...defaultRows\]とし spred構文を使用しています。  
こうすることで defaultRowsのcloneに対してsortさせてるので 元の配列は壊れません

```
case "asc":
 return [...defaultRows].sort((a, b) => a.children[index].textContent - b.children[index].textContent);
case "desc":
 return [...defaultRows].sort((a, b) => b.children[index].textContent - a.children[index].textContent);
```

先程のindexを使用し、rowの中でクリックされたセルに対する項目をsortさせました

### reset(statusをdefaultに戻す)

sortボタンの中で、今クリックされたボタン(target)で なければ、状態(status)をdefaultにする

```
const resetSortButtonsExceptTarget = (sortButtons, target) => {
  sortButtons.filter((button) => button !== target).forEach((value) => {
    value.dataset.sortStatus = "default";
  });
}
```

## まとめ

レビューで　switch文を使用した条件分岐の書き方をアドバイス頂きました  
普段、問答無用で if~else文で書いていた条件分岐ですが、caseによって使い分けることが重要だと学びました。

参考記事

https://qiita.com/taiju\_suzuki/items/e2bf11fcf1645623235f

[http://dqn.sakusakutto.jp/2012/08/if-else.html](http://dqn.sakusakutto.jp/2012/08/if-else.html)

今回の課題でレビューしてくれた方々ありがとうございました  
Thanks to [もりけん先生](https://twitter.com/terrace_tech)、[もなかさん](https://twitter.com/ruby443n)、[ちひろさん](https://twitter.com/chihiro7029)

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
