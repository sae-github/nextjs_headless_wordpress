---
title: "【もりけん塾】JS課題7 Promise / Loading"
date: "2021-08-29"
categories: 
  - "javascript"
tags: 
  - "javascript"
  - "プログラミング"
  - "morikenjuku"
  - "学習記録"
coverImage: "21.png"
---

## 課題7

> resolveになるまでの間にloading画像をだして、終わったら除く。  
> これはサーバーから値が渡ってくるまではそれを出して、  
> 渡ってきたら値を加工してhtmlとして書き出すを想定しています
> 
> https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md

## レビュー前のコード

### 考えたこと

getData関数でデータを取ってくる関数を定義しました(今回は課題外なので返り値だけですが...)  
createList関数はリストを作る関数で、  
if文で「もし、getData関数がtrue(返り値があったら)だったらresolveを実行する」としました。  
resolveの引数にはgetDataを渡し、それをthenメソッドで繋ぎノードを作成し、追加しました。

また、LoadingはcreateList関数内で生成し、追加しました。  
thenメソッドに処理が移った(resolveが実行された)時に消す処理を書きました。

```
const ul = document.getElementById('js-ul');

function getData() {
   const data = [
    { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
    { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" }
  ]
  return data;
}

function createList() {
　　const LoadingImage = document.createElement('img');
  LoadingImage.src = "./loading-circle.gif";
  ul.appendChild(LoadingImage);
  return new Promise((resolve) => {
    setTimeout(() => {
      if (getData()) {
         resolve(getData());
      }
    }, 1000)
  })
}

createList().then((lists) => {
  ul.removeChild(ul.firstChild);
  const frag = document.createDocumentFragment();

  lists.forEach(list => {
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const img = document.createElement('img');

    anchor.href = `/${list.to}`;
    img.src = list.img;
    img.alt = list.alt;

    frag.appendChild(li).appendChild(anchor).appendChild(img);
    anchor.insertAdjacentHTML('beforeend', list.text);

  });
  ul.appendChild(frag);
});
```

## レビュー

[Yukaさん](https://twitter.com/mamuuu08)と[もなかさん](https://twitter.com/ruby443n)からレビューを頂きました。  
ありがとうございました！

### 関数化

処理ごとに関数にまとめた方が良いと、レビューを頂きました。

以下の処理をそれぞれ関数にまとめました↓

・ローディングが追加される処理  
・ローディングを取り除く処理  
・リストを作成する処理  
・データをとってくる処理

また、関数にする理由を教えてくださいました  
・テストをするため  
・仕様変更に対応  
・コードの読みやすさの向上  

レビュー後のコードを見ると  
とてもスッキリしていて、わかり易いです。  
後からこのコードを見返したり、機能を追加することになっても扱い易いと感じました。

## 最終的なコード＆まとめ

```
const ul = document.getElementById('js-ul');

const data = [
  { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
  { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" }
];

function addLoading() {
  const loadingImage = document.createElement('img');
  loadingImage.src = "./loading-circle.gif";
  loadingImage.id = "loading";
  ul.appendChild(loadingImage);
}

function removeLoading() {
  const loading = document.getElementById('loading');
  loading.remove();
}

function createList(lists) {
  const frag = document.createDocumentFragment();
  lists.forEach((list) => {
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const img = document.createElement('img');

    anchor.href = `/${list.to}`;
    img.src = list.img;
    img.alt = list.alt;

    frag.appendChild(li).appendChild(anchor).appendChild(img);
    anchor.insertAdjacentHTML('beforeend', list.text);
  });
  ul.appendChild(frag);
}


function getData() {
  addLoading();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

getData().then((lists) => {
  removeLoading();
  createList(lists);
});
```

おお...見返したくなるコードが書けた気がします。嬉しい！

* * *

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
