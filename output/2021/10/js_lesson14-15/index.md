---
title: '【もりけん塾 @JS課題14-15】form要素の値の取得、バリデーション、分割代入'
date: '2021-10-24'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'js_lesson'
  - 'morikenjuku'
  - '学習記録'
coverImage: 'WebブラウザにWebサイトが表示までの旅へ-2-1.jpg'
---

現在、もりけん塾で  
[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/sae-github/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます。  
今回は課題14-15の実装で学んだことをブログへまとめます

## 課題15

①ボタンをクリックしたらモーダルが表示  
②モーダル内のに*input\[type="number"\]*、 _input\[type="text"\]_ 、_input\[type="submit\]_ を設置  
（未入力の場合はアラートが発生）  
③*input\[type="submit\]*をクリックするとリクエストがはしる  
④入力された値はコンソールへ出力  
⑤fetchを使用しJSONデータを取得する  
(データ取得の間はくるくるさせる)  
⑥取得したデータを加工し、ブラウザに表示

今回実装したコード

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="oNezaYO" data-user="Sae_codepen" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span>See the Pen <a href="https://codepen.io/Sae_codepen/pen/oNezaYO">Untitled</a> by Sae (<a href="https://codepen.io/Sae_codepen">@Sae_codepen</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## form要素の値の取得

モーダル内のinput\[type="number"\]とinput\[type="text"\]に入力された値を取得します

```
 <input type="text" name="name" id="name">
 <input type="number" name="number" id="number">
```

IDで要素を取得し、.valueとすることで値の取得ができました

```
  const inputName = document.getElementById("name").value;
  const inputNumber = document.getElementById("number").value;
```

## **バリデーション**

> **バリデーション**とは、入力されたデータが、あるいは[プログラミング言語](https://www.sophia-it.com/content/%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E8%A8%80%E8%AA%9E)やマークアップ言語の記述が、規定された文法に即して、または[要求](https://www.sophia-it.com/content/%E8%A6%81%E6%B1%82)された仕様にそって、適切に記述されているかどうかを検証することである。
>
> https://www.sophia-it.com/content/%E3%83%90%E3%83%AA%E3%83%87%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3

今回は、入力がなかった(空の)場合はリクエストができず  
アラートが出る様なバリテーションをJavaScriptで実装しました

まず 最初のPRで実装したコードです↓

```
  const inputName = document.getElementById("name").value;
  const inputNumber = document.getElementById("number").value;

  if (inputName === "" || inputNumber === "") {
    alert("Name or number not entered. Please confirm.");
  } else {
    console.log(`Name: ${inputName}, Number: ${inputNumber}`);
  }
```

レビューで この実装だと inputNameに空白文字が入った場合に  
バリデーションが通ってしまう点を教えて頂きました

### 試したこと①

空白文字が入れられた際の値を調査しました  
typeofはString、Booleanはtrue、nullでもない...  
lengthは1でした(もちろん空白文字が増えればその分増えました)

つまり\[type="text"\]は 空白文字も 1文字としてカウントしてしまう...  
(確かに お問い合わせフォームで名前を入力する時 苗字と名前の間にスペース空けたりするよな...)

### 試したこと②

調査したことを踏まえて、実装しなおしました

```
const replaceInputName = inputName.replace(/\s+/g, '');

  if (replaceInputName.length === 0 || inputNumber === "") {
    alert("Name or number not entered properly.Please confirm.");
  } else {
    console.log(`Name: ${replaceInputName}, Number: ${inputNumber}`);
  }
```

replaceと正規表現を使用し、空白文字を取り除きました(厳密に言うと置き換えた)

ですが今の状態だと、苗字と名前の間の空白なども含めて 全ての空白文字が 取り除かれてしまいます...  
もりけん先生に レビューでtrimメソッドの存在を教えて頂きました

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global\_Objects/String/Trim

### 試したこと③

教えて頂いたメソッドを使って再度実装しました

```
　const trimInputName = inputName.trim();

  if (trimInputName.length === 0 || inputNumber === "") {
    alert("Name or number not entered properly.Please confirm.");
  } else {
    console.log(`Name: ${trimInputName}, Number: ${inputNumber}`);
  }
});
```

trim()で両端の空白を取り除き(トリミングして)、変数へ格納し条件式をかきました

変数名について

trim()で空白を取り除いた値を、変数*trimInputName* へ格納しましたが、  
もりけん先生から _trimmedInputName_ がいいのでは..とレビュー頂きました  
trim()した後の値を格納するので、過去形にする方が適切だと感じました！

## 制約検証

前項の通り、今回はJavaScriptでバリデーションを実装しましたが、  
HTMLの制約検証を使用する方法も考えてみました

https://developer.mozilla.org/ja/docs/Web/Guide/HTML/Constraint\_validation

https://codesource.io/validating-html-forms-using-javascript-and-constraint-validation-api/

HTMLの属性で制約をすることができ、_type_ 、_required_ 、_**pattern**_ を使用しました

```
<input type="text" name="name" id="name" pattern=".*\S+.*" required>
<input type="number" name="number" id="number" required>
```

### type

type属性を指定することで、指定したタイプに合わせて制御をしてくれる  
今回のnumberであれば 数値しか入力できない様に 制御してくれる

### required

入力を必須にしたいので使用しました

### pattern

**_.\*\\S+.\*_** は正規表現で 空白文字のみの入力を弾く様にしました  
( 文字の中の空白は弾かれない )

```
requestBtn.addEventListener("click", (e) => {
  const inputName = document.getElementById("name");
  const inputNumber = document.getElementById("number");

  const returnName = inputName.validity.valid;
  const returnNumber = inputNumber.validity.valid;

  if ( returnName &&　returnNumber) {
    e.preventDefault();
    console.log(`Name: ${inputName.value}, Number: ${inputNumber.value}`);
  }　
});
```

### validity / valid

validityプロパティはValidityStateオブジェクトを返し、  
ValidityStateオブジェクト内には制約に対する検証結果をBooleanで格納しています

![](/images/スクリーンショット-2021-10-24-18.47.00.png)

この中のvalidプロパティを使用しました  
vaildプロパティは全ての制約検証をクリアした場合はtureが、  
いずれかでも クリアしなかった場合はfalseが返ります

## 分割代入

今回、オブジェクトの分割代入を用いて一部実装しました

### 分割代入 ~ オブジェクト ~

以下の例を使用して、色々パターンの分割代入を試してみました

```
const member = {
  name: "山田",
  number: 1
}
```

オブジェクトのプロパティ(キー)から変数に割り当てることができます

```
const { name, number } = member;         // 右辺に取り出したいオブジェクトを指定する
console.log(name　, number);　　// output 山田  1
```

#### 任意の変数名をつける

```
const { name: a, number: b } = member;　　　　　　　　　// プロパティ：任意の変数名
console.log(a, b);                         //output  山田  1
```

この場合、変数nameやnumberへアクセスするとReferenceErrorエラーになります

#### 変数宣言を省略する

( . . . )を使用する

```
({name, number} = {name: "山田", number: 1});
```

#### デフォルト値と新しい変数の追加

```
const { name, number, age = 29 } = member;　　　
console.log(name,number,age);　                      // 山田 1 29
```

memberオブジェクトに追加されるわけではない

#### プロパティ名を動的にする

```
function getMemberData(key) {
  const { [key]: value } = member;
  console.log(value);
}

getMemberData("name");
getMemberData("number");
```

今回の課題で 使用した様なオブジェクトがあった場合を 考えてみました

```
const responseData = {
  data: [
    {
      a: "bookmark",
      img: "img/1.png",
      alt: "画像１",
      text: "ブックマーク"
    },
    {
      a: "message",
      img: "img/2.png",
      alt: "画像２",
      text: "メッセージ"
    }
  ]
}
```

#### ネストされたプロパティを割り当てる

```
const { data: [{ a, img, alt, text }] } = responseData;
console.log(a, img, text, alt);
```

#### 関数の引数

以下の様に、関数の実引数にオブジェクトを渡し 仮引数で分解して受け取ることができました

```
function createList({ data }) {
  const frag = document.createDocumentFragment();
  for (const { a, img, alt, text } of data) {
    const li = document.createElement("li");
    const anchor = document.createElement("a");
    const image = document.createElement("img");

    anchor.href = `/${a}.html`;
    image.src = img;
    image.alt = alt;

    frag.appendChild(li).appendChild(anchor).appendChild(image);
    anchor.insertAdjacentHTML("beforeend", text);
  };
  ul.appendChild(frag);
}

createList(responseData);
```

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring\_assignment

https://blog.greenroots.info/a-practical-guide-to-object-destructuring-in-javascript

## まとめ

課題14 -15を通して、form要素の値の取得について学びました。  
バリデーションも まだまだ学習不足なので 引き続き学習していきたいと思います。

また、今回の課題を行う前に 何度か他の塾生さんの課題を レビューさせて頂きました。  
学んだ点を自分で調べ 自分のコードに落とし込むことができ、より課題に向き合えたと感じました。  
引き続き、課題もレビューも頑張りたいです

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
