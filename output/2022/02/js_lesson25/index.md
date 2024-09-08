---
title: "【もりけん塾 @JS課題25】会員登録ページの作成 フォームのバリデーションを追加する"
date: "2022-02-07"
categories: 
  - "javascript"
tags: 
  - "javascript"
  - "js_lesson"
  - "プログラミング"
  - "morikenjuku"
  - "学習記録"
coverImage: "Twitter-post-9.jpg"
---

![管理人](/images/43D8A608-67A3-48E2-9600-EFFAEB7E218E_1_201_a-150x150.jpeg)

管理人

こんにちは、さえと申します👩‍💻  
フロントエンドエンジニアになるために 日々勉強をしています  
このブログは その勉強の記録と アウトプットのために運営をしています✨

  
現在、もりけん塾で  
[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/sae-github/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます。  
今回は課題25の実装で学んだことをブログへまとめます

## 課題25

前回の課題にバリデーションを追加する

https://itosae.com/js\_lesson24/

仕様

- 初回は送信ボタンとチェックボックスはdisabled状態。
- ユーザー名は16文字未満とし、  
    もしinvalidならバリデーションテキストは 「ユーザー名は15文字以下にしてください。」
- メールアドレスは一般的なメール形式のバリデーションにしてください。  
    もしinvalidならバリデーションテキストは「メールアドレスの形式になっていません。」
- パスワードのバリデーションは8文字以上の大小の英数字を交ぜたものとし、  
    もしinvalidならバリデーションテキストは「8文字以上の大小の英数字を交ぜたものにしてください。」
- 利用規約のスクロール実装に併せて、チェックボックスのdisabledは外し、checkedになる([前回実装部分](https://itosae.com/js_lesson24/))
- 全ての入力がvalidの場合にのみ送信ボタンのdisabledがfalseになり押下でき、`register-done.html`に遷移できる。

### 制作物

・valid時

[![Image from Gyazo](/images/2355e9821d03d96c07e811cc95e23fe3.gif)](https://gyazo.com/2355e9821d03d96c07e811cc95e23fe3)

・invalid時

[![Image from Gyazo](/images/2026f34252378a23fc5f6004f50d9ae7.gif)](https://gyazo.com/2026f34252378a23fc5f6004f50d9ae7)

https://codesandbox.io/s/lesson24-moufq

## バリデーション

https://developer.mozilla.org/ja/docs/Learn/Forms/Form\_validation

### メールアドレスの正規表現

inputのtype属性がemailの場合、以下の正規表現が適用されるそうです  
これを調べて 解読してみてみます...

```
/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
```

https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email)

  

![わたし](/images/43D8A608-67A3-48E2-9600-EFFAEB7E218E_1_201_a-150x150.jpeg)

わたし

長めなので、分割して調べていきます

(※ 誤りがあれば教えて頂きたいです...とっても自信がない！！)

@マークの前に \[ \] 内の 記号を含む英数字が1文字以上あれば マッチする

```
^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@
```

\[a-zA-Z0-9\]のいずれか一文字、  
\[a-zA-Z0-9-\] 0〜61字、\[a-zA-Z0-9\]のいずれかに0または1以上に一致する

```
[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?
```

.(ドット)の後に続く\[a-zA-Z0-9\]いずれか一文字、  
\[a-zA-Z0-9-\] 0〜61字、\[a-zA-Z0-9\]のいずれかに 0または1文字以上に一致する

```
(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$
```

つまり、＠マーク の前に\[a-zA-Z0-9.!#$%&'\*+\\/=?^\_\`{|}~-\]が1文字以上あり、  
@マークの後にも1文字以上の決まった英数字があれば一致する。

また.(ドット)の後には一文字以上の英数字があればそれも一致する...ということだと解釈しました

### 今回 実装した正規表現

今回は課題ということもあり、自分で正規表現を書いてみることにしました  
@マークの前には``[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]``が一文字以上あること、  
@マークの後にも`[a-zA-Z0-9-]`が一文字以上、.(ドット)のあとに`[A-Za-z]`が一文字以上あればマッチします。  
また、`(\.[A-Za-z]+?)?`の部分では.(ドット)の後に `[A-Za-z]`が1文字以上あればマッチすると表現しました

```
/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[A-Za-z]+(\.[A-Za-z]+?)?$/g
```

### パスワードの正規表現

パスワードの条件、**8文字以上の大小の英数字を交ぜたもの** を以下の正規表現で実装しました

```
 /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/g
```

### 正規表現のチェック

メールアドレス、パスワードを`test()`し、マッチしているかをbooleanで返します  
ここでは、マッチしていたらfalseを返し、マッチしていなかったらtrueで返す様にしています

```
const isValidInRegex = (constraint, value) => constraint.test(value) ? false : true;
```

### 文字数の制限

引数に 入力した値と最大数が渡り、演算子を使用しbooleanを返します

```
const isLimitTextLength = (value, limit) => value.length >= limit;
```

### 入力の有無

引数へ 入力した値が渡り`trim()`で両端の空白を削除し、値が空であればtrueを返します

```
const isBlankInInput = (value) => value.trim() === "";
```

### オブジェクトにまとめる

ユーザー名、パスワード、メールアドレス... それぞれのバリデーションをオブジェクトにしました  
オブジェクトには、バリデーションと invalidだった時に表示したいメッセージをそれぞれ格納しています

```
const constraint = {
  username: {
    validation: () => {
      return isLimitTextLength(userName.value, 16);
    },
    invalidMessage: "ユーザー名は15文字以下にしてください。"
  },
  email: {
    validation: () => {
      const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[A-Za-z]+(\.[A-Za-z]+?)?$/g;
      return isValidInRegex(reg, email.value);
    },
    invalidMessage: "メールアドレスの形式になっていません"
  },
  password: {
    validation: () => {
      const reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/g;
      return isValidInRegex(reg, password.value);
    },
    invalidMessage: "8文字以上の大小の英数字を交ぜたものにしてください。"
  }
};
```

### 実行

引数のfieldにはイベントが起きたinput要素が渡ってきます

① 空かどうかをチェックする  
\-> 空であれば "未入力です"と表示され、早期リターン  
\-> 空でなければ②へ

② それぞれのinputタイプによる バリデーションチェック(オブジェクトのvalidationを実行する)  
input要素にはidが付与されていて、id名はオブジェクトのキーと一致します。  
`constraint[field.id].validation()` を実行すると `[field.id]`にはイベントが起きた要素のidが入るので、ユーザ名であれば`[username]`となる。  
\-> invalidであればオブジェクトに格納したinvalidMessageが表示され、return  
\-> validであれば ③へ

③ 入力された値は空でもなく、バリデーションも通ったのでtrueを返す

```
const checkFieldValidation = (field) => {
  if (isBlankInInput(field.value)) {
    addInvalidMessage(field, "未入力です");
    return false;
  }

  if (constraint[field.id].validation()) {
    addInvalidMessage(field, constraint[field.id].invalidMessage);
    return false;
  }

  return true;
};
```

## submitボタンのdisabled切り替え

submitボタンは、全フィールドの入力のバリデーションが有効で  
なおかつ checkboxがcheckedの場合に disabledをfalseに切り替えます

以下の`checkAllInputs()`は、オブジェクトに格納してあるすべてのfieldをチェックします

```
const checkAllInputs = () => {
  return Object.keys(constraint).every((key) => {
    const fieldElement = document.getElementById(key).value;
    return isBlankInInput(fieldElement) || constraint[key].validation() ? false : true;
  });
};
```

`every()`を使用し IDをもとにinputフィールドへの入力値を取得します、  
空ではないか？バリデーションは通ったか？をbooleanで返します

  
`every()`は、配列内の要素に対してcallback関数を実行し その結果をbooleanで返します  
結果がfalseになった段階で callbackはfalseを返し その後の要素に対してはテストはしないメソッド

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global\_Objects/Array/every

## invalid ＆ valid の時の変化

記事冒頭の制作物を見ればわかる様に  
バリデーションが有効か無効か....それぞれユーザーに伝わる様にしました

valid時にはクラスを付与し フィールドの枠線を緑にし、入力が有効であることがわかる様にしました

```
const addValidClassName = (target) => {
  const parent = target.parentElement;
  parent.classList.add("valid");
};
```

```
.register-form__field.valid input {
  border-color: #09c372;
}
```

invalidの際も、クラスを付与し枠線は赤にします。また、なぜinvalidなのかもわかる様に フィールドの下にメッセージを追加します

```
const addInvalidMessage = (target, message) => {
  const parent = target.parentElement;
  parent.classList.add("invalid");
  const el = document.createElement("span");
  el.classList.add("invalid-message");
  el.textContent = message;
  parent.appendChild(el);
};
```

```
.register-form__field.invalid input {
  border-color: #ff3860;
}
```

## イベントのタイプの違いと使い分け

レビューをいただく前のコードでは 以下の様にイベントを定義していました

```
form.addEventListener("input", (e) => {
  const targetField = e.target;
  targetField.id !== "check-box" && addValidationMessage(targetField);
  if (checkAllInputs() && checkBox.checked) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});
```

<form>に対してinputイベントを定義し、eventオブジェクトからtargetを取得。  
targetに対してのバリデーションを実行、さらに他のinput要素のバリデーションのチェックが走り  
最終的にcheckboxがcheckedの場合にsubmitボタンのdisabledが切り替わります

inputイベントはvalueの変更のたびに発生する為、一文字入力するだけで、上記の処理が走ります

https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/input\_event

  
blur時に特定のバリデーションをチェックし、  
focus時にエラーメッセージを外すと パフォーマンスが良くなるとレビューを頂きました  
頂いたレビューをもとに修正をおこないました  
  
inputフィールドごとに イベントを設定しました

```
password.addEventListener("blur", setInputFieldEvent);
email.addEventListener("blur", setInputFieldEvent);
userName.addEventListener("blur", setInputFieldEvent);
checkBox.addEventListener("change", switchDisabledInCheckbox);
userName.addEventListener("focus", resetInputField);
email.addEventListener("focus", resetInputField);
password.addEventListener("focus", resetInputField);
```

inputフィールドに対して、blurイベントを定義しています  
イベントが起こると 対象要素のバリデーションチェックが実行され、  
true(valid)であれば 全フィールドのバリデーションが走る様にしました  
false(invalid)の場合は、submitButtonのdisabledはtrue(無効化)になり そこで処理は終わります

```
const setInputFieldEvent = (e) => {
  if (checkFieldValidation(e.target)) {
    addValidClassName(e.target);
    switchDisabledInCheckbox();
  } else {
    submitButton.disabled = true;
  }
};
```

```
const switchDisabledInCheckbox = () => {
  submitButton.disabled = checkAllInputs() && checkBox.checked ? false : true;
};
```

focusイベントでは valid(or invalid)メッセージのremoveを実行します

```
const resetInputField = (e) => {
  const className = ["invalid", "valid"];
  e.target.parentElement.classList.remove(...className);
  const errorMessage = e.target.parentElement.querySelector(".invalid-message");
  errorMessage && errorMessage.remove();
};
```

  
今回仕様したイベントのそれぞれの違い

<table><tbody><tr><td>blur</td><td>フォーカスを失ったときに発生する。バブリングしない</td></tr><tr><td>change</td><td>&lt;input&gt;&lt;select&gt;&lt;textarea&gt;要素の値の変更が確定した際に発生するが<br>要素の種類などによって発生条件は変動。<br>checkboxは :checkedになった場合に発生する</td></tr><tr><td>focus</td><td>フォーカス時に発生。バブリングしない</td></tr></tbody></table>

## まとめ

今回はVanilla JSでformバリデーションの実装を行いました！

バリデーションは Webサイトや、アプリでよくみるパーツですが  
いざ実装するとなると、配慮することがたくさんあると感じました。  
正規表現も少しずつですが、苦手意識が薄れてきました  
  
今回レビューをしてくれた  
[もなかさん](https://twitter.com/ruby443n)、[もりけん先生](https://twitter.com/terrace_tech) ...ありがとうございましたヾ(\*´∪｀\*)ﾉ"

* * *

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
