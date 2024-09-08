---
title: "【もりけん塾】言語チャレンジ@配列を任意の個数に分割する"
date: "2022-01-18"
categories: 
  - "javascript"
tags: 
  - "javascript"
  - "プログラミング"
  - "morikenjuku"
  - "学習記録"
  - "言語チャレンジ"
coverImage: "Twitter-post-1-3.jpg"
---

もりけん塾で新たに追加された課題....「 [言語チャレンジ](https://github.com/kenmori/handsonFrontend/blob/master/work/basic/Work.md) 」に取り組んでいます。

課題はあらかじめinputする値が決まっていて、outputの値が戻り値になる様なコードを書きます  
ここではoutputの値が、課題で提示されている通りになっていればクリアとなります。

今回は、課題22に取り組みました！

## 課題22

2つのパターンの input＆output があり、それぞれ outputの値になる様な関数を考えます

input

```
 ["a", "b", "c", "d"]
```

and `2`

output

```
 [["a", "b"],["c", "d"]]
```

input

```
 ["a", "b", "c", "d"]
```

output

```
 [["a", "b","c"], ["d"]]
```

## とりあえず考えをまとめる

\- slice()を使用してできそう  
\- 全体の関数の引数に 範囲(index)を渡せる様にして  
それをsliceの引数に渡せば良さそう

2つ目のinputの値は **\["a", "b", "c", "d"\]** だけ  
2つ目の仮引数へ範囲を渡すことができない...  
初期値を設定することで解決できそう

考えをまとめたので、とりあえずコードを書いてみた

```
const input = ["a", "b", "c", "d"]
 let arr = [];
 const f = (parma, size) => {
    const a = parma.slice(0, size);
    const b = parma.slice(size);
    arr.push(a, b);
}
```

1つ目のinputを渡した場合

```
f(input,2); 
console.log(arr);  // [["a", "b"],["c", "d"]]
```

2つ目のinputを渡した場合

```
f(input); 
console.log(arr);  // [["a", "b","c"], ["d"]]
```

どちらのinputを入れても 指定されたoutputの値になりましたが  
変数arrの配列にpush為、1つ目と2つ目を一緒に実行した場合 意図していないoutputになってしまうのと、もう少しシンプルにコードを書けると思いました。

## slice

もっとシンプルに書けそう

```
const input = ["a", "b", "c", "d"]
const f = (parma, size = 3) => [parma.slice(0, size), parma.slice(size)];

const result1 = f(input, 2);
console.log(result1); // [["a", "b"],["c", "d"]]

const result2 = f(input);
console.log(result2); // [["a", "b","c"], ["d"]]
```

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global\_Objects/Array/slice

## splice

spliceというメソッドを発見!  
sliceと違い spliceは破壊的なメソッドの為 元の配列を壊してしまう  
  
仮引数でスプレッド構文を使用して  
クローンに対してspliceを使えば良さそう

```
const input = ["a", "b", "c", "d"]
const f = ([...parma], size = 3) => [parma.splice(0, size), parma];

const result1 = f(input,2);
console.log(result1);  //  [["a", "b"],["c", "d"]]

const result2 = f(input);
console.log(result2);  // [["a", "b","c"], ["d"]]
```

こうすることで変数inputへは影響することがなく 実装することができました

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global\_Objects/Array/splice

* * *

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
