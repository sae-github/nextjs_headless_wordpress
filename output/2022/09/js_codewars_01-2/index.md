---
title: "【Codewars】Regexの問題に取り組んだ記録"
date: "2022-09-16"
categories: 
  - "codewars"
  - "javascript"
tags: 
  - "codewars"
  - "javascript"
  - "プログラミング"
  - "学習記録"
coverImage: "Twitter-post-26.png"
---

毎日[codewars](https://www.codewars.com/)に取り組んでいます！

[codewars](https://www.codewars.com/)で学んだこと、もう少し深堀して調べたことを残します。  
今回は[codewars](https://www.codewars.com/)でRegexの問題をいくつかやってみました。

## 問題1

数字が４桁または６桁であればtrueを、否であればfalseを返す関数を実装する

### 私の解

```
function f(pin) {
  const regex = /(^[0-9]{4}$|^[0-9]{6}$)/gi;
  return regex.test(pin);
}

console.log(f("1")); // false
console.log(f("1234")); // true
console.log(f("a234")); // false
```

先頭(^)と末尾($)、対象\[0-9\]が被っている(二回出現している)のが気になる…

以下は他の方の回答をみて学んだポイント、調べたことをまとめました

### 数字の正規表現

数字は以下の正規表現を使用して表現することができる　

```
\d
```

書き換えてみると…

```
function f(pin) {
  const regex = /(^\d{4}$|^\d{6}$)/gi;
  return regex.test(pin);
}

console.log(f("1")); // false
console.log(f("1234")); // true
console.log(f("a234")); // false
```

### 先頭と末尾以外をグループ化する

```
function f(pin) {
  const regex = /^(\d{4}|\d{6})$/g;
  return regex.test(pin);
}

console.log(f("1")); // false
console.log(f("1234")); // true
console.log(f("a234")); // false
```

## 問題2

小文字の英語がいくつ含まれているかを返す関数を実装する

### 私の解

```
function f(str) {
  const matchedStr = str.match(/[a-z]/g);
  return  matchedStr ? matchedStr.length: 0
}

console.log(f("abc")); //3
console.log(f("abcABC123")); //3
console.log(f("abcABC123!@€£#$%^&*()_-+=}{[]|':;?/>.<,~")); //3
console.log(f("")); //0
console.log(f("ABC123!@€£#$%^&*()_-+=}{[]|':;?/>.<,~")); //0
console.log(f("abcdefghijklmnopqrstuvwxyz")); // 26
```

## 問題3

ハイフン(`-`)/アンダースコア(`_`)で区切られた単語をキャメルケースに変換する

### 私の解

ハイフンorアンダースコアの直後に存在するアルファベットを大文字にreplaceしてみたらできそう  
前方一致(?<=)を使用して、表現できそう...!

```
function f(str) {
  if (str === "") return "";
  return str
    .replace(/((?<=_)|(?<=-))./g, (a) => a.toUpperCase())
    .split(/_|-/)
    .join("");
}

console.log(f("the_stealth_warrior"));
// theStealthWarrior"
console.log(f("The_stealth_warrior"));
// TheStealthWarrior
console.log(f("A-B-C"));
// ABC
```

### 空文字だった場合のif文は不要

私の書いたコードにある、下記のif文は不要でした

```
if (str === "") return "";
```

```
function f(str) {
  return str
    // matchするものはないので、replaceされず空文字のまま
    .replace(/((?<=_)|(?<=-))./g, (a) => a.toUpperCase())
    // [""]
    .split(/_|-/)
    .join("");
}
console.log(f("")); // ""
```

### **キャプチャグループ**

以下のケースだと、`(.)`にマッチし、マッチした内容を記憶する

```
function f(str) {
  return str.replace(/[-_](.)/g, (m, c) => c.toUpperCase());
}
```

https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular\_Expressions/Groups\_and\_Backreferences

### replace

replaceの第二引数に関数を渡しましたが、引数にどのようなものが渡ってくるのか。

```
function f(str) {
  return str.replace(/[-_](.)/g, (m, c, o, s) => {
    console.log(m, c, o, s);
  });
}
f("The_stealth_warrior");
// _s s 3 The_stealth_warrior
// _w w 11 The_stealth_warrior
```

`m`へは、replaceの第一引数で指定している正規表現にmatchする対象の値が渡り、  
`c`へはキャプチャされた値(複数ある場合もある)、`o`はoffsetでmatchした部分の位置を示す。  
`s`は分析中の対象の文字が渡ることがわかりました

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global\_Objects/String/replace

## まとめ

今回はRegexに絞ってやっていきました！  
正規表現は苦手意識があるので今後も[codewars](https://www.codewars.com/)で鍛えていきたいと思います
