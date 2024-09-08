---
title: 'TypeScriptでfilterを型安全に使う方法を調べた記録'
date: '2024-02-27'
---

お馴染みのネタかもしれないけれど、自分なりに調べたことをまとめておく

## 課題

配列からnullableな値を除去するために、filterメソッドを使用するケース。  
返り値の型情報が、`(string | number)[]`となって欲しいところだが、`(string | number | null)[]`と推論されてしまう

```
  const nullableArray = ["ほげほげ", null, "ふぁふぁ", null,100];
  const filteredArray = nullableArray.filter((item) => {
    return item !== null
  })
```

filterの型定義は下記のようになっていた。返り値が`T[]`、つまりfilterメソッドの第一引数で渡したコールバック関数の第一引数に入る値の型配列になる。この型をみると、nullableな値を取り除いた型にならないことがわかる

```
 filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
```

(GitHubの[issue](https://github.com/microsoft/TypeScript/issues/16069)でも見つけたけど、全て追えていない・・・)

## asを使う

```
  const nullableArray = ["ほげほげ", null, "ふぁふぁ", null ,100];
  const filteredArray = nullableArray.filter((item) => {
    return item !== null
  }) as (string | number)[]
```

(安易にasを使用することで型安全とは言えなくなってしまうのでできる限り避けたい...)

ここで[敗北者のTypeScript](https://qiita.com/uhyo/items/aae57ba0734e36ee846a)の一文を引用します。

> - TypeScriptで`--strict`を使わない人や、`any`とか`as`を濫用する人は敗北者です。
> - これらを使っていいのはあなたがTypeScriptよりも賢くて真にそれが必要だと分かっている場合だけです。
>
> 敗北者のTypeScript https://qiita.com/uhyo/items/aae57ba0734e36ee846a

## isを使う

```
  const nullableArray = ["ほげほげ", null, "ふぁふぁ", null, 100];
  const filteredArray = nullableArray.filter((item):item is string => {
    return item !== null
  })
```

`is`演算子で型ガードを行い、`(string | number)[]`に絞り込む  
[ユーザー定義型ガードによる解決と型安全性](https://zenn.dev/kimuson/articles/filter_safety_type_guard#%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E5%AE%9A%E7%BE%A9%E5%9E%8B%E3%82%AC%E3%83%BC%E3%83%89%E3%81%AB%E3%82%88%E3%82%8B%E8%A7%A3%E6%B1%BA%E3%81%A8%E5%9E%8B%E5%AE%89%E5%85%A8%E6%80%A7) で指摘されている通り、実装が正しいかのチェックまでは行えないため下記のような実装をしてしまった場合、意図しない挙動を孕む危険性が高まる

```
  const nullableArray = ["ほげほげ", null, undefined, null, 100];
  const filteredArray = nullableArray.filter((item):item is string => {
    return item !== null
  })  // (string | number)[]　だけど実際にはundefinedも存在している
```

またユーザー定義の型ガードでいうと[NonNullable](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)というユーティリティ型を使用することもできる

```
  const nullableArray = ["ほげほげ", null, null, null, 100];
  const filteredArray = nullableArray.filter((item):item is NonNullable<typeof item> => {
    return item !== null
  })  // (string | number)[]
```

どちらにせよ実装を保証するテストも一緒にあると安全に近づくと言えそう。。。

## flatMapを使う

[flatMap](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)を使い、nullableな値であれば空配列を返すようにする。[flatMap](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)は最終的に配列内を平坦化したもの返却してくれるので下記の例だと `(string | number)[]` となる。

```
 const nullableArray = ['ほげほげ', null, null, null, 100];
  const filteredArray = nullableArray.flatMap((item) => {
    return item ?? [];
  });   // (string | number)[]
```

[【TypeScript】配列の型を絞り込むときはflatMapがおすすめ](https://zenn.dev/spacemarket/articles/51613197db688d)

### 参考記事

- [How To Filter Nullable Values From An Array Using TypeScript](https://www.chakshunyu.com/blog/how-to-filter-nullable-values-from-an-array-using-typescript/)
