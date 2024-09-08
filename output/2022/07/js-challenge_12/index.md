---
title: '【もりけん塾】言語チャレンジ@￼uniqueな要素の配列と、その要素をカウントした配列をつくる'
date: '2022-07-30'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'プログラミング'
  - 'morikenjuku'
  - '学習記録'
  - '言語チャレンジ'
coverImage: 'Twitter-post-21-1.jpg'
---

もりけん塾の課題 [言語チャレンジ](https://github.com/kenmori/handsonFrontend/blob/master/work/basic/Work.md) に取り組んでいます！

課題ではあらかじめinputする値とoutputする値が決まっていて、  
inputの値を関数の引数として渡し、outputの値を出力するというものです  
ここではinputとoutputの値が合っていればクリアとなります  
ブログでは課題を解くために考えたことや、様々な書き方を模索することを目的としています。

## 課題30

ランダムな数字があります。昇順のユニークな要素配列とそのユニーク要素が何回出現したかを表す配列を出力してください。for文で実装すること

input

```
[2, 2, 5, 2, 2, 2, 4, 5, 5, 9];
```

output

```
[[2,4,5,9], [5,1,3,1]]
```

## とりあえず書いてみる

uniqueな値と、それがいくつ出現したかを格納できるようなObjectを作ればいいのでは？  
`[{uniq: uniq,count: count}...]` ←こんな感じ

```
const input = [2, 2, 5, 2, 2, 2, 4, 5, 5, 9];

const f = (parma) => {
  let arr = [];
  let uniq = [];
  let count = [];
  for (let i = 0; i < parma.length; i++) {
    if (parma.indexOf(parma[i]) === i) {
      arr.push({ uniq: parma[i], count: 1 });
    } else {
      const a = arr.find((d) => d.uniq === parma[i]);
      a.count++;
    }
    arr.sort((a, b) => a.uniq - b.uniq);
  }

  arr.forEach((d) => {
    uniq.push(d.uniq);
    count.push(d.count);
  });

  return [uniq, count];
};

console.log(f(input));
```

最終的に配列にするための処理(forEachしているところ)がなんか苦しい気がする...

## {uniq: count}にしてみる

格納するデータ構造を`[{uniq: count},....]`のように  
keyにuniqueな値、値をカウント数にすれば最終的に`Object.Keys` or `Object.values`で配列で取り出しやすいのでは...?

```
const input = [2, 2, 5, 2, 2, 2, 4, 5, 5, 9];

const f = (parma) => {
  let obj = {};
  for (let i = 0; i < parma.length; i++) {
    if (parma.indexOf(parma[i]) === i) {
      obj[parma[i]] = 1;
    } else {
      obj[parma[i]]++;
    }
  }
  const changeToNumbers = () => Object.keys(obj).map((value) => Number(value));
  return [changeToNumbers(), Object.values(obj)];
};

console.log(f(input));
```

KeyがStringな為、最終的にNumberへ型変換しないとなのが気になるな

## Mapを使用してみる

先生のツイートを発見...  
MapはkeyをNumberでデータを格納できるだと...?!  
早速使ってみよう

https://twitter.com/terrace\_tech/status/1553266531299389440?s=20&t=qfjViXdmzYQ6\_coxp2B\_\_Q

```
const input = [2, 2, 5, 2, 2, 2, 4, 5, 5, 9];

const f = (parma) => {
  const map = new Map();
  const sortedArr = [...parma].sort((a, b) => a - b);
  for (let i = 0; i < sortedArr.length; i++) {
    if (sortedArr.indexOf(sortedArr[i]) === i) {
      map.set(sortedArr[i], 1);
    } else {
      const count = map.get(sortedArr[i]);
      map.set(sortedArr[i], count + 1);
    }
  }
  return [[...map.keys()], [...map.values()]];
};

console.log(f(input));
```

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global\_Objects/Map

## それぞれ配列にpushする

filterで対象の値だけの配列(`[2,2,2,2,2,2]`)にして、lengthで数を取得することもできるのでは...?

```
const input = [2, 2, 5, 2, 2, 2, 4, 5, 5, 9];

const f = (parma) => {
  const count = [];
  const uniq = [];
  parma.sort((a, b) => a - b);
  for (let i = 0; i < parma.length; i++) {
    if (parma.indexOf(parma[i]) === i) {
      uniq.push(parma[i]);
      count.push(parma.filter((d) => d === parma[i]).length);
    }
  }
  return [uniq, count];
};

console.log(f(input));
```

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
