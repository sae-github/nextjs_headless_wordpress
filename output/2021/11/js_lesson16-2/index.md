---
title: '【もりけん塾 @JS課題16】 WebAPIを使用した 動的なタブUIを作る part2'
date: '2021-11-22'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'js_lesson'
  - 'プログラミング'
  - 'morikenjuku'
  - '学習記録'
coverImage: 'WebブラウザにWebサイトが表示までの旅へ-3-1.jpg'
---

現在、もりけん塾で  
[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/sae-github/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます。  
今回は課題16の実装で学んだことをブログへまとめます

## 課題16

[yahooのトップページ](https://www.yahoo.co.jp/)にある様なタブUIを作成しました

前回のPRでは JSONデータを作成、fetchで取得、タブ・コンテンツを作成し DOMへ追加 を行いました。  
今回はそこにいくつかの機能の追加を行いました。

前回のまとめ記事

https://itosae.com/js\_lesson16/

以下、今回のPRで含んでいる仕様です

☑︎ 記事にはそれぞれコメントがあり、0件なら表示しない、1以上ならアイコンと共に数字が表示される  
☑︎ 記事にはnewという新着かどうかのラベルがつく(どこの記事にそれが入るかは適当でいいです)  
▶︎ ライブラリ(_[date-fns](https://date-fns.org/)_)を使用し、3日以内の記事かどうか判別する

また課題の仕様とは別に、さらに機能の追加を行いました

☑︎ コメントアイコンをクリックしたら、モーダルウィンドウが出現しコメント情報を表示する

※データはサーバーから取得しているものと想定していますが、今回はJSONファイルを作成し、直接データを取得しています

### 制作物

![](/images/f1ebe865458489136add21878b5b1aa6.gif)

### codesandbox

https://codesandbox.io/s/js-lesson16-part3-d2m4e

## 3日以内かどうかを識別する

date-fnsを使用し、APIで取得したデータが 3日以内かどうかを割り出しました

まずは使用する関数をimportしました  
形式を指定できる関数*format* と、指定した日付間の日数を返す*differenceInCalendarDays* を使用しました

```
import { format, differenceInCalendarDays } from 'date-fns'
```

3日以内であればtrue、それ以外であればfalseを返す関数

```
function isSpecifiedPeriod(date) {　　　　　　
  const newArrivalDays = 3;　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
  const today = format(new Date(), 'yyyy,MM,dd');
  const articleDate = format(new Date(date), 'yyyy,MM,dd');　　
  const periodOfDays = differenceInCalendarDays(new Date(today), new  Date(articleDate)) ;
  const result = periodOfDays <= newArrivalDays;
  return result;
}
```

if文を使用し、isSpecifiedPeriodの戻り値がtrueであれば アイコンを表示させる

```
 if (isSpecifiedPeriod(article[i].date)) {　　　
      addNewIcon(metaWrapper);
    }
```

https://blog.bitsrc.io/date-fns-vs-momentjs-9833f7463751

## コメントアイコン＆コメント数

コメントがあれば、コメント数とアイコンを追加する条件式

```
const commentLength = article[i].comment.length;    //コメントの数を変数へ
if (hasComment(commentLength)) {　　
      addCommentLength(commentLength, metaWrapper);
    }
```

コメントの有無をBooleanで返す関数

```
function hasComment(commentLength) {
  return commentLength > 0;
}
```

コメント数・アイコンを追加する関数  
\* createElementWithClass("type","className")は要素を生成し、クラス名を付与する関数

```
 // コメント数と追加先の親要素を引数に
function addCommentLength(commentLength, parent) {

　 const commentWrapper = createElementWithClass("span", "comment-length");
  const commentIcon = createElementWithClass("img", "comment-icon");
  commentIcon.src = "./img/comment-icon.svg";

  commentWrapper.appendChild(commentIcon);
  commentWrapper.insertAdjacentHTML("beforeend", commentLength);
  //ここでクリックイベントをセット
  setClickEventInCommentIcon(commentWrapper);
  parent.appendChild(commentWrapper);
}
```

## モーダル表示

コメント数 又はアイコンがクリックされた 記事のデータを取得したい為、  
親要素である li に記事のid(APIに含まれている)をid属性の値として追加しました  
idは唯一の値なので、被ることがないと考えました

![](/images/スクリーンショット-2021-11-21-18.11.13.png)

クリックイベントを定義した関数  
 e.currentTarget.closest("li").id として、liのidを取得しました

```
function setClickEventInCommentIcon(target) {
  target.addEventListener("click", async (e) => {
// モーダルと背景を表示
   openModalAndOverLay();
// コメント内容を追加したい先
    const toAppendElement = document.getElementById("js-modal-inner");
    const targetParentId = e.currentTarget.closest("li").id;
// コメントデータ取得　　　　　　　　　　　　　　　　　　　　　　　
    const commentData = await getComment(targetParentId,toAppendElement);
// 取得したデータをもとにモーダル内のコンテンツ作成と追加
    createAndAddCommentContent(commentData, toAppendElement);
  });
}
```

```
// クリックされた記事のAPIを取得する関数
// 取得中はローディングさせたい為parentにはローディング先を渡す
async function getClickedArticleData(resource, parent) {
  return await tryGetData(parent, articleAPI[resource]);
}

// コメントのデータを取得する関数
async function getComment(targetId,parent) {
// クリックされた記事のデータを取得する
  const responseData = await getClickedArticleData(targetId,parent);
// 分割代入で取得
  const { comment } = responseData;
  return comment;
}
```

## ポイント

createElementで要素を作成し、DOMに追加することが多かったので  
引数でappend先を関数実行時に渡せる様にしました

```
function addLoading(parent) {
  const loading = createElementWithClass("img", "loading");
  loading.id = "js-loading";
  loading.src = "./img/loading-circle.gif";
  parent.appendChild(loading);
}

addLoading(element);
```

上記の様にすることで タブコンテンツのデータを取得中や、  
モーダル内のコンテンの取得中の際にもローディングを使用することができました

また、createElementで要素を作成し、class名を付与する処理は何度も出てきましたので関数化しました。  
ここは塾生の[yukaさん](https://twitter.com/mamuuu08)のコードを拝見した際に、学びました。(そして真似しました)

```
function createElementWithClass(type, name) {
  const element = document.createElement(type);
  element.className = name;
  return element;
}
```

## まとめ

レビューをして下さった、[もりけん先生](https://twitter.com/terrace_tech)・[もなかさん](https://twitter.com/ruby443n) いつもありがとうございます。  
関数をきちんと機能ごとに分けること...改めて勉強になりました。  
機能を追加していくにあたり、関数を分けていることで使い回すこともでき、大切さをより実感しました。

また、課題を飛び越えて  
機能追加までお付き合い頂きました。 先生、ありがとうございました。

はじめてバニラJSで こういった制作物と呼べるもの作れて 嬉しい。  
少し、自信もつきました。(すぐに打ち砕かれる自信なので　”少し”とつけました...笑)

次の課題も頑張ります！

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
