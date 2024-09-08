---
title: '【もりけん塾】JS課題11 fetchを使用し、JSONデータを取得する'
date: '2021-09-28'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'morikenjuku'
  - '学習記録'
coverImage: 'WebブラウザにWebサイトが表示までの旅へ-1-1.png'
---

現在、もりけん塾で  
[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/sae-github/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます。  
今回は課題11の実装で学んだことをブログへまとめます。

## 課題11

fetchを使ってJSONデータを取得し前回までの課題と同様に加工し、ブラウザに表示させる。

```
{ "data": [
  {
    "a": "bookmark",
    "img": "img/1.png",
    "alt": "画像１",
    "text": "ブックマーク"
  },
  {
    "a": "message",
    "img": "img/2.png",
    "alt": "画像２",
    "text": "メッセージ"
  }
]}
```

以下のサイトでWebAPIを作成しました

https://myjson.dit.upm.es/

## JSON

サーバーとクライアントでデータのやり取りをする際に使用されるデータ形式。  
テキストベースのため軽量である。  
言語に依存しないため、JavaScript以外のプログラミング言語でも使用可能。

## fetch

`fetch(URL)`とすることでHTTPリクエストが作成され、サーバーとの通信が開始します

```
console.log(fetch("https://jsondata.okiba.me/v1/json/Ryhnk210927214434"));
```

結果をコンソールで確認すると、  
fetchはPromiseを返し、`Response`オブジェクトがラップされていることがわかりました

_Promise {<pending>}_  
_\[\[Prototype\]\]_: Promise  
_\[\[PromiseState\]\]_: "fulfilled"  
_\[\[PromiseResult\]\]_: Response  
body: (...)  
bodyUsed: false  
headers: Headers {}  
ok: true  
redirected: false  
status: 200 　　  
statusText: ""  
type: "cors"  
url: "https://jsondata.okiba.me/v1/json/Ryhnk210927214434"  
_\[\[Prototype\]\]_: Response

Responseオブジェクトにはリクエストに対するレスポンスが格納されています。

### jsonメソッド

`json`メソッドを使用し、JSONデータを取得します。

> インターフェイス の**`json()`**メソッドは[`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request)リクエストの本文を読み取り、本文のテキストを[`JSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)。として解析した結果で解決されるPromiseとして返します。
>
> メソッドに名前が付けられているにもかかわらず、`json()`結果はJSONではなく、JSONを入力として受け取り、それを解析してJavaScriptオブジェクトを生成した結果であることに注意してください。
>
> https://developer.mozilla.org/en-US/docs/Web/API/Request/json

```
async function getData() {
  const data = await fetch("https://jsondata.okiba.me/v1/json/Ryhnk210927214434");
  const json = await data.json();
  console.log(json);
}

getData();
```

{data: _Array_(2)}  
data: _Array_(2)  
0: {a: 'bookmark', img: 'img/1.png', alt: '画像１', text: 'ブックマーク'}  
1: {a: 'message', img: 'img/2.png', alt: '画像２', text: 'メッセージ'}  
length: 2  
\[\[Prototype\]\]: _Array_(0)  
\[\[Prototype\]\]: _Object_

## fetchのエラー処理

> promise は `fetch` が HTTP リクエストを作るすることができなかった場合、例えば ネットワークの問題やそのようなサイトがない場合に reject します。404 や 500 のような HTTP エラーも通常のフローとみなされます。
>
> https://ja.javascript.info/fetch

`try...catch`と`if文`を使用し、ステータスコードが2xx(リクエストの成功を意味する)以外の場合は  
例外を投げる処理を書きました

`Response.ok` プロパティは、リクエストに対する応答が成功したか否かをtrueかfalseで返します

```
async function getData() {
  try {
    const data = await fetch("https://jsondata.okiba.me/v1/json/Ryhnk210927214434");
    if (data.ok) {　　　　　　　　　// 2xxの場合はtrueとなる
      console.log("ステータス番号は2xxです");
    } else {
      throw new Error("エラー発生");　　
    }
  } catch (e) {
    console.log(e);　　　
  };
}

getData()
```

## 苦戦した点・考えたこと

今回の課題で実装したいことは以下の内容です

・HTTP通信が成功場合、jsonメソッドを使用しJSONデータを読み込む  
失敗した場合は例外を投げ、ブラウザに「サーバーエラーです」と表示させる

・サーバーから受け取ったデータが  
意図したものでなければブラウザに「適切なデータがありませんでした」と表示する  
意図したものであれば、加工し、ブラウザに表示させる

<<以下の内容は,課題の内容を一部省略、簡略化したものを例にしています>>

### 苦戦：エラーが発生してしまう

```
async function getData() {
  try {
    const response = await fetch("url");　 // ❷HTTP通信を行いResponseを変数へ格納
    if (!response.ok) {　　　　　　　　　　　　　　　　　　　　　　　　　// ❸true(サーバーエラー発生)の場合、例外が投げられる　
      throw new Error("サーバーエラー");　　
    } else {　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
      const json = await response.json();　　
      return json;
    }
  } catch (e) {　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　// ❹ ❸の例外をキャッチしコンソールとブラウザに表示
    console.error(e);
    ul.textContent = "サーバーエラー";
  }
}

async function createLists() {
  const responseData = await getData();  // ❶ getDataの結果を待ってから実行する
  if (responseData.data) {　　　　　　　　　　// responseData.dataが未定義だとエラーがでる
    console.log(responseData.data);
  } else {
    ul.textContent = "適切なデータがありません";
  }
}

createLists();
```

サーバーエラーによって、例外が投げられた際に  
`createLists`でエラーが発生してしまう点をレビューでご指摘頂きました。

エラーの内容

**TypeError: Cannot read properties of undefined (reading 'data')　at createLists**  
訳：TypeErrorが発生しました。未定義のプロパティを読み取ることができません

### 考えたこと

`await getData();`で`getData`の結果を待っていますが、  
この結果が`resolve`だった場合の処理を追加すれば良いのでは？と考えました。

```
// catchを追加した
const responseData = await getData().catch((e) => { console.log(e)});
```

結果は....ダメでした。全く同じエラーが出ます。

一旦、console.logで確認します

```
const responseData = await getData();
console.log(getData());　　　　　　　　　　　　// fulfilledのPromise(結果はundefined)
console.log(responseData);　　　　 // undefined
```

fulfilledの為catchできなかった....

![わたし](/images/animal_mark06_uma-150x150.png)

わたし

なぜgetDataで例外が発生したのに、rejectではなく、fulfilledなんだ

エラーが発生した場合は何もreturnしていないから....？  
try...catchしているから？

(ここの挙動が説明できないです。。なんとか感覚でわかる程度です...)

再度try...catchの範囲を見直し、  
エラーが起きない様に修正することができました↓

```
async function getData() {
  const response = await fetch("URL");　　// 　HTTP通信開始、Responseを変数へ格納
  if (!response.ok) {　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　// 　通信が成功しなかったら例外を投げる
    throw new Error(response.statusText);　　
  } else {
    const json = await response.json();
    return json;
  }
}

async function tryCreate() {　　
  try {
    const responseData = await getData();　　// getDataの結果を待つ.返ったら変数へ
    if (responseData.data) {　　　　　　　　　　　　　　　　　　　　　　　　　　
      console.log(responseData.data);　　　　　　　　　　// dataがあればコンソールへ表示
    } else {
      div.textContent = "適切なデータが見つかりませんでした";　　　
    }
  } catch (e) {                       //getDataの結果がrejectだった場合はcatchに処理が移行
    div.textContent = "サーバーエラーが発生しました";
    console.error(e);
  }
}
```

## まとめ

エラーハンドリング、非同期処理はまだまだ奥が深いなぁと感じました。  
ちょっと実践的になるだけで、わからなくなって焦ります....

今回の課題のコードは↓

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="wveRWRr" data-user="Sae_codepen" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span>See the Pen <a href="https://codepen.io/Sae_codepen/pen/wveRWRr"></a>by Sae (<a href="https://codepen.io/Sae_codepen">@Sae_codepen</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

レビューはもりた先生にして頂きました。ありがとうございました。

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
