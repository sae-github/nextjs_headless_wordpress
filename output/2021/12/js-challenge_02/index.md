---
title: '【もりけん塾】言語チャレンジ@配列を[{0:"a"},{1:"b"},{2:"c"}]にする方法を考える'
date: '2021-12-01'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'プログラミング'
  - 'morikenjuku'
  - '学習記録'
  - '言語チャレンジ'
coverImage: 'WebブラウザにWebサイトが表示までの旅へ-3-1-1.jpg'
---

もりけん塾で新たに追加された課題....「 [言語チャレンジ](https://github.com/kenmori/handsonFrontend/blob/master/work/basic/Work.md) 」に取り組んでいます。

課題はあらかじめinputする値が決まっていて、outputの値が戻り値になる様なコードを書きます  
ここではoutputの値が、課題で提示されている通りになっていればクリアとなります。

今回は課題の中で出てきた、配列を\[{0:"a"},{1:"b"},{2:"c"}\]に加工する方法をいくつか考えてみました

## 課題7

input

```
["a", "b", "c"]
```

output

```
[{0: "a"}, {1: "b"}, {2: "c"}]
```

### map

最終的に配列で値を返したかったので、mapがいいのでは....？

まず一番に考えついたコードはmapを使用する方法です

```
const input = ["a", "b", "c"];
const f = (array) => {
  return array.map((value, index) => {
    let obj = {};
    obj[index] = value;
    return obj;
  });
}
const result = f(input);
console.log(result);
```

または

```
const input = ["a", "b", "c"];
const f = (array) => {
  return array.map((value, index) => {
    return obj = {
      [index]: value
    };
  });
}
const result = f(input);
console.log(result);
```

もっさり感を感じる....  
return は省略できそう。  
戻り値がオブジェクトの場合は()を使用するんだったハズ....

```
const input = ["a", "b", "c"];

const f = (param) => {
  return param.map((value, index) => ({ [index]: value }));
}
const output = f(input);
console.log(output);
```

### mapとObject.assign

配列で返して欲しい  
→mapを使用  
オブジェクト部分は、`Object.assign`を使用してできそう

```
const input = ["a", "b", "c"];

const f = (param) => {
  return param.map((el,index) => Object.assign({},{[index]:el}));
}

const output = f(input);
console.log(output)
```

### reduceとpush

最終的には 配列内に、オブジェクトを追加した一つの値を返して欲しい...  
→ reduceでできそう  
配列内にオブジェクト追加する  
→ pushが使えそう

```
const input = ["a", "b", "c"];

const f = (param) => {
  return param.reduce((array, el, index) => {
    array.push({ [index]: el });
    return array;
  }, []);
}

const result = f(input);
console.log(result);
```

## まとめ

今回はmapを使用した方法で、PRをしました

色々な方法を試していると、メソッドの使い方が少しずつ馴染んでくる感覚があります  
どんどん課題を進めていきます🙋‍♀️

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
