---
title: '【もりけん塾】JS課題5  非同期処理・Promise'
date: '2021-08-13'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'morikenjuku'
  - '学習記録'
coverImage: '23.png'
---

もりけん塾で「[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題」](https://github.com/sae-github/handsonFrontend/blob/master/work/markup/1.md)に取り組みました。  
今回は課題5を通して学んだことをまとめた記事です。

## 課題5

下記の配列を Promiseオブジェクトを使って解決された値として受け取り、  
要素を生成・加工し、HTML内の<ul>に追加する

```
[
{to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
{to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
]
```

以下のような出力にする

```
<ul>
 <li><a href="/bookmark.html"><img src="1.png" alt="画像1">ブックマーク</a></li>
 <li><a href="/message.html"><img src="2.png" alt="画像2">メッセージ</a></li>
</ul>
```

## まず調べたこと

問題が理解できなかったので、まずは言葉の意味から調べました。

- Promiseとはなにか
- 解決された値とは何か
- Promiseの書き方

書籍や、ネットを使い調べました。  
主に、MDNとPromiseの本を使用しました。

https://azu.github.io/promises-book/#then-return-new-promise

何がわからないのかがわからない時は先生のツイートを思い出します。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">【「分からない」が徐々に分かるイメージ】<br>1. 巨大過ぎる分からない<br>2.ぼんやりしている分からない<br>3. 掘ると次の分からないが採れる<br><br>焦らず、細かく、一つ一つ、少し深く<br><br>→実際に手を動かし「実験」「素振り」する<br>→分かるパターンが作られる<br>→点と点が線になる<br>→ 以前より分かる <a href="https://t.co/zS63xxtr34">pic.twitter.com/zS63xxtr34</a></p>— フロントエンドエンジニア (@terrace_tech) <a href="https://twitter.com/terrace_tech/status/1396772014325592071?ref_src=twsrc%5Etfw">May 24, 2021</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

とりあえず、出てきた言葉を調べてみて出てきたサンプルを実際に書き、  
デバックで確認したり、ここ変えたらどうなる？を繰り返してみています。

それでもわからない時は一度離れて、周辺のことを調べたりして外から固めつつ  
わかることを増やしていくことを心がけています。

## 同期処理と非同期処

- 同期処理　  
   順番に処理を行う。前の処理が完了するまで次の処理には進まない。

- 非同期処理  
   処理を、別で実行させつつ完了を待たずに次の処理へいく。  


なぜ非同期処理が必要なのか

JavaScriptはシングルスレッドで、ブラウザのメインスレッドで処理が実行される。  
メインスレッドは表示の更新など、見た目に関わることを行っているため、  
同期処理で時間のかかる重い処理が実行されると、他の処理へ進めず、レンタリングが完了できない。そのためUI全体に悪影響(動かなかったり、画面が表示されなかったり...)を及ぼすのを避けるため。

https://coliss.com/articles/build-websites/operation/javascript/javascript-visualized-event-loop.html

https://coliss.com/articles/build-websites/operation/javascript/javascript-visualized-promises-async-await.html

## Promise

### Promiseとは

> **`Promise`** オブジェクトは非同期処理の最終的な完了処理 (もしくは失敗) およびその結果の値を表現します。
>
> https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global\_Objects/Promise

例えを用いてこの言葉の意味を理解していきます...

```
const getDate = false;

new Promise((resolve,reject) => {
  if(getDate) {
    resolve('データの取得ができました');
  }else {
    const reason = new Error('エラーが発生しました');
    reject(reason);
  }
}).then((message) => {
  console.log(message);
}).catch((reason) => {
  console.log(reason);
});

//データの取得ができました
```

getDate(本来であれば何かデータを取得してくる様な関数)がtrue(データの取得に成功したら)  
resolve()が実行されthen()に処理が移ります。  
仮にgateDateがfalse(データの取得に失敗)の場合は、reject()が実行され、エラーとなりました。

ちょっとわかったぞ...

### Promiseの書き方

```
new Promise(function(resolve,reject) {　　　
//resolve();
//reject();

}).then(function() {　　　　//promiseが解決 (resolve)された時に呼び出される

}).catch(function() {　　//promiseが拒否(reject)された時に呼び出される

}).finally(function() {　　//上記どちらかの処理の後に呼び出される

});

//アロー関数を使用して書くと
new Promise((resolve,reject) => {

}).then(() => {

}).catch(() => {

}).finally(() => {

})
```

\-　インスタンス化を行いPromiseオブジェクトの初期化を行う

\-　resolveかrejectが実行

\-　Promiseオブジェクトのステータスが変わり、それに応じたタスクが実行

### Promiseのステータス

<table class="has-black-color has-white-background-color has-text-color has-background"><tbody><tr><td><span class="fz-16px">fulfilled</span></td><td><span class="fz-16px">resolve<meta charset="utf-8">を実行した時の状態</span>、<span class="fz-16px">onFulfilledが呼ばれる</span></td></tr><tr><td><span class="fz-16px">rejected</span></td><td><span class="fz-16px">rejectを実行した時の状態</span>、<span class="fz-16px"><code>onRejected</code>&nbsp;が呼ばれる</span></td></tr><tr><td><span class="fz-16px">pending</span></td><td><span class="fz-16px">以下の2つでない時、初期状態の時</span></td></tr></tbody></table>

## レビュー前のコード

```
const ul = document.getElementById('js-ul');

const lists = [
  { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
  { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" }
]

const promise = new Promise((resolve) => {
  resolve(lists);
}).then((lists) => {
  lists.forEach(list => {
    const frag = document.createDocumentFragment();
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const img = document.createElement('img');

    anchor.href = `/${list.to}`;
    img.src = list.img;
    img.alt = list.alt;

    li.appendChild(anchor).appendChild(img);
    anchor.insertAdjacentHTML('beforeend', list.text)
    frag.appendChild(li)
    ul.appendChild(frag);
  });
})
```

### 疑問に思ったこと...

これって非同期処理なのか？  
なんか非同期感がないなと思いました。

Promiseの本では以下の様にありました

> **Promiseは常に非同期** で処理されるということが仕様で定められている
>
> https://azu.github.io/promises-book/#then-return-new-promise

以下の様な例で確認してみると、しっくりきました。

```
new Promise((resolve) => {
  console.log(1);
  resolve(2);
}).then((value) => {
  console.log(value);
});
console.log(3);

//1
//3
//2
```

## レビュー

もりけん先生からレビューを頂きました。  
いつもありがとうございます。

createDocumentFragmentをforEachの中で生成している点について、レビューをいただきました。  
これだと処理が起きるたびに生成されてしまうので、修正を行いました。

```
  const frag = document.createDocumentFragment();
```

生成したノードをcreateDocumentFragmentへ追加する際の処理もforEachの外へと修正しました。

この変数が不要とのレビューもいただきました。

```
const promise = new Promise((resolve) => {
```

thenの後に続く処理と分けて書く場合などは必要ですが  
今回の様に一緒に書いている場合は確かに不要だと思いました。

もりけん先生、今回もレビューをありがとうございました。

他の塾生さんの課題5をgithubで拝見しました。  
レビューの中で「関数でラップした方が使いまわせるので良い」とあり、  
今回の私のコードも書き変えてみました。

```
//省略

function getObj() {
  return new Promise((resolve) => {
    resolve(lists);
  });
}

getObj().then((lists) => {
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

他の方のコードを見るのは、新しい発見と視点に出会えて  
課題を2度も3度も味わうことができました。(なんか表現がきもい)

## 最終的なコード

今回はこちらでApprove頂き、mergeしました

```
const ul = document.getElementById('js-ul');
const frag = document.createDocumentFragment();

const lists = [
  { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
  { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" }
]

new Promise((resolve) => {
  resolve(lists);
}).then((lists) => {
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

## まとめ

Promiseや非同期処理についての記事がたくさんありました。  
それほどつまずきポイントなんだと思いました...

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
