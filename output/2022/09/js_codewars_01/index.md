---
title: '【Codewars】pangramの検出'
date: '2022-09-07'
categories:
  - 'codewars'
  - 'javascript'
tags:
  - 'codewars'
  - 'javascript'
  - 'プログラミング'
  - '学習記録'
coverImage: 'Twitter-post-25.png'
---

毎日[codewars](https://www.codewars.com/)に取り組んでいます！

[codewars](https://www.codewars.com/)で学んだこと、もう少し深堀して調べたことをで残します。  
今回は[codewars](https://www.codewars.com/)でやったパングラムについてやっていきます

## pangramとは

> **パングラム** (_pangram_) は、[アルファベット](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%AB%E3%83%95%E3%82%A1%E3%83%99%E3%83%83%E3%83%88)を使用する[言葉遊び](https://ja.wikipedia.org/wiki/%E8%A8%80%E8%91%89%E9%81%8A%E3%81%B3)である。[ギリシア語](https://ja.wikipedia.org/wiki/%E3%82%AE%E3%83%AA%E3%82%B7%E3%82%A2%E8%AA%9E)で「すべての文字」という意味がある通り、すべての文字（26個のアルファベット）を使い文章を作るのが目的である。
>
> https://ja.wikipedia.org/wiki/%E3%83%91%E3%83%B3%E3%82%B0%E3%83%A9%E3%83%A0

## Let's Challenge

inputした文字列がa~zのアルファベットをすべて含んでいたらをtrue、  
いなければfalseを返す関数を作成する

### 最初に書いたコード

40分かけて生み出したコードです...

渡ってきた文字列をアルファベット順にsortし、  
Setを使用し重複を取り除き、変数alhaと一致しているかの結果を返しました

```
const f = (string) => {
  const alha = "abcdefghijklmnopqrstuvwxyz";
  const arr = string.toLowerCase().split("");
  const filterArr = arr.sort().filter((s) => alha.includes(s));
  return [...new Set(filterArr)].join("") === alha;
};

console.log(f("The quick brown fox jumps over the lazy dog.")); // true
console.log(f("This is not a pangram.")); // false
console.log(f("Cozy lummox gives smart squid who asks for job pen.")); // true
```

## いろんな回答をみてみる

codewarsではほかの方の回答を見ることができ、「いいね！」と思った回答にはbestPracticeを押すことができます。いくつかピックアップしてみてみました。

### match

これは思いつかないな、と感じました。。。

```
const f = (string) => {
   return  new Set(string.toLowerCase().match(/[a-z]/g)).size === 26;
};
```

### filter

アルファベットをfilterして一致しないアルファベットの数が０か否かの結果を返す

```
const f = (string) => {
    const s = string.toLowerCase();
    const alha = "abcdefghijklmnopqrstuvwxyz";
    return alha.split("").filter((a) => s.indexOf(a) === -1 ).length === 0;
};
```

## every

個人的にはこれが一番わかりやすくてイイナと思いました

```
const f = (string) => {
   const alha = [..."abcdefghijklmnopqrstuvwxyz"];
   return alha.every((a) => string.toLowerCase().includes(a));
};
```
