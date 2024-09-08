---
title: 'TypeScript学習記録③typeとinterface'
date: '2022-08-19'
categories:
  - 'javascript'
  - 'typescript'
tags:
  - 'javascript'
  - 'typescript'
  - 'プログラミング'
  - '学習記録'
coverImage: 'Twitter-post-22-2-1.jpg'
---

この記事はTypeScriptを勉強していく中で、学んだことや疑問に思ったことを記録していくための記事です。  
今回は、typeとinterfaceについてを学びました。

## type

```
// typeの後に任意の名前(大文字から始まる)を付け型をつけることができる
type TypeName = {name: string,age:number};

// 使用方法
let obj :TypeName;
obj = {name: "sae", age:10};
```

### アロー関数

```
type Func = (num:number) => void;

const f:Func = (num) => {
  console.log(num)
}
f(100);
```

## interface

```
// interfaceの後に任意の名前をつけることができる
interface User {
  name: string;
  onClick: () => void
}

// 使用方法
const hogehoge: User = {
  name: "hogehoge",
  onClick: () => console.log("hoooooo")
};
```

### optionalにする

```
// ?を付けることでオプショナルになる
interface User {
  name: string;
  onClick?: () => void
}

const hogehoge: User = {
  name: "hogehoge",
};
```

### extendsする

```
interface User {
  name: string;
  onClick: () => void
}

interface UserAndFriends extends User{
  friends: string[]
}

const hoge:UserAndFriends = {
  name: "sae",
  onClick: () => console.log("yaaaaa"),
  friends:["taro","hanako"]
}
```

### 関数

```
interface Message {
  (message: string) : void
}

const hello:Message = (message) => {
  console.log(message)
}
```

## typeとinterfaceの違い

### Declaration merging

interfaceの場合、型名が重複するとそれらはマージされる。

```
interface User {
  name: string;
  onClick: () => void
}

interface User {
  age: number;
}

// Error
// Property 'age' is missing in type '{ name: string; onClick: () => void; }' but required in type 'User'
// ageが足りないと言っている...
const hoge:User = {
  name: "sae",
  onClick : () => console.log("Yaaaa!!!!!"),
}

// OK
const hoge:User = {
  name: "sae",
  onClick : () => console.log("Yaaaa!!!!!"),
  age:10
}
```

typeの場合はエラーがでて、マージされない

```
type User= {
  name: string;
  onClick: () => void
}

// Duplicate identifier 'User'.
type User ={
  age: number;
}
```

## 定義できる型のちがい

### プリミティブ型

```
// OK
type User= string;

// NG
interface Age {string}
```

### タプル型

```
// OK
type User= [name:string,name:string];

// NG
interface User {[name:string,name:string]}
```

### ユニオン型

```
// OK
type User= string | undefined;

// NG
interface User {string | undefined};
```

以下のようにもできる

```
interface A {
  name : string
 }

 interface B {
   age: number
 }

type Hoge = A & B;
const hoge:Hoge = {name:"sae",age:10};
```

## objectの統合

interfaceの場合はextendsを使用する

```
interface A {
  name: string;
  age: number;
}

interface B  {
  foo: string
}

interface Hoge extends A,B {};

const hoge:Hoge = {
  name: "sae",
  age:20,
  foo: "foo"
}
```

typeの場合は＆を使用する

```
type A = {
  name: string;
  age: number;
}

type B = {
  foo: string
}

type Hoge = A & B;

const hoge:Hoge = {
  name: "sae",
  age:20,
  foo: "foo"
}
```

## 参考記事

https://fettblog.eu/tidy-typescript-prefer-type-aliases/

https://blog.logrocket.com/types-vs-interfaces-in-typescript/

https://learntypescript.dev/04/l7-interfaces-v-type-aliases
