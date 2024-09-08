---
title: "【もりけん塾】はじめてのCSS grid"
date: "2021-10-03"
categories: 
  - "css"
tags: 
  - "css"
  - "morikenjuku"
  - "勉強会"
  - "学習記録"
coverImage: "青とピンク-色付き-人物イラスト-教室ルール-オンライン・エチケット-教育プレゼンテーション-1.jpg"
---

今回は、**「　_CSS grid_ 　」**について学習を行いました  
学んだことや、参考にした記事などをまとめました  
  
もりけん塾の もりけん先生が作った、ハンズオンを元に学習を進めました  
  
gridに初めて触れる方でも. すぐに手を動かして学ぶことができる内容で、  
gridでどの様なことができるのか を学ぶことができました

**触って覚えるgridハンズオン学習・練習**

https://github.com/kenmori/handsonFrontend/blob/master/css/grid-work.md

## CSS gridとは？

CSSでレイアウトを実装する際の手法の一つであり、**行**と**列**を用いてレイアウトを実装することができる。  
  
flexが横並びや、縦並びなどの一次元のレイアウトを行うのに対して、  
行と列を使用し,コンテンツを配置できるgridは2次元のレイアウトシステムという。

[https://developer.mozilla.org/ja/docs/Web/CSS/CSS\_Grid\_Layout/Basic\_Concepts\_of\_Grid\_Layout](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)

## gridの初め方　

_display: grid;_ または _display: inline-grid_**_;_** を指定をすると  
その要素が **gridコンテナ** となり、直接の子要素が **gridアイテム** となります

デベロッパーツールで確認すると 以下の様な状態となりました  
**gridアイテム** に線が引かれていて、これを **ガイド線(grid線)** といいます

![](/images/スクリーンショット-2021-10-03-9.32.32-1024x198.png)

## 列(column)と行(row)

**_grid-template-columns_** と**_grid-template-rows_**を使用し、列と行の定義を行います。  
grid線とgrid線の間のスペースを、**gridトラック** といい、そのサイズの定義です。

本題に入る前にcolumnsとrowsについて...

display: grid;とすると右の様に格子状になることは前項で書いた通りです。  
  
columnは列を、rowは行のことです  
(私はどっちがどっちだかで混乱しました...)

![](/images/列：columns-1-1-2-1024x691.png)

```
.grid {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
}
```

gridトラックのサイズが200 × 100になりました

![](/images/スクリーンショット-2021-10-02-8.07.08-1024x208.png)

### repeat

先ほどのコードをrepeatを使用し、書き換えると...

```
.grid {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(2, 200px);
}
```

**repeat(繰り返したい回数, 繰り返したいこと)** と指定しました

### minmax()

**( 最小サイズ, 最大のサイズ )**を指定することができます

```
grid-template-columns: repeat(3, minmax(200px, 1fr));  
```

### fr

gridトラックのサイズは, 今回の様にpxで固定値を指定することもできますが、  
%などの可変で設定することも可能です  
またgridでは **fr** という単位を 使用することができます(frはfractionの略)

>  `fr` 単位は、グリッドコンテナー内の利用可能な空間の分数 (a fraction) を表します
> 
> https://developer.mozilla.org/ja/docs/Web/CSS/CSS\_Grid\_Layout/Basic\_Concepts\_of\_Grid\_Layout#the\_fr\_unit

一番最後のトラックだけに1frを指定しました

```
.grid {
  display: grid;
  grid-template-columns: 200px 200px 1fr;
  grid-template-rows: repeat(2, 200px);
}
```

[![Image from Gyazo](/images/a49070331a7aa416a229496ca971467c.gif)](https://gyazo.com/a49070331a7aa416a229496ca971467c)

## 配置

以下の様なレイアウトを実装をしていきます

![](/images/スクリーンショット-2021-10-02-8.21.43-1.png)

```
/* gridコンテナ 　*/
.grid {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(3, 100px);
}
```

**_grid-column_** と**_grid-row_** を使用し, **開始 / 終了** の grid線を指定します

```
.grid-item1 {
　 grid-column: 1 / 4;　
}

.grid-item2 {
  grid-row: 2/ 4;
}
```

![](/images/列：columns-1-1024x494.png)

grid-columnとgrid-rowは、  
**grid-column(またはrow)-start**・**grid-column(またはrow)-end** のショートハンドです。  
そのため以下の様に書くことも可能です

```
.grid-item1 {
  grid-column-start: 1;
  grid-column-end: 4;
}

.grid-item2 {
  grid-row-start: 2;
  grid-row-end: 4;
}
```

やってみた

gridの範囲・配置については Grid Gardenというサイトで、手を動かして学ぶことができました

https://cssgridgarden.com/

### **_grid-template-area_**

gridエリアに任意の名前をつけることができます

先程の例を**grid-template-areas** を使用し、実装してみます

```
.grid {
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(3, 100px);
  grid-template-areas: 　　　　　　　　
    "header header header"　　
    "side-nav content content"
    "side-nav content content";
}
```

実際には見えませんが、以下の様に名前がついた状態となります

![](/images/列：columns-1-1-2-1024x516.jpg)

それぞれのgridアイテムにエリアの名前を指定することで 範囲を変更することができます

```
.grid-item1 {
  grid-area: header;
}

.grid-item2 {
  grid-area: side-nav;
}
```

## grid-template

**_grid-template-rows_**・ **_grid-template-columns_**・**_grid-template-area_** のショートハンド

```
/* 先程の例をgrid-templateで書き換えてみる
 .grid {
  　display: grid;
  　grid-template-columns: repeat(3,200px);
  　grid-template-rows: repeat(3,100px);
  　grid-template-areas: 　　　　　　　　
    　"header header header"　　
    　"side-nav content content"
    　"side-nav content content"
  　;
　} */

.grid {
  display: grid;
  grid-template:
    "header header header" 100px                                          /* rows */
    "side-nav content content" 100px                                    /* rows */
    "side-nav content content" 100px / 200px 200px 200px;   /* rows /  columns */
}
```

## flex or grid

flexとgridの使い分けについては以下の記事を読みました

参考にした記事

https://developer.mozilla.org/ja/docs/Web/CSS/CSS\_Grid\_Layout/Relationship\_of\_Grid\_Layout

https://coliss.com/articles/build-websites/operation/css/grid-for-layout-flexbox-for-components.html

## まとめ

gridを学ぶ前は、複雑で難しいイメージを持っていたのですが  
実際に手を動かすと、少ないコードでレイアウトを操ることができて楽しかったです。  
  
もっと、色々gridで実装してみたいと思いました！  
今回学んだことを忘れずに、定着をさせるためにも..他にも色々作ってみたいと思います

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
