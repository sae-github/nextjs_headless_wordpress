---
title: "【もりけん塾】言語チャレンジ@配列同士で一致した値を格納した配列を返す"
date: "2022-01-20"
categories: 
  - "javascript"
tags: 
  - "javascript"
  - "プログラミング"
  - "morikenjuku"
  - "学習記録"
  - "言語チャレンジ"
coverImage: "Twitter-post-5.jpg"
---

もりけん塾で新たに追加された課題....「 [言語チャレンジ](https://github.com/kenmori/handsonFrontend/blob/master/work/basic/Work.md) 」に取り組んでいます。

課題はあらかじめinputする値が決まっていて、outputの値が戻り値になる様にコードを書きます  
ここではoutputした値が、課題で提示されている通りになっていればクリアとなります。

今回は、課題23に取り組みました！

## 課題23

3つのパターンの input＆output があり、それぞれのinputに対して決められたoutputの値になる様な関数を考えます  
inputした配列同士で 一致した値を格納した配列を新たに返す方法を考えました  
一致する値がなければ空の配列を返します

input

```
[2, 1], [2, 3]
```

output

```
[2]
```

input

```
[5, 1], [2, 6]
```

output

```
[]
```

input

```
[2, 1, 6], [2, 3, 6]
```

output

```
[2, 6]
```

## filter

filterを使用して、inputした2つの配列の 同位置にある値を比較して、一致していれば値を返す方法で実装してみよう

```
const f = (a, b) => a.filter((value, index) => value === b[index]);

const result1 = f([2, 1], [2, 3]);
console.log(result1);
// [2]

const result2 = f([5, 1], [2, 6]);
console.log(result2);
// []

const result3 = f([2, 1, 6], [2, 3, 6]);
console.log(result3);
//  [2, 6]
```

## filter ＋ includes

filterだけの場合は配列の位置同士で比較を行なっているから、以下の様なパターンには使用できない

```
const f = (a, b) => a.filter((value, index) => value === b[index]);

const result1 = f([2, 1], [3,2]);
console.log(result1);
// []
```

同位置でなくても同じ結果になる様にしたい...  
includesを使用して、含まれているか？否かをfilterの条件にしよう

```
const f = (a, b) => a.filter((num) => b.includes(num));

const result1 = f([2, 1], [2, 3]);
console.log(result1);
// [2]

const result2 = f([5, 1], [2, 6]);
console.log(result2);
// []

const result3 = f([2, 1, 6], [2, 3, 6]);
console.log(result3);
//  [2, 6]
```

## filter + indexOf

indexOfを使用したverもやってみる  

indexOfメソッドは 引数の値が 指定した配列内にあれば 一致した最初のindexを返してくれる。その特性を使って、indexOfが返すindexと現在のindexが一致しなければ、重複しているということになるので、それを条件にfilterする

```
const f = (a, b) => {
 const arr = [...a, ...b];
 return arr.filter((value, index) => arr.indexOf(value) !== index);
};

const result1 = f([2, 1], [2, 3]);
console.log(result1);
// [2]

const result2 = f([5, 1], [2, 6]);
console.log(result2);
// []

const result3 = f([2, 1, 6], [2, 3, 6]);
console.log(result3);
//  [2, 6]
```

* * *

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
