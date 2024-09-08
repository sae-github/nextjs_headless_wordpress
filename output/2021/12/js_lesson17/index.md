---
title: "【もりけん塾 @JS課題17】Vanilla JSでスライドショー作成①"
date: "2021-12-24"
categories: 
  - "javascript"
tags: 
  - "javascript"
  - "js_lesson"
  - "プログラミング"
  - "morikenjuku"
  - "学習記録"
coverImage: "WebブラウザにWebサイトが表示までの旅へ-3-1.jpg"
---

現在、もりけん塾で  
[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/sae-github/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます。  
今回は課題17の実装で学んだことをブログへまとめます

## 課題17

よくあるスライドショーを作ってみる  
以下、今回の仕様です

☑︎画面遷移してから3秒後に解決されるPromiseが返すオブジェクトを元にimgタグを5つつくる。  
☑︎それぞれは.z-indexで重ねた状態。クリックを押すと画像が変わる  
☑︎5枚中何枚目かを表示して、5/5の場合Nextの矢印はdisabledにする。  
1/5枚の時はBackボタンはdisabledにする

### 制作物

[![Image from Gyazo](/images/37a019bf705a3e84b4658e2d7334eff1.gif)](https://gyazo.com/37a019bf705a3e84b4658e2d7334eff1)

https://codesandbox.io/s/js-lesson17-part2-mznov

## タスクの整理

今回の実装でやりたいことを箇条書きで書き出してみました  
・APIの作成  
・fechしたデータが3秒後に返ってくる  
・受け取ったデータをもとにスライドを作成  
・矢印ボタンを作成  
　- 表示されている画像が一番最初の要素であればpreviousボタンにdisabledを、  
　　一番最後の要素であればnextボタンにdisabledをつける  
・受け取ったデータ数をもとに カウンターを作成(表示中の画像 /スライド総数)  
\- 画像が切り変わると更新される

## 矢印ボタンを作成

```
const createArrowButtons = () => {
 const arrowBtnWrapper = createElementWithClassName("div", "arrow-btn__wrapper");
 const arrowDirections = ["previous", "next"];
 arrowDirections.forEach((arrowDirection) => {
  const button = createElementWithClassName("button", `arrow-btn --${arrowDirection}`);
   button.id = `js-${arrowDirection}`;
   button.value = arrowDirection;
    // 初期設定として previousの属性にdisabledを付与
   button.value === "previous" && button.setAttribute("disabled", true);
   arrowBtnWrapper.appendChild(button).appendChild(document.createElement("span"));
  });
  return arrowBtnWrapper;
}
```

※createElementWithClassName(type,class)は要素を作成し、クラス名を付与する関数

### イベントの定義

```
const setClickEventInArrowButton = () => {
  const arrowButtons = document.querySelectorAll(".arrow-btn");
  arrowButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const eventTargetValue = e.currentTarget.value;
     // 画像の切り替え
      switchImage(`${eventTargetValue}ElementSibling`);
     // カウンターの更新
      updateOfCounter();
　　　　   // disabledの切り替え
      toggleTheDisabled(e.currentTarget);
    });
  });
}
```

### disabledの切り替え

```
const slideList = document.getElementById("js-slid-list");

// targetには previous or nextが渡る
const toggleTheDisabled = (target) => {
  const lastSlideItem = slideList.lastElementChild;
  const firstSlideItem = slideList.firstElementChild;
  const displayingEl = document.querySelector(".is-displaying");
  // 現在表示中の要素が最初 or　最後であれば disabledを付与
  if (displayingEl === lastSlideItem || displayingEl === firstSlideItem) {
    target.setAttribute("disabled", true);
  } else {
    const disabledEl = document.querySelector("[disabled]");
    disabledEl && disabledEl.removeAttribute("disabled")
  }
}
```

✓ Element.lastElementChild → Elementの最後の子要素を返す  
✓ Element.firstElementChild → Elementの最初の子要素を返す

## 画像の切り替え

```
// directionには previousElementSibling or　nextElementSibling が渡ってくる
const switchImage = (direction) => {
  const displayingItem = document.querySelector(".is-displaying");
  const targetElement = displayingItem[direction];
  // 前の要素 or　次の要素 があればクラスを付け替える
  if (targetElement) {
    displayingItem.classList.remove("is-displaying");
    targetElement.classList.add("is-displaying");
  }
}
```

✓ previousElementSibling → (隣接する) 前の要素を返す  
✓ nextElementSibling → (隣接する) 次の要素を返す

## カウンターの作成・更新

```
// 現在表示中のスライドの順番を返す
const findOrderOfDisplayedItem = () => {
  const slideItemArray = [...document.querySelectorAll(".slide-item")];
  const targetIndex = slideItemArray.findIndex(el => el.classList.contains("is-displaying"));
  return targetIndex + 1;
}

// カウンターの更新 
const updateOfCounter = () => {
  document.querySelector(".current-number").textContent = 　　　findOrderOfDisplayedItem();
}
```

✓ スプレッド構文を使用し、スライドを全て取得し 配列内に収めることが一行でできた  
✓ findIndexは条件に一致した最初の要素のindexを返してくれるメソッド。

## レビューを振り返る

### create\*\*

関数名をcreate\*\*とした 関数内で、  
elementの作成と DOMへの追加を行っていましたが、  
create\*\*とはelementを作成しreturnするだけの方が適切ではないか とレビューでいただきました  
レビューをもとにそれぞれの仕事別に関数を切り分けました

例) 取得したデータをもとにスライドを作成する関数

```
const createSlideItem = ({ image }) => {
  const slideItem = createElementWithClassName("li", "slide-item");
  const slideImage = createElementWithClassName("img", "slide-img");
  slideImage.src = image;
  slideItem.appendChild(slideImage);
  return slideItem;   // DOMには追加せず、作成した値をかえす
}
```

この様にすることで、関数が一つの仕事だけになり  
より、わかりやすく、関数名にあった内容となりました。

### コメントの書き方

JSDocコメントについて教えて頂きました

コメントの書き方なんて今まで全く気にしたことなかった..  
今までは 以下の様に コメントを書くことが多かったです

```
// コメントコメントコメントコメント
```

  
JSDocは変数や関数の宣言の直前に以下の形式でコメントを書きます。  
詳しい書き方は、下の参考リンクをみることをお勧めします。

```
/**
  * 
  */
```

また以前塾内でシェアして頂いた、_JavaScript best practices_ には以下の様にありました

Again the trick is moderation. Comment when there is an important thing to say, and if you do comment use the /\* \*/ notation. Single line comments using // can be problematic if people minify your code without stripping comments and in general are less versatile.  
(引用：https://www.w3.org/wiki/JavaScript\_best\_practices)  
  
// DeppL訳  
繰り返しになりますが、コツは「節度」です。コメントする場合は、/\* \*/という記法を使いましょう。一行のコメントで//を使用すると、コメントを削除せずにコードをminifyされた場合に問題が発生する可能性があり、一般に汎用性が低くなります。

個人開発でも こういった細かな点を意識して 実装をしていきたいと思いました。

シェアして頂いたサイト

https://ics.media/entry/6789/

https://w.atwiki.jp/aias-jsstyleguide2/pages/14.html#comment\_syntax

https://www.w3.org/wiki/JavaScript\_best\_practices

レビューを下さった、みなさんありがとうございました。  
thanks 💛もなかさん([@ruby443n](https://twitter.com/ruby443n)) Nariさん([@weegie\_design](https://twitter.com/weegie_design)) yukaさん([@mamuuu08)](https://twitter.com/mamuuu08)、  
あやかさん([@despair\_ya12](https://twitter.com/despair_ya12))

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)  
　　　　　　　 ブログ：[https://kenjimorita.jp/](https://kenjimorita.jp/)
