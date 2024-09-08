---
title: "【もりけん塾】言語チャレンジ@カウントダウンの方法を考える"
date: "2021-12-23"
categories: 
  - "javascript"
tags: 
  - "javascript"
  - "プログラミング"
  - "morikenjuku"
  - "学習記録"
  - "言語チャレンジ"
coverImage: "WebブラウザにWebサイトが表示までの旅へ-4-1.jpg"
---

もりけん塾で新たに追加された課題....「 [言語チャレンジ](https://github.com/kenmori/handsonFrontend/blob/master/work/basic/Work.md) 」に取り組んでいます。

課題はあらかじめinputする値が決まっていて、outputの値が戻り値になる様なコードを書きます  
ここではoutputの値が、課題で提示されている通りになっていればクリアとなります。

今回は、課題15に取り組みました！

## 課題14

input

```
3
```

output

```
3
2
1
0
```

Don't write

```
function a(){
  count(3)
  count(2)
  count(1)
  count(0)
}
```

## インクリメント・デクリメント復習

loopでできそう...  
デクリメントで、inputした値から1ずつ引いていけばいいかな

演算子の場所によって返される値が違った気がする。なんだっけな

> オペランドに後置で演算子を付けると (例えば、 `x++`) 、インクリメント演算子はインクリメントしますが、インクリメント前の値を返します。  
> オペランドに前置で演算子を付けると (例えば、 `++x`) 、インクリメント演算子はインクリメントし、インクリメント後の値を返します。
> 
> https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Increment

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Decrement

## for文 ver

loopといえばfor文

とりあえずfor文で書いてみる

```
 const input = 3;
 const f = parma => {
   for (let i = parma; i >= 0; i--) {
      console.log(i)
    }
  }
f(input);
```

## while文 ver

while文でもできそう

whileの方が早いって聞いたことあるぞ....!

```
const input = 3;
const f = parma => {
 while (parma >= 0) {
  console.log(parma);
  parma--;
 }
}
 f(input);
```

### for vs while

console.timeとconsole.timeEndを使用してそれぞれタイムを測ってみる

```
const input = 3;
const forVer = parma => {
 console.time("for")
 for (let i = parma; i >= 0; i--) {
   console.log(i)
  }
  console.timeEnd("for");
}
forVer(input);

const whileVer = parma => {
 console.time("while")
  while (parma >= 0) {
   console.log(parma);
     parma--;
   }
   console.timeEnd("while");
}
whileVer(input);
```

結果は以下の様になりました、今回の条件であればwhileの方がはやかったです

![](/images/スクリーンショット-2021-12-23-18.35.41.png)

## 再帰関数 ver

loopについて調べていると、再帰関数なるものをみつけましたので、  
再帰関数Verも考えてみました

```
const input = 3;
const f = (parma) => {
 console.log(parma);
 (parma > 0) && f(--parma);
}
f(input);
```

引数が0以上であれば、デクリメントした後の 値を自身の関数の引数に渡し実行する

## 参考記事

https://launchschool.com/books/javascript/read/loops\_iterating

https://www.section.io/engineering-education/javascript-iterations-which-one-is-faster/

* * *

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
