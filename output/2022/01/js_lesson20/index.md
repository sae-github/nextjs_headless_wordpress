---
title: '【もりけん塾 @JS課題20】JSONデータからtableを作成する'
date: '2022-01-20'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'js_lesson'
  - 'プログラミング'
  - 'morikenjuku'
  - '学習記録'
coverImage: 'Twitter-post-6.jpg'
---

現在、もりけん塾で  
[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/sae-github/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます。  
今回は課題20の実装で学んだことをブログへまとめます

## 課題20

### 課題の仕様

テーブルを画面遷移してから3秒後に解決されるPromiseが返すオブジェクトを元に作ってください。  
カラム名など(id, 名前等)もdataで表現して受け取り、フロント側で加工して表示すること

### 制作物

[![Image from Gyazo](/images/b1fd7e1505405a9e0a900f7c3b9829db.gif)](https://gyazo.com/b1fd7e1505405a9e0a900f7c3b9829db)

https://codesandbox.io/s/lesson20-85z27

この課題では、[My json](https://myjson.dit.upm.es/)で簡易的なAPIを作成し 使用しています  
tableの元になるデータは、 fetchメソッドで 非同期通信を行い取得したJSONデータを使用します  
今回の記事では、JSONデータを受け取り tableを表現するまでを復習しました  
※ 非同期処理やエラーハンドリングについての復習は省いています

## JSONデータ

jsonデータは下記の様にしました

```
[
  {
    "id": "d28b9920-2d3a-487c-bcbc-5b5461aee5e6",
    "userId": 4,
    "name": "やまだ",
    "gender": "男",
    "age": 32
  },
  {
    "id": "d28b9920-2d3a-487c-bcbc-5b5461aee5e7",
    "userId": 2,
    "name": "さとう",
    "gender": "女",
    "age": 18
  },
  {
    "id": "d28b9920-2d3a-487c-bcbc-5b5461aee5e8",
    "userId": 5,
    "name": "たなか",
    "gender": "男",
    "age": 25
  },
  {
    "id": "d28b9920-2d3a-487c-bcbc-5b5461aee5e9",
    "userId": 3,
    "name": "あんどう",
    "gender": "女",
    "age": 32
  },
  {
    "id": "d28b9920-2d3a-487c-bcbc-5b5461aee5e0",
    "userId": 1,
    "name": "えのもと",
    "gender": "女",
    "age": 36
  }
]
```

## tableの作成

tableの項目はオブジェクト(tableItems)で管理しています  
キーはJSONデータ内のキーと一致し 値はtableの項目名としました  
また、引数で受け取っているusersDataへは サーバーから返った値を想定した(上記の) JSONが渡ってきます  
サーバーから返ったデータ(usersData)と、定義したtable項目(tableItems)を元にtableを作成していきます

```
const createTable = usersData => {
  const tableItems = {
    "userId": "ID",
    "name": "名前",
    "gender": "性別",
    "age": "年齢"
  }
  const table = document.createElement("table");
  const columnKeys = Object.keys(tableItems);
  const tableHead = createTableHead(tableItems);
  const tableBody = createTableBody(usersData, columnKeys);
  table.appendChild(tableHead).after(tableBody);
  return table;
}
﻿
```

### table headを作成する

引数のitemsへはcreateTable()内で定義した table項目のオブジェクト(tableItems)です

itemsの数だけloopをし、<th>を作成 テキストはitemsの値を入れ <thead>へ追加します  
最終的にこの関数は 作成した <thead>を返します

```
const createTableHead = items => {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  Object.values(items).forEach(item => {
    const th = document.createElement("th");
    th.textContent = item;
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  return thead;
}
```

### table bodyを作成する

引数のusersDataはサーバーから返ったデータ(今回は上記のJOSNデータ)が渡ってきます

![](/images/スクリーンショット-2022-01-21-15.00.01.png)

keysにはcreateTable()で定義したtable項目のオブジェクトのkeyを格納した配列です

![](/images/スクリーンショット-2022-01-21-15.01.13-1.png)

usersDataをloopし <tbody>へ<tr>を作成・追加します

```
const createTableBody = (usersData, keys) => {
  const tbody = document.createElement("tbody");
  usersData.forEach((userData) => {
    const tr = createElementWithClassName("tr", "js-tr-inTbody");
    tbody.appendChild(tr).appendChild(createTd(userData, keys));
  });
  return tbody;
};
```

さらに、<tr>内に<td>を作成・追加します

<td>の作成はcreateTd(userData, keys)を実行します

#### tdを作成する

引数のusersDataにはcreateTableBody()内でloopされ取り出された userデータが渡ってきます

![](/images/スクリーンショット-2022-01-21-17.01.06.png)

keysにはcreateTable()で定義したtable項目のオブジェクトのkeyを格納した配列が渡ります

keysの数だけloopし、userデータから値を取り出し<td>を作成します

```
const createTd = (usersData, keys) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < keys.length; i++) {
    const td = document.createElement("td");
    td.textContent = usersData[keys[i]];
    fragment.appendChild(td);
  }
  return fragment;
}
```

keysを元に値を取り出すことで、対象のkeyに対する値が空の場合や、  
データが想定の順番でない場合にも 問題なくtableを作成できると思い この様な仕様にしました  
(例えば以下の様なJSON)

```
[
  {
    "id": "d28b9920-2d3a-487c-bcbc-5b5461aee5e9",
    "userId": 3,
    "name": ""
  },
  {
    "gender": "女",
    "userId": 1,
    "name": "",
    "id": "d28b9920-2d3a-487c-bcbc-5b5461aee5e0",
    "age": 36
  }
]
﻿
```

(この様な場合があるかはわかりませんが...)

## まとめ

今回の課題では、サーバーからの返答を想定した JSONデータを作成しましたが、  
データは クライアント側に依存しすぎてはいけないことを 教えて頂きました  
(思い通りになると思うなよ!!と肝に銘じた...)  
実際のイメージがあまりつかなかったので、アンチパターンを教えて頂けてありがたい...  
次の課題では、今回作成したtableにsort機能を追加します！

今回の課題でレビューをくれた皆様ありがとうございました  
thanks to [もなかさん](https://twitter.com/ruby443n) 、[にゃっつさん](https://twitter.com/nyattsu72)　、 [rikoさん](https://twitter.com/rikolog001)

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
