---
title: "【もりけん塾】言語チャレンジ@中間と一番最初の値を抜きとる"
date: "2022-02-27"
categories: 
  - "javascript"
tags: 
  - "javascript"
  - "morikenjuku"
  - "学習記録"
  - "言語チャレンジ"
coverImage: "Twitter-post-11.jpg"
---

![管理人](/images/43D8A608-67A3-48E2-9600-EFFAEB7E218E_1_201_a-150x150.jpeg)

管理人

こんにちは、さえと申します👩‍💻  
現在 フロントエンドエンジニアになるために 日々勉強をしています  
このブログは その勉強の記録と アウトプットのために運営をしています✨

* * *

もりけん塾の課題 言語チャレンジ に取り組んでいます！

https://github.com/kenmori/handsonFrontend/blob/master/work/basic/Work.md

課題ではあらかじめinputする値とoutputする値が決まっていて、  
inputの値を関数の引数として渡し、outputの値を出力するというものです  
ここではinputとoutputの値が合っていればクリアとなります  
ブログでは課題を解くために考えたことや、様々な書き方を模索することを目的としています。

## 課題25

3つのパターンの input＆output があり、  
それぞれのinputに対して 決められたoutputの値になる様な関数を考えます

input

```
[1, 2, 3, 4, 5, 6, 7 ,8 ,9, 10]
```

output

```
[5, 2, 1]
```

input

```
[1, 2, 3, 4, 5, 6, 7 ,8 ,9, 10, 11]
```

output

```
[6, 3, 1]
```

input

```
[1, 2, 3, 4, 5, 6, 7 ,8 ,9, 10, 11, 12, 13, 14, 15]
```

output

```
[8, 4, 2, 1]
```

## とりあえず中間の値を求めてみる

今回は問題をみてもすぐに実装方法が思いつかず、かなり悩みました  
  
まずは中間の値を求める方法を考えました  
配列のlengthを半分に割り、小数点がでた場合は切り上げます  
`Math.ceil()` は 小数点以下を繰り上げるメソッドです

```
const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const center = Math.ceil(input.length / 2);
console.log(center);
// output : 5
```

## 中間で切り抜き、さらにその中間を...

![考えたこと](/images/43D8A608-67A3-48E2-9600-EFFAEB7E218E_1_201_a-150x150.jpeg)

考えたこと

中間の値を求めることはできた、

その中間で配列を抜き出して、その配列の中の中間を求めて...って感じでやってみよう

![](/images/1-2-3-4-5-6-7-8-9-10-1-1024x576.jpg)

  
slice・ spliceでできそう

  

### slice

まずはsliceを使って考えてみる  
sliceの引数は、取り出し開始のindexと 取り出しを終える直前のindexを指定する

```
const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const center = Math.ceil(input.length / 2);
const sliced = input.slice(0, center - 1);
console.log(sliced);  // [1, 2, 3, 4]
```

再帰関数を使用して、sliceした後の配列内に値があれば処理を繰り返すように書いてみる  
変数に空の配列を定義して、そこへ中間の値をpushしていきます

```
const output = (input) => {
  let arr = [];
  const f = (parma) => {
    const center = Math.ceil(parma.length / 2); 
    arr.push(center);
    const sliced = parma.slice(0, center - 1);
    sliced.length > 0 && f(sliced);
    return arr;
  };
  return f(input);
};
console.log(output([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
// output:  [5, 2, 1]
```

### splice

spliceバージョンでも実装してみました

```
const output = (input) => {
  let arr = [];
  const f = (parma) => {
    const center = Math.ceil(parma.length / 2);
    arr.push(center);
    parma.splice(center - 1);
    parma.length > 0 && f(parma);
    return arr;
  }
  return f(input);
}

console.log(output([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
// output:  [5, 2, 1]
```

## 問題点

今回は上記のコードでPRしましたが、一つ問題があることに気がつきました  
それは配列内の値に依存しているということです

例えば inputする配列が以下のような配列だった場合も 戻り値は`[5,2,1]`になってしまいます...

```
const output = (input) => {
  let arr = [];
  const f = (parma) => {
    const center = Math.ceil(parma.length / 2);
    arr.push(center);
    const sliced = parma.slice(0, center - 1);
    sliced.length > 0 && f(sliced);
    return arr;
  };
  return f(input);
};

console.log(output(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]));
// output:  [5, 2, 1]
```

![考えたこと](/images/43D8A608-67A3-48E2-9600-EFFAEB7E218E_1_201_a-150x150.jpeg)

考えたこと

pushする値に問題がある。

indexで値を指定する方法にすれば出来そう

indexは0からなので、配列の中間を求め そこから1を引くことで indexとなると考えました

```
const output = (input) => {
  let arr = [];
  const f = (parma) => {
    const middleIndex = Math.ceil((parma.length / 2) - 1);
    arr.push(parma[middleIndex]);
    const sliced = parma.slice(0, middleIndex);
    sliced.length > 0 && f(sliced);
    return arr;
  };
  return f(input);
};

console.log(output(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]));
// output:  ['e', 'b', 'a']
```

* * *

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
