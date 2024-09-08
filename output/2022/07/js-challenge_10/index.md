---
title: '【もりけん塾】言語チャレンジ@iteratorについて'
date: '2022-07-27'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'プログラミング'
  - 'morikenjuku'
  - '学習記録'
  - '言語チャレンジ'
coverImage: 'Twitter-post-20.jpg'
---

もりけん塾で JavaScriptの[言語チャレンジ](https://github.com/kenmori/handsonFrontend/blob/master/work/basic/Work.md)に 取り組んでいます

課題は `input`の値を`output`の値として出力することです  
関数の引数に inputの値を渡し、実行した結果をconsole.logで示します

ここではoutputの値が、課題で提示されている通りになっていれば クリアとなります  
つまり、ベストな書き方でなくても OKとなります

## 課題28

Remove "not", "so" element. not use Iterator method(map, forEach,...etc) and Iterator(for, while)

input

```
['today', 'was', 'not', 'so', 'great']
```

output

```
[['today', 'was', 'great'], ['not', 'so']]
```

iteratorって聞いたことがあるけど、説明できないな...

## iteratorとは

オブジェクトの内容を列挙するための仕組みを備えたオブジェクト。  
Symbol.iterator()で返されるオブジェクトで各要素にアクセスするためのnext()を提供してくれる

```
const hoge = [1, 2, 3, 4, 5];
const iterator = hoge[Symbol.iterator]();
console.log(iterator);
```

![](/images/スクリーンショット-2022-07-27-17.31.55-1.png)

具体的には以下の様な内容のオブジェクトをもつ

```
 next() {  // done,valueを含むオブジェクトが返される必要がある
   return {
    done: [true | false], // 反復の終了を表す(true -> 反復終了)
    value: value | undefined // 反復ごとに取得したい値(なければundefinedがかえる)
    }
 }
```

## iterableとは

Symbol.iteratorのキーをもつデータ構造(オブジェクト)のこと  
ex.) String, Array...などなど

Objectはiteratorを持っていない為、反復処理をすると以下の様なエラーが出る

```
const user = {
  name: "taro",
  age: 18,
  gender: "man",
};

for (const a of user) {
  console.log(a);
}

// Uncaught TypeError: user is not iterable

```

何度か見かけた**Uncaught TypeError: \*\* is not iterable** は iterableではないことを教えてくれていたのか...

### iteratorをつくってみる

先程のオブジェクトにiteratorを追加し、反復処理をしてuser情報を取り出してみる

`Symbol.iterator` プロパティに対してiteratorを設定することが必要

```
user[Symbol.iterator] = function () {
  let userKeys = Object.keys(this); // userのkeyを列挙した配列
  let index = 0;   // 現在のindex
  return {
    next: () => {
      if (index > userKeys.length - 1) {
        return {
          value: undefined,
          done: true,
        };
      }

      const userData = this[userKeys[index]];
      index++;
      return {
        value: userData,
        done: false,
      };
    },
  };
};

for (const data of user) {
  console.log(data);
}
```

## 再帰関数

今回はmapやforEach...forなども使用しないで書くような縛りがあるので  
再帰関数でかきました

```
const input = ['today', 'was', 'not', 'so', 'great'];
const f = (parma) => {
  let i = 0;
  let removed = [];
  let result = [...parma];

  const func = (value) => {
    if (value === 'not' || value === 'so') {
      removed.push(value);
      result.splice(i, i);
    }
    if (i < parma.length - 1) {
      i++;
      func(parma[i]);
    }
  };

  func(parma[i]);
  return [result, removed];
};

console.log(f(input));
```

## 参考記事

https://blog.logrocket.com/javascript-iterators-and-generators-a-complete-guide/

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration\_protocols#%E5%8F%8D%E5%BE%A9%E5%AD%90\_iterator\_%E3%83%97%E3%83%AD%E3%83%88%E3%82%B3%E3%83%AB

https://www.programiz.com/javascript/iterators-iterables

## まとめ

今回は縛りがあったので中々に苦戦しました...  
ですがiteratorについて学ぶきっかけになり、どのように反復処理がされているかを理解することができました。

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
