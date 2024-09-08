---
title: '【もりけん塾】JS課題9•10 async / await , try...catch...finally'
date: '2021-09-19'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'プログラミング'
  - 'morikenjuku'
  - '学習記録'
coverImage: '印刷しやすい-シンプルなフォルダー-ラベル-1-2.png'
---

現在、もりけん塾で  
[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/sae-github/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます。  
今回は課題9・10の実装で学んだことをブログへまとめます。

## 課題9

課題7をasync / awaitを使用して実装する

resolveになるまでの間にloading画像をだして、終わったら除く。

これはサーバーから値が渡ってくるまではそれを出して、  
渡ってきたら値を加工してhtmlとして書き出すを想定しています

https://itosae.com/js\_lesson07/

### async / await

#### async

> Async Functionとは非同期処理を行う関数を定義する構文です。 Async Functionは通常の関数とは異なり、必ず`Promise`インスタンスを返す関数を定義する構文です。
>
> https://azu.github.io/promises-book/#chapter5-async-function

```
async function fn() {
  return ("こんにちは");
}
console.log(fn());
```

確認するとPromiseインスタンスを返していて、  
returnした値をラップしていることも確認できました。

![](/images/スクリーンショット-2021-09-08-19.35.21.png)

#### await

async内でのみ使用可能。  
指定したPromiseが結果を返すまで、それ以降の処理を待機させることができる

```
async function hello() {
  return ("こんにちは");
}

async function greeting() {
  console.log("おはようございます");
  const result = await hello();  　　　　　　　//hello()のPromiseの結果を待つ→resultへ格納する
  console.log(result);　　　　　　　　　　　　　　　　　　　　　
  console.log("こんばんは");
}

greeting();

// おはようございます
// こんにちは
// こんばんは
```

## 課題10

先程の課題にtry..catch..finallyを追加する。

### try...catch...finally

```
try {
  console.log("tryが実行");
  throw new Error();
  console.log("これは実行されない");
} catch (err) {
  console.error(err + "エラーが発生しています");
} finally {
console.log("finallyが実行");
}

// tryが実行
// Errorエラーが発生しています
//finallyが実行
```

まずtryブロックが実行され、エラー(例外)がなければcatchは無視される。  
tryの中でエラー(例外)が発生した場合はtryの実行が停止し、catchへ処理が移る。  
finallyはエラーが起きても起きなくても実行される。

### async/await　と　try/catch

以下のコードは、今回の課題を簡略化したものを例にしました

```
const fruitData = [ "apple", "banana", "orange"];

// 3秒後にresolveが実行され、fruitData が渡る
function getData() {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(fruitData);
    }, 3000);
  });
}

async function fetchData() {
  try {
// getDataがPromiseの結果を返すまで待機し、返ったらresultに格納
　　　　const result = await getData();
    console.log(result);　　　　// fruitDataが出力
  } catch (e) {
    console.log(e + "エラーが発生しました！")
  } finally {
    console.log("finally実行");
  }
}

fetchData();

//  ['apple', 'banana', 'orange']
//   finally実行
```

try内で実行したい関数にawaitをつけ、Promiseの結果が返されるまで待機  
3秒後にresolveが実行し、fruitDataを格納したPromiseを返し、  
それを変数resultに格納し、コンソールへ出力。

### エラーを投げた場合を考える

##### try内でエラーを投げてみる

結果は無事にエラーをキャッチしました

```
//省略
async function fetchData() {
  try {
    throw new Error("Error");
  } catch (e) {
    console.log(e + "エラーが発生しました！")
  } finally {
    console.log("finally実行");
  }
}

fetchData();

　//Error: Errorエラーが発生しました！
// finally実行
```

##### Promise内でエラーを投げてみた

結界はPromise内で投げたエラーをキャッチしませんでした

```
// 省略
function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      throw new Error("Error");
    }, 3000);
  });
}

async function fetchData() {
  try {
    const result = await getData();
    console.log(result)
  } catch (e) {
    console.log(e + "エラーが発生しました！")
  } finally {
    console.log("finally実行");
  }
}

fetchData();

//undefinedエラーが発生しました！
//finally実行
// Uncaught Error: Error
```

この様な結果になった理由を考えました。

まずPromise内でエラーが投げられた場合の状態を確認しました。

![](/images/スクリーンショット-2021-09-17-23.32.24.png)

結果を返していない状態なので  
catchへ処理が移行し「undefinedエラーが発生しました！」が出力、その後finallyが実行した。

![わたし<br>](/images/animal_mark06_uma-150x150.png)

わたし

Errorが投げられたら自然とrejectedな状態になるんじゃないの???

ちなみにsetTimeoutがない場合はcatchできた

```
//省略
function getData() {
  return new Promise((resolve, reject) => {
    throw new Error("エラーが発生！");
  });
}

async function fetchData() {
  try {
    const result = await getData();
    console.log(result)
  } catch (e) {
    console.log(e + "エラーが発生しました！")
  } finally {
    console.log("finally実行");
  }
}

fetchData();
```

ここの挙動がいまいちよくわからず、苦しみました...

try...catchは同期的な例外をcatchするためsetTimeout内で発生した例外は、  
非同期のためcatchできない、ということではないかと考えました。

### 課題で苦戦した点

そもそもなぜtry...catchを書くのかがわからず苦戦しました。  
Promiseを返すのだから、thenとcatchじゃだめなのか?

#### なぜtry...catch(エラーハンドリング)が必要なのか

エラー（例外）が起きた時にユーザーに何らかの形で知らせる処理をしなければ  
devツールを開かない限り、ユーザーは知ることができない。  
何が起きたがわからないが、意図した挙動にならない....という状態を作らないため。

#### then catch / try catch

Async/awaitはPromiseのシンタックスシュガーであり、  
同期的にコードを記述できるところが利点である。

そのため、try...catchを使用する方が  
同期的に記述ができて、ネストも深くなりにくいのでコードがわかりやすい

#### try catch best practice

今回のレビューで頂いた点でもありますが  
tryに処理を詰め込みすぎないことは重要だと学びました。  
どこでエラー(例外)が起きたかをわかりずらくするからです。

また以下の記事も参考になりました。

> トライ・キャッチは、エラーが発生する可能性がある場合に実装されるべきです。例えば、外部サービスが利用できない場合、ログイン認証が無効な場合、ユーザーの入力が無効な場合などです。可能な限り、特定のエラーをキャッチするように努めるべきです。
>
> https://www.codemag.com/article/1807021/JavaScript-Corner-Try-Catch

エラーにはプログラマーのミス(変数の未定義や、引数の渡し忘れなど)とユーザーのミスがあり  
プログラマーのミスに関しては修正を行わなけらばならないし、  
それ以外の制御できないミスに関しては、コードでチェックさせ適切に処理する必要がある。

https://www.codemag.com/article/1807021/JavaScript-Corner-Try-Catch

今回レビューをしてくださった  
[ちひろさん](https://twitter.com/chihiro7029) [にゃっつさん](https://twitter.com/nyattsu72) ありがとうございました。

## 参考にした記事

https://ja.javascript.info/try-catch

https://web.archive.org/web/20171227042008/https://qiita.com/gaogao\_9/items/40babdf63c73a491acbb

https://itnext.io/error-handling-with-async-await-in-js-26c3f20bc06a

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
