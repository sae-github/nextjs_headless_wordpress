---
title: "【もりけん塾】言語チャレンジ@配列をオブジェクトにする方法を考える"
date: "2021-11-27"
categories: 
  - "javascript"
tags: 
  - "javascript"
  - "プログラミング"
  - "morikenjuku"
  - "学習記録"
  - "言語チャレンジ"
coverImage: "WebブラウザにWebサイトが表示までの旅へ-1-3.jpg"
---

もりけん塾で新たに追加された課題....「 [言語チャレンジ](https://github.com/kenmori/handsonFrontend/blob/master/work/basic/Work.md) 」に取り組んでいます。

課題はあらかじめinputする値が決まっていて、outputの値が戻り値になる様なコードを書きます  
ここではoutputの値が、課題で提示されている通りになっていればクリアとなります。

今回は課題の中で出てきた、配列からオブジェクトを作成する方法をいくつか考えてみました

## 課題5

input

```
["a", "b", "c"]
```

output

```
{0: "a", 1:"b", 2: "c"}
```

### パターン1：forEachを使用する

```
const input = ['a', 'b', 'c'];
const obj = {};
const f = (array) => {
  array.forEach((ele,index) => obj[index] = ele);
  return obj;
}

const result = f(input);
console.log(result);
```

これは課題をみて、一番最初に思いついたコードです

### パターン2：Object.fromEntries・Object.entriesを使用する

まず、`Object.entries()`を使用し引数にinputする配列を渡しました。  
keyとvalueがセットになった配列を生成しました

![](/images/スクリーンショット-2021-11-26-15.10.41.png)

ここからオブジェクトにするために `Object.fromEntries` を使用しました  
引数に inputの値を引数にした `Object.entries(input)` を渡しました  
`Object.fromEntries` はkeyとvalueをセットに オブジェクトにしてくれます

```
const input = ['a', 'b', 'c'];
const f = (array) => {
  const result = Object.fromEntries(Object.entries(array));
  return result;
}
const output = f(input);
console.log(output);
```

### パターン3：reduceを使用する

配列の最初の要素から 最後の要素までの値を取得し、1つの値にしてくれる様な機能をもちます。  
今回は配列を1つのオブジェクトにしていきたいので`reduce`を使用する方法もあると考えました。

```
reduce((prev,current,index,array) => {},init);
```

callback関数は4つの引数をとります。以下にまとめてみました。

<table><tbody><tr><td>prev</td><td>前回の呼び出し結果の値(つまり現状の結果)</td></tr><tr><td>current</td><td>現在の要素</td></tr><tr><td>index</td><td>インデック番号</td></tr><tr><td>array</td><td>対象の配列</td></tr></tbody></table>

また、initには初期値を指定することができます。  
今回の実装ではオブジェクトにしたかったので、初期値に`_{ }_` を渡しました  
この `_{ }_` に配列内の要素とインデックを追加していき、returnさせました

```
const input = ['a', 'b', 'c'];
const f = (array) => {
  return array.reduce((obj,current,index) => {
    obj[index] = current;
    return obj;
  },{})
}
const result = f(input);
console.log(result);
```

### パターン4：Object.assignを使用する

sourcesに渡した要素が、targeにコピーされ それを返すメソッド

```
Object.assign(target, ...sources)
```

今回はinputの値をコピー元の要素としsourcesへ、tergetには `_{ }_` を渡しました  
sourcesに配列を渡したことで、配列内をループしインデックスをkeyとしたオブジェクトが返りました

```
const input = ['a', 'b', 'c'];
const f = (array) => Object.assign({}, array);
const result = f(input);
console.log(result);
```

## まとめ

今回は課題5をピックアップして、いくつか実装方法を考えてみました。  
言語チャレンジはこのように様々な実装でベストを考えることも目的として、もりけん先生が作成してくれた課題です。  
今後も、課題を進めていき 配列の扱い上手になりたいです

* * *

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
