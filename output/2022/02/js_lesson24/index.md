---
title: "【もりけん塾 @JS課題24】会員登録ページの作成 利用規約をチェック編"
date: "2022-02-04"
categories: 
  - "javascript"
tags: 
  - "javascript"
  - "js_lesson"
  - "プログラミング"
  - "morikenjuku"
  - "学習記録"
coverImage: "Twitter-post-8-2.jpg"
---

![管理人](/images/43D8A608-67A3-48E2-9600-EFFAEB7E218E_1_201_a-150x150.jpeg)

管理人

こんにちは、さえと申します👩‍💻  
現在 フロントエンドエンジニアになるために 日々勉強をしています  
このブログは その勉強の記録と アウトプットのために運営をしています✨

  
現在、もりけん塾で  
[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/sae-github/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます。  
今回は課題24の実装で学んだことをブログへまとめます

## 課題24

会員登録画面の実装

仕様

- バリデーションはここではなし
- ユーザー名、メールアドレス、パスワードの入力欄と利用規約に関するチェックボックスがある。
- 送信ボタンがあるが振るまいの実装はしないで良い
- 利用規約のテキストを押すと、モーダルが立ち上がり、[ダミーの利用規約](https://terracetech.jp/2021/04/11/gakusyuuyousozairiyoukiyaku/) がテキストとして読める。スクロールが一番下に行ったらチェックボックスはcheckedになる。もし開いてもスクロールが下まで行っていなければcheckedはfalseのまま
- checkedがtrueの場合送信ボタンを押下すると別ページの`register-done.html`に飛ぶ
- `register-done.html`は 画面は適当で、遷移できていることが分かれば良い。CSSも書かないでも良い

### 制作物

[![Image from Gyazo](/images/1a4ca38dcde69ebbd4acb21331bc5e7b.gif)](https://gyazo.com/1a4ca38dcde69ebbd4acb21331bc5e7b)

https://codesandbox.io/s/lesson24-moufq

## IntersectionObserver

https://developer.mozilla.org/ja/docs/Web/API/Intersection\_Observer\_API

モーダル内が最後までスクロールされたかを判断するために、IntersectionObserverを使用しました

```
const scrollInModalContent = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      checkBox.checked = true;
      checkBox.disabled = false;
      scrollInModalContent.disconnect();
    }
  },
  { root: modalContent }
);
scrollInModalContent.observe(modalContent.lastElementChild);
```

ターゲットをmodalContent.lastElementChildとし、モーダル内の最後の要素を指定しました。  
ルートには、modalContent(モーダルの利用規約の部分)を指定しました。  
  
entry.isIntersectingは交差が発生したかを真偽値で返し、  
trueであれば checkboxのcheckedをtrueにし、disabledをfalseに切り替えます。  
  
disconnect()はターゲットの監視を 終了するメソッドです。  
今回は 一度交差が発生し、callbackが実行されたあとは もう必要ないと考え、このメソッドを使用しました

IntersectionObserverは もりけん塾に入塾当初に教えて頂き、ブログにも復習としてまとめました

https://itosae.com/intersection-0bserver/

見返すと、この当時理解できていなかったことが 今はわかる様になっていることがいくつかありました  

## 即時関数は必要

モーダルの開閉部分を以下の様に 即時関数を使用して 実装していました

```
(function () {
  const overLay = document.getElementById("js-overlay");
  const closeButton = document.getElementById("js-modal-close");
  const rules = document.getElementById("js-rules");
  const body = document.querySelector("body");
const closeModal = () => {
  body.classList.remove("modal-open");
};

  const closeModal = () => {
    body.classList.remove("modal-open");
  };
const openModal = () => {
  body.classList.add("modal-open");
};

  const openModal = () => {
    body.classList.add("modal-open");
  };

  rules.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);
  overLay.addEventListener("click", closeModal);
})();
```

即時関数を使用した理由は グローバル定義の数を減らすためと、他から参照する予定がないためです。  

これに対して [もりけん先生](https://twitter.com/terrace_tech) からのレビューで、  
windowオブジェクトを実際に調べてみてください とコメントを頂きました

  
windowオブジェクトやconstについて調べると、

const で定義した変数は windowオブジェクトのプロパティにはないことがわかりました  
その為、即時関数を使用した理由として述べた “グローバル定義の数を減らすためです” は おかしいことに気がつきました。  
また、即時関数はvarの様にブロックスコープを持たない時に よく使用されることもわかりました  
今回は 即時関数であることのメリットはあまり感じられないと判断し、修正をしました  
  
レビューがなければ誤った知識でいるところでした。  
[もりけん先生](https://twitter.com/terrace_tech) ありがとうございます  
こういった基本的な知識は 誤った知識でいると、後々自分を苦しめることになるとおもいます。  
なんども復習したり、もう少し深く調べたりして 知識を深くしていきたいです

* * *

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
