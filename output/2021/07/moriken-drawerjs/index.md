---
title: "【もりけん塾】ドロワーメニュー/ハンバーガーボタン"
date: "2021-07-11"
categories: 
  - "javascript"
tags: 
  - "morikenjuku"
coverImage: "印刷しやすい-シンプルなフォルダー-ラベル.png"
---

今回はもりけん塾で取り組んだ課題の学習ログです

取り組んだ課題は、**WebサイトによくあるパーツをJSで実装してみる！** です

第一弾はドロワーメニューとハンバーガーボタンを実装しました  
まずは普段通りHTML→CSSを書き、  
その後、過去にjQueryで実装した時のコードをバニラJSで書きなおしていく流れで進めました

## 今回書いたコード

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="gOWMNgq" data-user="Sae_codepen" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span>See the Pen <a href="https://codepen.io/Sae_codepen/pen/gOWMNgq">drawer-menu</a> by Sae (<a href="https://codepen.io/Sae_codepen">@Sae_codepen</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## はじめにやったこと

何がしたいのを言語化 してみました

①ハンバーガーボタンをクリックしたら  
②`#js-global-nav`にis-activeクラスを付与(持っていた場合外す)  
③条件式を使用し、HTMLで指定している属性値を変更する  
(そうすることで、style.cssのスタイルがあたりハンバーガーボタンが変化する)

jQueryで実装した際のコードです↓↓

```
jQuery(function() {
  jQuery('#js-hamburger').click(function() {
  jQuery('#js-global-nav').toggleClass('is-active')
  if(jQuery(this).attr('aria-expanded') == 'false') {
    jQuery(this).attr('aria-expanded', 'true')
    jQuery('#js-global-menu').attr('area-hidden', 'false')
  　} else {
    jQuery(this).attr('aria-expanded', 'false')
    jQuery('#js-global-menu').attr('area-hidden', 'true')
  }
})
});
```

参考にさせて頂きました

https://shibajuku.net/make-hamburger-button/

## Vanilla JSを書いていく

VanillaJSで書き直そうとしたら早速手が止まりました...

？ どう書くんだろう...？

手を動かしながら、基礎学習を進める方法をとったので とにかく調べながら進めていきました

具体的には...  
・まずネットで検索(例：**クリックした時 JS** etc...)  
・それっぽいメソッドが出てきたら、本の索引で探して読む・MDNで検索してみる。  
・ネットの記事(Qiitaやブログ記事など)

**参考にした本：**

https://www.amazon.co.jp/%E6%94%B9%E8%A8%82%E6%96%B0%E7%89%88JavaScript%E6%9C%AC%E6%A0%BC%E5%85%A5%E9%96%80-%EF%BD%9E%E3%83%A2%E3%83%80%E3%83%B3%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E3%81%AB%E3%82%88%E3%82%8B%E5%9F%BA%E7%A4%8E%E3%81%8B%E3%82%89%E7%8F%BE%E5%A0%B4%E3%81%A7%E3%81%AE%E5%BF%9C%E7%94%A8%E3%81%BE%E3%81%A7-%E5%B1%B1%E7%94%B0-%E7%A5%A5%E5%AF%9B-ebook/dp/B01LYO6C1N/ref=sr\_1\_4?dchild=1&keywords=JavaScript&qid=1625485154&s=books&sr=1-4

* * *

### ①ハンバーガーボタンをクリックした時

上記であげた書籍の中にこんなことが書いてありました。

> クライアントサイドJavaScriptにおいては、文書ツリーから要素ノード(要素)を取り出すというステップは欠かせません。
> 
> JavaScript本格入門

ということで、まずは要素の取得から行いました  
`getElementById()`メソッドを使用しました

> ``[`Document`](https://developer.mozilla.org/ja/docs/Web/API/Document) の `**getElementById()**` メソッドは、``  [`id`](https://developer.mozilla.org/ja/docs/Web/API/Element/id)プロパティが指定された文字列に一致する要素を表す [`Element`](https://developer.mozilla.org/ja/docs/Web/API/Element) オブジェクトを返します。
> 
> https://developer.mozilla.org/ja/docs/Web/API/Document/getElementById

取得した要素を変数に入れました。

```
const js_hamburgerbtn = document.getElementById("js-hamburger")
```

`console.log(js_hamburgerbtn)`をした結果をみてみると、、、

![](/images/スクリーンショット-2021-07-11-17.14.52.png)

次に、取得したハンバーガーボタンをクリックした時 の実装です

```
js_hamburgerbtn.addEventListener("click",function () {});
```

### ②is-activeクラスを持っていなかった場合付与され、持っていたら外す

今回もまずは要素を取得し、変数へ入れました。

```
const js_globalNav = document.getElementById("js-global-nav");
```

classListプロパティはclass属性の値をDOMtokenListオブジェクトとして取得できる。

```
const test = js_globalNav.classList;
console.log(test);
```

![](/images/スクリーンショット-2021-07-11-15.39.03.png)

`toggle()`を使用し、クラスの切り替えをします。  
toggleはjQueryでも使用したことがあるので馴染み深いです

```
js_globalNav.classList.toggle("is-active");
```

### ④HTMLで指定している属性値を条件式を使用し変更する

ifを使用して条件式を書きました。  
`getAttribute`で属性値を取得し、その値がfalseだった場合、  
`setAttribute`で指定した属性値を変更する。

```
if (this.getAttribute("aria-expanded") === "false") {
    this.setAttribute("aria-expanded", "true");
    js_globalNav.setAttribute("aria-hidden", "false");
  } else {
    this.setAttribute("aria-expanded", "false");
    js_globalNav.setAttribute("aria-hidden", "true");
}
```

### PRしレビューを依頼

ここで一番苦戦しました。  
改めてまとめてブログにしようと思ってます。  
もりけん塾ではコミットメーセージ、コメント、レビューなど全て英語で行います。

https://twitter.com/terrace\_tech/status/1409859931239444484?s=20

## 頂いたレビュー

先生にレビューしていただきました。

・コメントアウトについて

**・変数名について**

**・**transition、will-change、drawerの開く方向**について**

**・aria属性について**

### **コメントアウト**について

一番最初の私のHTMLコードを見ると、

```
        　 　</ul><!-- /.p-global-nav__list-->
        </nav><!-- /.p-header-nav -->
      </div><!-- /.l-inner -->
    </header><!-- /.l-header -->
```

コメントアウトは他の実装者や半年後の自分に対してのメッセージだと思ってください と先生が他の塾生の方へのレビューでおっしゃっていました

なるほど、、、

コードを見れば明白なことはわざわざコメントで書かない  
今回私が書いたコメントは”見ればわかる”、無駄なコメントでした。  
  
あと、クラス名変更した場合にコメントアウトまで変更しなくてはいけないのは  
手間だし、変更を忘れた時に混乱を招くことになるので不要だとも思いました。

### 変数名について

変数名に`js`\-とプレフィックスをつけていましたが、これは不要とコメントを頂きました。  
HTMLではid名に`js-`と付けていますが、その理由はJSで使用するとわかるようにです。  
ですがJSの変数名に`js-`とつけるのは確かに変ですし、  
後出てくる変数にも付けなくてはいけなくなる(一貫性がなくなるから)ので消しました。

また、書籍で変数/関数名はcamelCase記法が使われるのが一般的とも書いてありました

camelCase記法

先頭の単語の頭文字は小文字、それ以外の単語の頭文字は大文字

### **transition、will-change、drawerの開く方向**について

今回初めて[Material Design](https://material.io/)というのを知りました。  
今まで`transition`をとりあえず付けてしまっていました...

https://material.io/design/motion/speed.html#controlling-speed

`will-change`プロパティは初めて知るプロパティでした。  
JSでハンバーガーボタンをhoverした時に`will-change`が当たるようにコードを書き足しました。

https://developer.mozilla.org/ja/docs/Web/CSS/will-change

**drawerの開く方向**についてもコメントをいただきました。

[ここ](https://material.io/components/navigation-drawer#anatomy)に書いてありますが、

> Navigation drawers that open from the side are placed on the left of the screen for left-to-right languages, and on the right of the screen for right-to-left languages.
> 
> 横から開くナビゲーションドロワーは、左から右の言語の場合は画面の左に、右から左の言語の場合は画面の右に配置されます。

「「「おおおお！！！その方がいい！！！！！」」」

日本語の場合、左から読むから左からメニューが出てきた方が視線がスムーズですよね。

## 最終的なコード

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="rNmMrGW" data-user="Sae_codepen" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"><span>See the Pen <a href="https://codepen.io/Sae_codepen/pen/rNmMrGW">drawer-menu </a>by Sae (<a href="https://codepen.io/Sae_codepen">@Sae_codepen</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

以上でapproveして頂き、mergeしました。

* * *

一つの課題にかなり時間を使ってしまいましたが、  
先生にレビュー頂き、すごく勉強になりました。  
また、自分で書いたコードを自分で説明することの重要性を感じました。

先生、何度も添削して頂き、ありがとうございます。  
(これが無料って何で返していけばいいのですか、、、)

* * *

もりけん塾で学習しています。  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
