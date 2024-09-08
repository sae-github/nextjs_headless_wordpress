---
title: '【もりけん塾】言語チャレンジ@配列内の重複した値を取り除く'
date: '2022-07-29'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'プログラミング'
  - 'morikenjuku'
  - '学習記録'
  - '言語チャレンジ'
coverImage: 'Twitter-post-11.jpg'
---

---

もりけん塾の課題 [言語チャレンジ](https://github.com/kenmori/handsonFrontend/blob/master/work/basic/Work.md) に取り組んでいます！

課題ではあらかじめinputする値とoutputする値が決まっていて、  
inputの値を関数の引数として渡し、outputの値を出力するというものです  
ここではinputとoutputの値が合っていればクリアとなります  
ブログでは課題を解くために考えたことや、様々な書き方を模索することを目的としています。

## 課題29

no debule

input

```
["a", "b", "c", "a", "c", "d"]
```

output

```
["a", "b", "c", "d"]
```

## Set

Setが使えそう...

```
const input = ["a", "b", "c", "a", "c", "d"];
const output = [...new Set(input)];

console.log(output); //[ "a", "b", "c", "d" ]
```

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global\_Objects/Set

## filter × indexOf

filterとindexOfを使用してもできそう  
indexOfは一致した値の最初のindexを返すからそれを利用すればよさそう

```
const input = ["a", "b", "c", "a", "c", "d"];
const result = input.filter((value, i) => input.indexOf(value) === i);
console.log(result);
```

## 参考記事

https://medium.com/front-end-weekly/es6-set-vs-array-what-and-when-efc055655e1a

https://qiita.com/netebakari/items/7c1db0b0cea14a3d4419

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
