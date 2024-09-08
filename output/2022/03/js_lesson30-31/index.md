---
title: "【もりけん塾 @JS課題30〜31】ドロワーメニューの実装"
date: "2022-03-17"
categories: 
  - "javascript"
tags: 
  - "javascript"
  - "js_lesson"
  - "プログラミング"
  - "morikenjuku"
  - "学習記録"
coverImage: "Twitter-post-12.jpg"
---

  
現在、もりけん塾で  
[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md)に取り組んでいます。  
今回は課題30-31の実装で学んだことをブログへまとめます

## ドロワーメニューの仕様

\- デザインは自由、アニメーションも可(spも考慮すること)  
\- 左上のハンバーガーボタンをクリックすると、横からシュッとでてくる or 全体が切り替わる  
\- シュッと横から出てきた場合は 画面の半分より短めなコンテンツがでてきて、コンテンツ以外はopacityで下のコンテンツが見える状態  
_\-_ ドロワーメニューが開いている間は全体固定、どこをフリックしてもぐわんぐわんしない  
\- コンテンツ内は要素が多い場合スクロールできる  
\- オプションで様々な機能を渡せるようにする。ドロワーメニューが出てくる方向をオプションで渡せるようにするのは必須で他は任意。  
{direct: "left"} // or right

### 制作物

![](/images/d46622f85a9cc09f1bed230653a58c57.gif)

### codesandbox

https://codesandbox.io/s/lesson31-shgu2t

## 開閉部分

bodyタグへのクラスの付け替えと、メニューの属性値の切り替えをJavaScriptで行いました

```
const toggleDrawerMenu = () => {
  drawerMenu.toggleAttribute("aria-hidden");
  body.classList.toggle("drawer-menu-open");
}
// ハンバーガボタンに対してクリックイベントを定義
toggleButtonInDrawerMenu.addEventListener("click", toggleDrawerMenu);
```

## オプション

今回オプションとして定義したものは、**メニューが出てくる方向**、**overLayの表示/非表示切り替え**、**transition-duration**...の3つです  
デフォルト値として以下の変数を定義しました

```
const defaultOption = { direct: "left", overLay: true, duration: 0.3 };
```

オプションを初期設定する関数を定義しました  
引数にカスタムしたいオプションを渡し、デフォルトオプションを変更することができます

```
const settingDrawerMenu = (options = {}) => {
  const defaultOption = { direct: "left", overLay: true, duration: 0.3 };
  const drawerOptions = {
    ...defaultOption,
    ...options
  };
...
// 実行
settingDrawerMenu({ direct: "right" });
```

### メニューの方向

引数で渡ったオプションをもとにクラスを付与します

```
const switchDrawerDirect = (option) => {
  switch (option) {
    case "right":
      {
        drawerMenu.classList.add("drawer--right");
        break;
      }
    default:
      drawerMenu.classList.add("drawer--left");
  }
}
```

CSSでメニューの位置のstyleが当たります

```
.drawer-menu.drawer--right {
  right: -100%;
}

.drawer-menu.drawer--left {
  left: -100%;
}
```

### overLayの表示

overLayがtrueであれば 要素を生成・追加し、クリックイベントが定義されます  
overLayがクリックされれば、ドロワーメニューは閉じます

```
const createOverLay = () => {
  const overLay = document.createElement("div");
  overLay.id = "js-drawer-overlay";
  overLay.classList.add("drawer-overlay");
  return overLay;
}

const renderOverLay = () => {
  const overLay = createOverLay();
  overLay.addEventListener("click", toggleDrawerMenu);
  body.appendChild(overLay);
}

drawerOptions.overLay && renderOverLay();
```

## **transition-duration**

```
drawerMenu.style.transitionDuration = `${drawerOptions.duration}s`;
```

### オプション部分をまとめると...

```
const settingDrawerMenu = (options = {}) => {
  const defaultOption = { direct: "left", overLay: true, duration: 0.3 };
  const drawerOptions = {
    ...defaultOption,
    ...options
  }
  drawerOptions.overLay && renderOverLay();
  switchDrawerDirect(drawerOptions.direct);
  drawerMenu.style.transitionDuration = `${drawerOptions.duration}s`;
}
settingDrawerMenu({ direct: "right" });
```

## { ...undefined }はエラーにならない...?

上記のコードでは オプションの設定を行う関数に渡る引数がなかった場合を考慮して、  
引数にデフォルト値(空のオブジェクト)を設定しましたが、デフォルトの設定がない場合もエラーが起きないことがわかりました

```
const settingDrawerMenu = (options) => {
  const defaultOption = { direct: "left", overLay: true, duration: 0.3 };
  const drawerOptions = {
    ...defaultOption,
    ...options
  }
...
```

予想では 引数がなかった場合、`options`は`undefined`になるので  
`undefined`をスプレッド構文で展開する際にエラーが起きそうだと感じました...

`console.log`で確認すると、オブジェクト内で展開した`undefined`は空のオブジェクトを返しました

```
console.log({...undefined});   // {}
```

ちなみに配列ではエラーが起きる

```
console.log([...undefined]);
// Uncaught TypeError: undefined is not iterable
```

### 参考

https://stackoverflow.com/questions/47155141/spreading-undefined-in-array-vs-object

* * *

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
