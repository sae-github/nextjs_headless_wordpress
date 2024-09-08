---
title: '【もりけん塾 @JS課題33】Animation APIを使用した遷移アニメーションの実装'
date: '2022-04-04'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'js_lesson'
  - 'プログラミング'
  - 'morikenjuku'
  - '学習記録'
coverImage: 'Twitter-post-14-1.jpg'
---

現在、もりけん塾で  
[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます。  
今回は課題33の実装で学んだことをブログへまとめます

## 課題33

ドロワーメニュー内の要素をクリックするとドロワーメニューが閉じコンテンツに遷移するようにする  
遷移する際は何かしらのアニメーションをつけること

以前実装したドロワーメニューをもとに、アニメーションの実装を行いました

https://itosae.com/js\_lesson30-31/

### 制作物

![](/images/71caa2d0df8b28a5ba2823d99e151f7b.gif)

### codesandbox

https://codesandbox.io/s/lesson33-e3ykz4?file=/js/drawer-menu.js

## Animations API

Animations APIを使用しアニメーションの実装を行いました

https://developer.mozilla.org/ja/docs/Web/API/Web\_Animations\_API/Using\_the\_Web\_Animations\_API

### CSS アニメーション vs JavaScript のアニメーション

アニメーションを実装する際に悩んだのが、CSSとJavaScriptの使い分けです  
以下の参考記事を読んで、その使い分けやAnimations APIのパフォーマンスについて学ぶことができました

https://hacks.mozilla.org/2016/08/animating-like-you-just-dont-care-with-element-animate/

https://web.dev/css-vs-javascript/

## FadeIn

フェードインの実装をJavaScriptとCSSで行いました  
fadeInさせたい親要素にfade-inクラスを付与しました

```
<body class="fade-in">
</body>
```

CSSで 全体に覆うようにコンテンツを表示させます

```
.fade-in::after {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: skyblue;
  pointer-events: none;
  opacity: 1;
  z-index: 50;
}
```

JavaScriptで`fadeInAnimation`を定義、実行しopacityでふわっと表示する感じを実装しました  
fade-inクラスを外し、表示したいコンテンツが現れます

```
const fadeInAnimation = (element, duration) => {
  element.animate([{ opacity: 0 }, { opacity: 1 }], duration);
};

fadeInAnimation(body, 300);
body.classList.remove("fade-in");
```

## transform

ドロワーメニュー内の要素がクリックされた際に出現する  
うさぎの画像を、右から左に移動させるアニメーションを定義しました

```
const transformLoadingAnimation = (element, duration) => {
  return element.animate(
    [
      { transform: "translate(0,-50%)" },
      { transform: "translate(-100%,-50%)" }
    ],
    duration
  );
};
```

うさぎの画像はあらかじめHTMLで実装しました

```
<div class="transition-loading" id="js-transition-loading">
   <img src="../img/transition-loading.png" alt="" />
</div>
```

```
.transition-loading {
  width: 30%;
  display: none;
  max-width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-100%, -50%);
  z-index: 60;
}

.transition-animation .transition-loading {
  display: block;
}
```

ドロワーメニュー内の要素をクリックした時のイベント...

```
drawerMenuNavigation.forEach((nav) => {
  nav.addEventListener("click", (event) => {
    event.preventDefault();
    toggleDrawerMenu();   // ドロワーメニューを閉じる処理
    transitionPageAnimation(event.currentTarget.href);
  });
});
```

アニメーションの終了イベントハンドラーである"finish"を使用して  
アニメーションを終了後、ページを遷移します

```
const transitionPageAnimation = (href) => {
  body.classList.add("fade-in", "transition-animation");
  const loading = document.getElementById("js-transition-loading");
  const loadingAnimation = transformLoadingAnimation(loading, 500);
  loadingAnimation.addEventListener("finish", () => (window.location.href = href));
};
```

## まとめ

アニメーションってHTML・CSS・JavaScriptの総合力が より 試される気がした...  
アニメーションの引き出しがなさすぎて、あまりオシャレな感じにできませんでしたが、  
Animations APIについて学ぶことができ、アニメーションを実装する手段を一つ知ることができました。

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
