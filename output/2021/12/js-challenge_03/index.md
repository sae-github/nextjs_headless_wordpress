---
title: '【もりけん塾】言語チャレンジ@reduceを使用してオブジェクトをグループ化する'
date: '2021-12-08'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'プログラミング'
  - 'morikenjuku'
  - '学習記録'
coverImage: 'WebブラウザにWebサイトが表示までの旅へ-1.jpg'
---

もりけん塾で新たに追加された課題....「 [言語チャレンジ](https://github.com/kenmori/handsonFrontend/blob/master/work/basic/Work.md) 」に取り組んでいます。

課題はあらかじめinputする値が決まっていて、outputの値が戻り値になる様なコードを書きます  
ここではoutputの値が、課題で提示されている通りになっていればクリアとなります。

今回は課題の中で出てきた、reduceを使用してオブジェクトをグループ化する方法を考えてみました

## 課題10

input

```
[
  { id: "a", value: 1 },
  { id: "b", value: 2 },
  { id: "c", value: 3 }
]
```

output

```
{
  ids: ["a", "b", "c"],
  entities: {
    a: { value: 1 },
    b: { value: 2 },
    c: { value: 3 }
  }
}
```

## ids: \["a", "b", "c"\]の部分を考える

最終的にオブジェクトに格納された状態にしたい  
→reduceでできそう  
`ids: ["a", "b", "c"]`の部分は mapを使用して、配列に格納できるな

```
const input = [
  { id: 'a', value: 1 },
  { id: 'b', value: 2 },
  { id: 'c', value: 3 },
];

const output = (parma) => {
  return parma.reduce((obj, current) => {
    obj['ids'] = input.map((value) => value.id);
    return obj;
  }, {});
};

// {  ids: ['a', 'b', 'c']  }
```

## entities: {a: { value: 1 },b: { value: 2 },c: { value: 3 }}を考える

ふつーに書いていける？？

```
const output = (parma) => {
  return parma.reduce((obj, current) => {
    obj['entities'] = { [current.id]: { value: current.value } };
    return obj;
  }, {});
};
// {entities:{c:{value:3}}}
```

はい、ダメ。  
私の気持ち的には、reduceの初期値で設定しているオブジェクト(obj)のプロパティに、  
ループごとに追加して欲しかったのですが、これではループごとに上書きされてしまい、  
最終的な戻り値は、最後の要素のみになってしまいました。

上書きされないために、器が必要だ...!!!  
その器に \* : { value: \* }, をループごとに追加していって  
entitiesキーの値に追加すればいける気がする

reduceの外で空のオブジェクトを定義しました

```
const output = (parma) => {
  let entriesObj = {};
  return parma.reduce((obj, current) => {
    obj['ids'] = input.map((value) => value.id);
    entriesObj[current.id] = { value: current.value };
    obj['entities'] = entriesObj;
    return obj;
  }, {});
};
```

output通りの値が返ってきました！

## reduceのみ

初期値にキーと型を指定して、そこに追加していく方法を取りました

```
const output = (parma) => {
  return parma.reduce(
    (obj, current, index) => {
      obj.ids[index] = current.id;
      obj.entities[current.id] = { ['value']: current.value };
      return obj;
    },
    { ids: [], entities: {} }
  );
};
```

## reduce、スプレッド構文

```
const output = (parma) => {
  return parma.reduce((obj, current) => {
    obj["entities"] = {...obj.entities, [current.id]: { value: current.value } }
    obj.ids = [...obj.ids,current.id];
    return obj;
  }, { ids: [] });
};
```

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
