---
title: '【もりけん塾】#JS課題3'
date: '2021-08-08'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'morikenjuku'
  - '学習記録'
coverImage: '24.png'
---

今回はもりけん塾で行ったJS課題3で学んだことをまとめた記事です。

## 課題3

下記をJavaScriptでつくり、html内の<ul>タグの中に差し込む

```
<ul>
  <li><a href="a1.html"><img src="/img/bookmark.png">a1</a></li>
  <li><a href="a2.html"><img src="/img/message.png">a2</a></li>
</ul>
```

## とりあえず書いてみた

今まで学習してきた方法で書けそうだったので書いてみました。

```

const ul = document.getElementById('js-ul');

const a1 = document.createElement('li');
const a1Img = document.createElement('img');
const a1Anchor = document.createElement('a');
const a1Text = document.createTextNode('a1');

a1Img.src = "/img/bookmark.png";
a1Anchor.href = "a1.html";

a1.appendChild(a1Anchor);
a1Anchor.appendChild(a1Img);
a1Anchor.appendChild(a1Text);

const a2 = document.createElement('li');
const a2Img = document.createElement('img');
const a2Anchor = document.createElement('a');
const a2Text = document.createTextNode('a2');

a2Img.src = "/img/message.png";
a2Anchor.href = "a2.html";


a2.appendChild(a2Anchor);
a2Anchor.appendChild(a2Img);
a2Anchor.appendChild(a2Text);

ul.appendChild(a1)
ul.appendChild(a2);
```

これでも実装できたのですが  
他にも要素が増えた時にa3、a4...と変数を増やして実装することになる点と、  
同じ内容を繰り返し書く点が改良できそうだと思いました。

以下、学んだ点をまとめました。

## createDocumentFragment()

> **`DocumentFragment`** インターフェイスは、親ノードを持たない最小限の文書オブジェクト (文書の断片) を表します。これは [`Document`](https://developer.mozilla.org/ja/docs/Web/API/Document) の軽量版として使用され、標準の文書のようにノードで構成される文書構造の区間を格納します。
>
> https://developer.mozilla.org/ja/docs/Web/API/DocumentFragment

DOMツリーに要素が追加されたり、削除されたりすることでリフローが発生する為  
パフォーマンスの向上にはリフローを最小限に抑えることが大切だと書いてありました。

https://stackoverflow.com/questions/15732900/how-many-reflows-does-attaching-a-documentfragment-cause

https://developers.google.com/speed/docs/insights/browser-reflow

## append() vs appendChild()

ノードの追加方法がたくさんあり、その中でもappendとappendChildの二つで悩みました。

2つの違いをまとめました

| append()                        | appendChild()                  |
| ------------------------------- | ------------------------------ |
| DOMStringも追加可能             | Nodeオブジェクトのみ追加可能   |
| 戻り値なし                      | 追加したNodeオブジェクトを返す |
| 複数のNodeとDOMStringを追加可能 | 一つのみ                       |
| IEのみサポートなし              | 全てのブラウザでサポートあり   |

他にもprepend()、after()、before()などのメソッドも  
append()と挿入場所は違えど、特徴は同じでした。  
ですがIEのサポートなしという理由で今回はappendChildで実装を行いました。

https://www.javascripttutorial.net/javascript-dom/javascript-append/

https://dev.to/prof3ssorst3v3/dom-methods-append-vs-appendchild-1lf3

## 改良後

```

const ul = document.getElementById('js-ul');
const frag = document.createDocumentFragment();

const items = [
  { href: "a1.html", src:"/img/bookmark.png",text: "a1"},
  { href: "a2.html", src:"/img/message.png",text: "a2"}
]

for(let i = 0, len = items.length; i < len; i++) {
  const item = items[i];
  const li = document.createElement('li');
  const anchor = document.createElement('a');
  const image = document.createElement('img');

  anchor.href = item.href;
  image.src = item.src;

  li
  .appendChild(anchor)
  .appendChild(image);

  anchor.insertAdjacentHTML('beforeend', item.text);
  frag.appendChild(li);
}

ul.appendChild(frag);
```

繰り返しの処理はfor文を使用し、オブジェクト配列から取り出し実装をしました。  
初めのコードより、記述もリフローも減りました！

今回はこちらでapproveいただき、mergeしました。

## まとめ

ノードを追加するメソッドがたくさんあり悩みながらコードを書きました。  
一つ一つメソッドの特徴を調べ、その時のケースに合うベストなコードを書きたいです。

今回レビューをしてくれたもりけん先生、ありがとうございました。

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
