---
title: '【JavaScript Tips#1】StringにSliceを使用する/StringをArrayに/NumberをArrayに'
date: '2022-08-19'
categories:
  - 'javascript'
tags:
  - 'codewars'
  - 'javascript'
  - 'プログラミング'
  - '学習記録'
coverImage: 'Twitter-post-24.jpg'
---

毎日[codewars](https://www.codewars.com/)に取り組んでいます！

[codewars](https://www.codewars.com/)で学んだこと、もう少し深堀して調べたことをTips感覚で残します。  
今回は、StringとNumberの扱いについてを調べました

## 文字列にSliceを使用する

配列でしか使えないメソッドだと思ってた...

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global\_Objects/String/slice

```
// 構文
// slice(indexStart, indexEnd)

// indexEndは含まれない
console.log("012345".slice(0,3));
// 012

// indexStartがlength以上だった場合は空文字が返る
console.log("012345".slice(6));
// ""

// 0以下の場合は
console.log("012345".slice(-1));
// 5
```

### 最初と最後の文字を取り除く

```
// input: *abcdef*
// output: abcdef

function hoge(str) {
  return str.slice(1, -1);
}

console.log(hoge("*abcdef*"))
// abcdef
```

## StringをArrayにする

```
// input: abcdef
// output: ['a', 'b', 'c', 'd', 'e', 'f']

```

### Split

```
"abcdef".split('')
// ['a', 'b', 'c', 'd', 'e', 'f']
```

### Spred構文

```
[..."abcdef"]
// ['a', 'b', 'c', 'd', 'e', 'f']
```

## 文字列にスペースやピリオドが含まれている場合

```
// input: "abc def ghi."
// output: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
```

## NumberをArrayにする

```
String(12345).split("")
// ['1', '2', '3', '4', '5']

[...12345 + ""]
// ['1', '2', '3', '4', '5']
```

先ほどは文字列でしたが、次はNumberの状態で格納された配列を作る

```
// input : 12345
// output: [1,2,3,4,5]

// arrayfromを使用する
Array.from(String(12345), Number)
// [1,2,3,4,5]

// mapを使用する
String(12345).split("").map(Number)

// other
[...12345 + ""].map(Number)
```

## まとめ

[codewars](https://www.codewars.com/)をやっていてStringとNumberの扱いは  
理解が浅いためかなり弱点だと気づくことができました。  
これを機に理解を深めたい！！！！！

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
