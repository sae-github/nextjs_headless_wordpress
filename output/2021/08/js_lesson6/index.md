---
title: "【もりけん塾】JS課題6 Promise / スコープ"
date: "2021-08-28"
categories: 
  - "javascript"
tags: 
  - "javascript"
  - "プログラミング"
  - "morikenjuku"
  - "学習記録"
coverImage: "22.png"
---

## 課題

[課題5](https://itosae.com/js_lesson5/)で作成したものを3秒後に解決されるようにする

## レビュー前のコード

```
const ul = document.getElementById('js-ul');
const frag = document.createDocumentFragment();
const lists = [
  {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, 
  {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
]

function getListsObj() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(lists);
    },3000);
  });
}

getListsObj().then((lists)=> {
  lists.forEach(list => {
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const img = document.createElement('img');

    anchor.href = `/${list.to}`;
    img.src = list.img;
    img.alt = list.alt;

    frag.appendChild(li).appendChild(anchor).appendChild(img);
    anchor.insertAdjacentHTML('beforeend',list.text);
  });
  ul.appendChild(frag);
});
```

**_3秒後に解決される_**という条件をsetTimeoutを使用し、実装をしました。  

## レビュー

レビューをくれた[もなかさん](https://twitter.com/ruby443n)、[やまもとさん](https://twitter.com/_syoyamamoto_)ありがとうございました。

### 解決された値が受け取れていない

resolveの引数にオブジェクト(lists)を渡し、  
それをthenの引数で受け取り処理をさせるコードを書きました。  
ですが、私が書いたコードだと  
thenの引数をlistsにしてしまっている為、resolveから受け取っているのではなく  
そのままグローバルスコープにある、オブジェクト(lists)を渡してしまっています...

thenで受け取る時の引数名を修正しました。

### 変数を定義する位置

私の書いたコードは、変数の定義をscriptシートの一番初めに行っています。  
これについて、今回は変数を他で使い回すケースではない為  
thenの中で定義する方がいいのではと、もなかさんからレビューをいただきました。

レビューを頂き、グローバルスコープで変数を宣言をした場合の  
メモリの仕組みや周辺知識を調べてみました。

なんでもかんでもグローバルスコープに変数を定義することは、**参照が続く** ということ。  
つまり解放されないのでメモリに割り当てられたままの状態を意味すると知りました。  

この辺りのスコープや、GCについては別でまとめたいと思います。  

https://developer.mozilla.org/ja/docs/Web/JavaScript/Memory\_Management

https://ja.javascript.info/garbage-collection

## 最終的なコード

今回はこちらでApproveしていただき、mergeしました

```
const lists = [
  { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
  { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" }
]

function getListsObj() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(lists);
    }, 3000);
  });
}

getListsObj().then((data) => {
  const ul = document.getElementById('js-ul');
  const frag = document.createDocumentFragment();

  data.forEach(value => {
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const img = document.createElement('img');

    anchor.href = `/${value.to}`;
    img.src = value.img;
    img.alt = value.alt;

    frag.appendChild(li).appendChild(anchor).appendChild(img);
    anchor.insertAdjacentHTML('beforeend', value.text);
  });
  ul.appendChild(frag);
});
```

  

今回は以上です。

* * *

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
