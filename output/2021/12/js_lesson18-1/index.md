---
title: '【もりけん塾 @JS課題18】Vanilla JSでスライドショー作成② ドットナビを追加する編'
date: '2021-12-25'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'js_lesson'
  - 'プログラミング'
  - 'morikenjuku'
  - '学習記録'
coverImage: 'WebブラウザにWebサイトが表示までの旅へ-4.jpg'
---

現在、もりけん塾で  
[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/sae-github/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます。  
今回は課題18の実装で学んだことをブログへまとめます

前回に引き続きスライドショーの作成です

前回までの復習ブログ

https://itosae.com/js\_lesson17/

## 課題18

スライドショーにドットのページネーションを作りましょう  
それぞれのドットではクリッカブルになっていて、押下するとその画像に切り替わります。  
それとともに1/5も切り替わります。

### 制作物

[![Image from Gyazo](/images/0daee0368ae173443b2dc4b618bf0ec3.gif)](https://gyazo.com/0daee0368ae173443b2dc4b618bf0ec3)

https://codesandbox.io/s/black-voice-fynki?file=/main.js

## ドットナビを作成する

```
const createIndicator = (data) => {
  const ul = createElementWithClassName("ul", "indicator-list")
// 取得した 画像のdata分 loopして要素を作成する
  for (let i = 0; i < data.length; i++) {
    const li = createElementWithClassName("li", "indicator-item");
// 初期設定として最初の要素を選択
    i === 0 && li.classList.add("is-selected");
    ul.appendChild(li);
  }
  return ul;
}
```

※createElementWithClassName(type,class)は要素を作成し、クラス名を付与する関数

### イベントの定義

```
const setClickEventInIndicator = () => {
  const indicators = document.querySelectorAll(".indicator-item");
  indicators.forEach((indicator) => {
    target.addEventListener("click", (e) => {
 　  　// dotsナビの切り替え
    switchIndicator(e.target);
    // 画像の切り替え
    switchSlideImg(findIndexOfSelectedIndicator());
　　　　  //カウンターの更新
    updateOfCounter();
    // disabledの切り替え
   　toggleTheDisabled();
    });
  });
}
```

ドットナビがクリックされた際のイベントを定義しました。

・ドットナビの切り替え  
・画像の切り替え  
・カウンターの更新  
・矢印ボタンのdisabled切り替え

## ドットナビの切り替え

```
const switchIndicator = (target) => {
// 現在選択されている、indicatorを取得
  const selectedIndicator = document.querySelector(".is-selected");
// indicatorを配列で変数へ格納
  const indicators = [...document.querySelectorAll(".indicator-item")];
// 現在選択されているindicatorからis-selectedを外す
  selectedIndicator.classList.remove("is-selected");
// 選択された indicatorへis-selectedを付与
  (indicators[target] ?? target).classList.add("is-selected");
}
```

引数のtargetには indicator がクリックされた場合と 矢印ボタンがクリックされた場合で  
違う型の引数が入ります。  
indicator がクリックされた場合 → index(number)  
矢印ボタンがクリックされた場合 → previous(or next)ElementSibling  
その為 null合体演算子で制御する方法を取りました。  
左辺がundefinedであれば、右辺が実行されます。

### レビューで学んだこと

この点に関して、もりけん先生から  
引数で受け取る型が異なるのは好ましくない とのレビューを頂きました。

また、data属性を使用した実装方法を提案してくださいました。

```
const createIndicator = (imageLength) => {
  const ul = createElementWithClassName("ul", "indicator-list");
  for (let i = 0; i < imageLength; i++) {
    const li = createElementWithClassName("li", "indicator-item");
    li.setAttribute("data-num", i);    //追加
    i === 0 && li.classList.add("is-selected");
    ul.appendChild(li);
  }
  return ul;
};

const setClickEventInIndicator = () => {
  const indicators = document.querySelectorAll(".indicator-item");
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", (e) => {
      switchIndicator(e.target.dataset.num); //渡す引数をdata属性に変更
      switchSlideImg(findIndexOfSelectedIndicator());
      updateOfCounter();
      toggleTheDisabled();
    });
  });
};
```

この様にすることで、引数にindex(number)が渡り 型を統一することができました  
また、この変更に伴い 仮引数名も修正を行いました

```
const switchIndicator = (targetIndex) => {
  const selectedIndicator = document.querySelector(".is-selected");
  const indicators = [...document.querySelectorAll(".indicator-item")];
  selectedIndicator.classList.remove("is-selected");
 (indicators[targetIndex].classList.add("is-selected");
}
```

targetIndexとすることで、引数にnumber型の値が渡ってくることが予測しやすくなりました

## 画像の切り替え

```
const switchSlideImg = (targetIndex) => {
　　//　現在表示中の要素を取得
  const displayedSlideItem = document.querySelector(".is-displaying");
　 // 現在表示中の要素からクラスを外す
  displayedSlideItem.classList.remove("is-displaying");
  // スライドを全て取得
  const slideItems = [...document.querySelectorAll(".slide-item")];
 // 対象のスライド要素にクラスを付与
  slideItems[targetIndex].classList.add("is-displaying");
};
```

ドットナビの切り替え同様、引数にはindexが渡ります

##### ドットナビがクリックされた場合

```
// indicatorsの場合
const setClickEventInIndicator = () => {
  const indicators = document.querySelectorAll(".indicator-item");
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", (e) => {
      switchIndicator(e.target.dataset.num);
      switchSlideImg(findIndexOfSelectedIndicator());
      updateOfCounter();
      toggleTheDisabled();
    });
  });
};

// 現在選択中のドットナビのindexを返す
const findIndexOfSelectedIndicator = () => {
  const indicators = [...document.querySelectorAll(".indicator-item")];
  return indicators.findIndex((el) => el.classList.contains("is-selected"));
}
```

##### 矢印ボタンがクリックされた場合

```
const setClickEventInArrowButton = () => {
  const arrowButtons = document.querySelectorAll(".arrowBtn");
  arrowButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
// もし、nextボタンがクリックされた場合は、引数に現在表示中のindex + 1を渡す
// それ以外(つまりpreviousの場合)は現在表示中のindex-1で渡す
      if (e.currentTarget.value === "next") {
        switchSlideImg(findIndexOfDisplayedItem() + 1);
      } else {
        switchSlideImg(findIndexOfDisplayedItem() - 1);
      }
      updateOfCounter();
      toggleTheDisabled();
      switchIndicator(findIndexOfDisplayedItem());
    });
  });
```

矢印ボタンがクリックされた場合は、前後でスライドを切り替えたいので  
previousボタンがクリックされた場合は、現在表示中の要素のindexにプラス1をする  
nextのボタンがクリックされた場合は、マイナス1をした値を引数で渡す様にしました

## まとめ

殴り書きの様なまとめブログになってしましましたが、  
改めて復習することができる時間になりました  
次はauto機能の追加を行います...!

今回のPRでレビューをくれた方 ありがとうございました。  
Thanks...💛 もりけん先生([@terrace_tech](https://twitter.com/terrace_tech))、にゃっつさん([@nyattsu72](https://twitter.com/nyattsu72))

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)  
　　　　　　　 ブログ：[https://kenjimorita.jp/](https://kenjimorita.jp/)
