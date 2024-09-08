---
title: "TypeScript学習記録#1 基礎のき"
date: "2022-08-17"
categories: 
  - "javascript"
  - "typescript"
tags: 
  - "javascript"
  - "typescript"
  - "プログラミング"
  - "学習記録"
coverImage: "Twitter-post-22.jpg"
---

この記事はTypeScriptを勉強していく中で、学んだことや疑問に思ったことを記録していくための記事です。

## TypeScriptについて

- ブラウザで直接実行されない

- JavaScriptへ変換(トランスパイル)し、使用する

- ブラウザだけではなくNode.jsでも使用できる

## アノテーションのつけ方

### 変数

```
let hoge: number;

hoge = 10;

// Type 'string' is not assignable to type 'number'
hoge = "こんにちは"
```

### 関数

```
// 引数、返り値にもアノテーションがつけられる
function add(a:number,b:number):number {
  return a + b
}

// アロー関数Ver
const add = (a:number,b:number):number => a　+　b
```

### 配列

```
const numbers: Array<number> = [1,2,3,4,5];

const numbers: number[] = [1,2,3,4,5]

// オブジェクトを含む
const user :{name: string,age:number}[] = [{name: "hoge",age: 100}];


// 特定の型で定義されている配列に異なる型の値を入れるとErrorになる
numbers.push("hoge");
// Argument of type 'string' is not assignable to parameter of type 'number'.
```

### タプル型

配列を特定の数、型に制限することができるTypeScriptの機能  
より中身が明確で静的な場合に使用する

```
const user: [string, number] = ['Hoge', 20];

// Error
// 定義されている型、数に一致させる必要がある
const numbers: [number, number] = [1];
// Type '[number]' is not assignable to type '[number, number]'.
// Source has 1 element(s) but target requires 2.
```

https://dev.to/spukas/typescript-arrays-and-tuples-j58

https://dev.to/vicradon/difference-between-a-tuple-and-array-in-typescript-28ic

### ラベルを付ける

```
const user: [name:string,age:number] = ["Hoge",30];
```

### **Variadic Tuple Type**

```
const hoge: [name: string, ...numbers: number[]] =["hoge",1,2,3,4,5];
```

https://qiita.com/uhyo/items/7e31bbd93a80ce9cec84

### 関数

```
// 引数に型アノテーションがない場合
function add(num) {
  return num + num;
}
// num type is any

// 引数に型アノテーションがある場合
function add(num:number) {
  return num + num;
}
// num type is number 
```

### 残余引数

```
function hoge(...number:number[]) {
  console.log(number)
}

// Argument of type 'string' is not assignable to parameter of type 'number'.
hoge("aaaaa")

// OK
hoge(1,2,3,4,5)
```

### オブジェクト

```
const user :{name:string,age:number} = {
  name: "Hoge",
  age: 20,
};
```

## 型推論

### letとconst

```
// type is string
let name = "Sae"
// type is apple
const fruit = "apple";
```

### letとany型

```
let counter;
counter = 10; 
// counter type is any
```

#### any型とは

型チェックの対象から外れる

```
let hoge; // hoge type is any
// どんな型でもOK
hoge = "string";
hoge = 100;
hoge = true;
hoge = new Date();
```

### 配列

```
const arr = [];
// arr type is any

const strings = ["one", "two", "three"];
// strings type is string[]

const numbers = [1,2,3,4,5];
// numbers type is number[]
```

### オブジェクト

```
const user = {
  name: "Hoge",
  age: 20
};

// user type is user {name: string,age: number}

// Error
user.gender = "woman"
// Property 'gender' does not exist on type '{ name: string; age: number; }'


```

## Optionalにする方法

```
const hoge = (num?:number) => {
  return num || 0
}

// 引数が２つ以上ある場合に、１つめだけオプショナルにすることはできない
const hoge = (a:number,b?:number) => {
  return a + (b || 0)
}
```

### オブジェクト

```
interface Foo {
  bar?: string;
  baz?: number;
}

const test: Foo = {};
console.log(test);
```

### Partial

```
interface Foo {
  bar: string;
  baz: number;
}

const test: Partial<Foo> = {};
```

## まとめ

学んだこと、参考にしたサイトも残しました  
今後もTypeScriptの学んだことをブログに残していきます。
