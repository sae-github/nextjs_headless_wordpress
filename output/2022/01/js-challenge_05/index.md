---
title: '【もりけん塾】言語チャレンジ@配列内の隣合う値を足し算する'
date: '2022-01-08'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'プログラミング'
  - 'morikenjuku'
  - '学習記録'
  - '言語チャレンジ'
coverImage: '新型コロナ-1-scaled.jpg'
---

もりけん塾で新たに追加された課題....「 [言語チャレンジ](https://github.com/kenmori/handsonFrontend/blob/master/work/basic/Work.md) 」に取り組んでいます。

課題はあらかじめinputする値が決まっていて、outputの値が戻り値になる様なコードを書きます  
ここではoutputの値が、課題で提示されている通りになっていればクリアとなります。

今回は、課題20に取り組みました！

## 課題20

Return the result of adding the elements next to each other as an array.

input

```
[1, 2, 4, 10, 12]
```

output

```
[3, 6, 14, 22]
```

loopさせて、条件分岐させればできそう  
配列内の最後の要素以外、隣の値と足し算する条件式にしてみよう

## for文

```
const input = [1, 2, 4, 10, 12];

let result = [];
for (let i = 0; i < input.length - 1; i++) {
  result[i] = input[i] + input[i + 1];
}

console.log(result);
//  output [3, 6, 14, 22]
```

まずはfor文で書いてみました。  
loopの条件は `i < input.length - 1` としました

また、インクリメントで書いてしまうと意図しない挙動になります

```
let result = [];
for (let i = 0; i < input.length - 1; i++) {
  result[i] = input[i] + input[++i];
}
console.log(result);
// output [3, empty, 14]
```

二重でインクリメントが起こり 変数 iの値が意図していない値になってしまいました

## map

新しい配列を返したいから map使ってみよう

```
const input = [1, 2, 4, 10, 12];

const f = (parma) => {
  return parma.map((value, index) => {
    if (index < parma.length - 1) {
       return value + input[++index];
     }
 });
}
console.log(f(input));
// output  [3, 6, 14, 22, undefined]
```

最後の要素が条件式で弾かれ、明示的に返すものが指定されていない為 undefinedが返りました....

filterを使用して、undefinedだけ取り除きました  
値がTruthyであれば値が返り 新たな配列が返りました

```
const f = (parma) => {
   return parma.map((value, index) => {
    if (index < parma.length - 1) {
      return value + input[++index];
     }
   });
  }
const result = f(input).filter((value) => value);
console.log(result);

// output [3, 6, 14, 22]
```

## reduce

reduceを使用して、条件に一致する値のみ計算し 新しい配列に格納しよう

```
const input = [1, 2, 4, 10, 12];

const f = (parma) => {
  return parma.reduce((result, value, index, array) => {
     if (index < array.length - 1) { // 最後の要素以外であれば隣の値を足す
       result[index] = value + array[++index];
     }
      return result;
    }, []);
}
console.log(f(input));
//  output [3, 6, 14, 22]
```

以上です

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
