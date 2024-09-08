---
title: "【もりけん塾】Jestハンズオン勉強会"
date: "2021-08-11"
categories: 
  - "javascript"
tags: 
  - "javascript"
  - "morikenjuku"
  - "勉強会"
  - "学習記録"
coverImage: "印刷しやすい-シンプルなフォルダー-ラベル-3.png"
---

今回の内容はJestについての学習記録です。

7月末にもりけん塾で「Jestハンズオン勉強会」が行われました！  
もりけん先生ありがとうございました！

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">【ゆる募】<a href="https://twitter.com/hashtag/%E3%82%82%E3%82%8A%E3%81%91%E3%82%93%E5%A1%BE?src=hash&amp;ref_src=twsrc%5Etfw">#もりけん塾</a> フロントエンドエンジニア勉強会<br>突然ですが今日の夜にやります。内容は変わる可能性があるのでガチャです。勉強会ガチャ<br><br>どなたでもエントリー可能です。詳しくは画像をお読みください<br><br>※DiscordアプリとcodeSandbox、nodeが使える環境は必須です<br>※当選の方のみ連絡します <a href="https://t.co/vpIXXFrERx">pic.twitter.com/vpIXXFrERx</a></p>— フロントエンドエンジニア (@terrace_tech) <a href="https://twitter.com/terrace_tech/status/1421278407669678080?ref_src=twsrc%5Etfw">July 31, 2021</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Jest

https://jestjs.io/ja/

## 導入

公式ドキュメントを見ながら導入を行ってみました。

#### \- Node.jsが入っているか確認

node -vでバージョンがでてくることを確認。

#### \- npm install --save-dev jestでJestをインストール

package.jsonファイルがディレクトリにないです、と言ってる...?  
no such file or directory, open '〜'

![](/images/スクリーンショット-2021-08-06-21.35.23-1024x387.png)

### \- npm init -yでプロジェクトフォルダーを作成する

package.jsonが生成されました。

![](/images/スクリーンショット-2021-08-06-21.28.57-1024x446.png)

### \- もう一度npm install --save-dev jestでJestをインストール

無事、node\_modulesが生成されました。

### \- package.jsonに以下を追加する

```
  "scripts": {
    "test": "jest"
  },
```

### \- sum.js / sum.test.jsを作成

公式ドキュメントの例文と同じ様に書きました。

- sum.js

```
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

- sum.test.js

```
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

### \- テストを実行する

npm testで実行。  
ターミナルには以下の様にでました↓

```
 PASS  ./sum.test.js　　
  ✓ adds 1 + 2 to equal 3 (1 ms)　

Test Suites: 1 passed, 1 total　　
Tests:       1 passed, 1 total　　
Snapshots:   0 total
Time:        0.193 s
Ran all test suites.
```

無事に導入ができました！

## テストの書き方

```
test('  テストの説明 ', () => {
   expect( // 評価したい値  ).toBe();
);
```

このtoBeの部分がmatcherメソッドといい、値をテストする方法です

関連するいくつかのテストをdescribeメソッドを使用してまとめることもできます

```
describe('　　　', () => {
 it('テストの説明', () => {
   // /テスト
 })
 it('テストの説明', () => {
  // テスト
 })
 it('テストの説明', () => {
   // テスト
 })
})
```

## 苦戦した点

\-　matcherの使い方

matcherそれぞれに特徴があるので  
まずはそれらを調べ、実際にテストを行い違いを理解できる様にしました。

#### toBe

文字列と数値の比較を行いました。

```

test('toBe Test1' , () => {　　　　　　　　　　　 //PASS
  expect('apple').toBe('apple');
});

test('toBe Test2' , () => {　　　　　　　　　　　 //PASS
  expect(1).toBe(1);
});
```

toBeは厳密な等価性をチェックするmatcherなので以下のテストはエラーが出ました

```
test('toBe Test3' , () => {　　　　　　//FAIL
  expect("1").toBe(1);
});

test('toBe　Test4' , () => {        //FAIL
  expect({}).toBe({});　
});
```

#### toEqual

toEqualも等価性をチェックします

```
test('toEqual Test1' , () => {　　　　　　　　　　　　　//PASS
  expect('apple').toEqual('apple');
});

test('toEqual Test2' , () => {　　　　　　　　　　　　//PASS　　
  expect(1).toEqual(1);
});
```

toBeとの違いは、オブジェクトや配列もチェックできる点です。

```

//case1
test('toEqual' , () => {   //PASS
  expect({}).toEqual({});
});

//case2
test('toEqual Test' , () => {
  expect(['apple']).toEqual(['apple']);　　//PASS
});

//case3
const obj1 = { food: 'apple'};
const obj2 = { food: 'apple'};

test('toBe Test' , () => {                 //FAIL
  expect(obj1).toBe(obj2);
});

test('toEqual Test' , () => {            //PASS
  expect(obj1).toEqual(obj2);
});
```

https://stackoverflow.com/questions/45195025/what-is-the-difference-between-tobe-and-toequal-in-jest

#### toContain / toContainEqual

以下の様な関数でテストをしてみます  
課題3と同じくfilterを使用し、5以下の数字を配列で返します。

```
const items = [1,2,3,4,5,6,7,8,9];
function filterNumber(arr) {
  return arr.filter((e) => e < 5 );
}
```

```
const items = [1,2,3,4,5,6,7,8,9];

test ('toContain Ver', () => {　　　　　　　　　　　　　　　　　　　　　　　　//PASS
  expect(filterNumber(items)).toContain(1);
});

test ('toContainEqual Ver', () => {　　　　　　　　　　　　　　　//PASS
  expect(filterNumber(items)).toContainEqual(1);
});
```

どちらもテストが通りました。  
どちらも配列内に含まれるアイテムがあるかをテストしてくれました。

違いはなんなのか...以下の内容でテストを行います。

```
test('toContain Ver', () =>　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　//FAIL
  expect([{ fruit: 'apple' }, { food: 'curry'}]).toContain({ fruit: 'apple' })
)
test('toContainEqual Ver', () =>　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　//PASS
  expect([{ fruit: 'apple' }, { food: 'curry'}]).toContainEqual({ fruit: 'apple' })
)
```

toContainの方はエラーが起こり、toContainEqualの方は無事テストできました。  
toContainEqualは配列内に含まれるオブジェクトもテストができるという違いがあることを学びました。

> 特定の構造と値を持つ要素が配列に含まれていることをチェックしたい場合は`.toContainEqual`を使用して下さい。 
> 
> https://jestjs.io/ja/docs/expect#tocontainequalitem

#### toThrow

例外が発生したかをチェックします。toThrowの引数にエラーを指定することもできます。

## テストケースの書き方

課題のレビューをいただいた際、  
テストケースの書き方についてアドバイスを頂きました。

```
//修正前
test('filterOrange equal orange', () => {
  expect(filterOrange(fruit)).toContain('orange');
});
```

どのようなテストなのかが全然わからないです...適当さが出ている...  

もりけん先生からは、  
何をして、何をするのかを書いた方がいいと、アドバイスを頂きました。

```
//修正後
test('If array containing orange is passed, array containing orange return', () => {
  expect(filterOrange(fruit)).toContain('orange');
});
```

アドバイスをもとに修正を行いました。  
どのようなテストなのかがわかる様になりました！

誰がみてもどんなテストなのかがわかる様な書き方を心がけます。

## まとめ

テストを適切に行う為にも、**関数には複数の仕事をさせずに1つの仕事だけさせる**ことが大切だと今回学びました。実際にテストを書いてみて、その意味を理解することができました。  
今後も色々なパターンのテストを書いて、より理解を深めていきたいです。

![](/images/217_4-1.png)

現在、もりけん塾でJavaScriptを中心に学習をしています！

もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
