---
title: 'Intersection Observer APIについてまとめてみる【学習記録】'
date: '2021-07-23'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'プログラミング'
  - 'morikenjuku'
  - '学習記録'
coverImage: '印刷しやすい-シンプルなフォルダー-ラベル-2.png'
---

Intersection Observer APIについて復習をしたので、ブログに記録をします

前回の課題でIntersection Observer APIについて調べながら実装を行いました。  
その際、何が一番理解を妨げていたかというと、全体的な言葉や概念の理解不足です。。。  
今回は、このまとめを通してJavaScriptの基礎理解も深めていきたいと思います。

前回の課題

https://itosae.com/floatingitem-smoothscroll/

## Intersection Observer APIとは

> Intersection Observer API (交差監視 API) は、ターゲットとなる要素が、祖先要素もしくは文書の最上位の[ビューポート](https://developer.mozilla.org/ja/docs/Glossary/Viewport)と交差する変更を非同期的に監視する方法を提供します。
>
> https://developer.mozilla.org/ja/docs/Web/API/Intersection\_Observer\_API

監視したい要素(target)が、別の要素(root)に出たり入ったりする時(=交差した時)に  
実行するコールバック関数を登録することができます

![](/images/const-rect-id.getBoundingClientRect.top-console.logrect-2-1024x536.png)

交差したタイミングでコールバック関数が発火することが、このAPIの特徴です

## オブジェクトを作成する

コンストラクタを使用しオブジェクトを生成する。  
またこのオブジェクトのことをインスタンスと呼びます

```
let observer = new IntersectionObserver(callback, options);
```

第一引数にコールバック関数を、第二引数にはオプションの設定に関するオブジェクトを渡しています

### 脱線：インスタンスとコンストラクタ

オブジェクト指向の世界では もともと用意されたオブジェクトを直接利用することを認めていない為、オリジナルの複製(コピー)を利用する。そのことを**インスタンス化**といい、できた複製(コピー)のオブジェクトを**インスタンス**という。  
また、オブジェクトにはオブジェクトを初期化する為のメソッドが用意されていて、これを**コンストラクタ**という。

## オプションとは

先ほど第二引数で渡したoptionsについてです

- **root**  
   交差を監査する枠の様な要素のこと。デフォルト値のnullにするとビューポートがrootとなる。

- **rootMargin**  
   交差を検知するrootのマージン。

- **threshold**　　　  
   コールバック関数を呼び出したい交差割合を0〜1の間で数値もしくは配列形式で設定する。  
   デフォルト値は0。1pxでも表示されるとコールバックが実行します

```
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0
}
```

`root` オプションを指定した場合、target はルート要素の子要素でなければならない。

## targetの指定

`observe` メソッドで監視したい要素を指定します。

```
observer.observe(target);
```

## コールバック関数

callbackの第一引数には、監視した要素の数だけの`IntersectionObserverEntry`オブジェクトが格納された配列が渡ります

```
const callback = (entries) => {
 console.log(entries);
};
```

![](/images/スクリーンショット-2022-04-12-20.49.46-1024x70.png)

`IntersectionObserverEntry`オブジェクトの各プロパティは、ターゲットとルートの交差に関する情報を表します。

### IntersectionObserverEntryのプロパティ

- **intersectionRatio**　　  
   ターゲットとルートの交差比率を0 ~ 1の数値で取得する。  
   ターゲットがルートと交差すると交差量が増加し、`intersectionRatio`も増加する。

- \***\*isIntersecting\*\***  
   ターゲットが交差したか（true）、交差状態から脱却したか（false）を示すブール値を返す。

- **target**  
   rootとの交差を監視する要素を返す

- **time**  
   ページロードからの経過時間をミリ秒単位で表す数値が格納されている

- **intersectionRect**  
   交差長方形のバウンディングボックス（スクロールバーを除く）
- **rootBounds**  
   ルートのバウンディングボックス（スクロールバーを除く）。

![](/images/スクリーンショット-2021-07-23-10.14.58.png)

## 実際に見てみよう

以下の様なサンプルを作成しました。  
これを使ってプロパティやオプションについて実際に試しつつ、理解を深めたいと思います。

[![Image from Gyazo](/images/3ed4ab25b05fb47ff3c21fbf40ad2665.gif)](https://gyazo.com/3ed4ab25b05fb47ff3c21fbf40ad2665)

### entriesの中身

```
const callback = (entries) => {
  console.log(entries);
};

const observer = new IntersectionObserver(callback);
const target = document.getElementsByTagName("div");　
for (let i = 0; i < target.length; i++) {
  observer.observe(target[i]);
}
```

配列内に15個(target)の`IntersectionObserverEntry`オブジェクトが格納されています

![](/images/スクリーンショット-2022-04-12-20.53.55-1024x280.png)

### entryの中身

次にforEachを使用しひとつずつ取り出し、中身の確認をします。

```
const callback = (entries) => {
 entries.forEach((entry) => {
　　console.log(entry);
　});
};
//省略
```

それぞれの`IntersectionObserverEntry`オブジェクトが確認できます

![](/images/スクリーンショット-2021-07-22-23.28.50-1024x206.png)

### オプションについて

まずは、`isIntersecting`を使用して条件式を書きました。  
`isIntersecting`プロパティはrootとターゲットが交差していればtrueを否であればfalseとなります  
今回の例では、trueであればターゲットにクラスが付与されboxの色が青色からオレンジに変化します。

```
const callback = (entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      entry.target.classList.add('is-observer');
      console.log(entry.isIntersecting);
    }
  });
};
//省略
```

すごく見づらいのですが...  
今の状態だとboxは既にオレンジ色に変わっています(つまり、クラスを付与されている状態)。  
これは、ターゲット(box)とルート(viewport)が交差した瞬間にコールバック関数が実行されているからです。

[![Image from Gyazo](/images/77a05db2fe117bc96ff3cdf01df7b6aa.gif)](https://gyazo.com/77a05db2fe117bc96ff3cdf01df7b6aa)

オプションを使用していきます。

![](/images/const-rect-id.getBoundingClientRect.top-console.logrect-3-1-1024x536.png)

```
const options = {
  threshold: 1
}
```

thresholdはコールバック関数を呼び出したい交差割合を指定できます。  
上記のコードではthreshold: 1としましたが、この場合は要素が完全に見えてから(つまり100％)コールバック関数が実行されます。  
オプションを設定すると↓

[![Image from Gyazo](/images/2ca52a53e641f52754e402e02a91cbda.gif)](https://gyazo.com/2ca52a53e641f52754e402e02a91cbda)

ターゲットが100％ルートと交差してから、コールバック関数が実行されているのがわかります。

また配列で指定することもできます。

```
const options = {
  threshold: [0.5,0.75,1]
}
```

50％、75％、100％のタイミングでコールバック関数が実行されます。

### **intersectionRatio**プロパティ

以下の様なコードで実験を行いました。

```
const callback = (entries) => {
  entries.forEach((entry) => {
    entry.target.style.opacity = entry.intersectionRatio;
    console.log(entry.intersectionRatio);
  });
};
const options = {
  rootMargin: "0px 0px -100px 0px",
  threshold: [0.5,1]
}
//省略
```

まずオプションはrootMargin: "0px 0px -100px 0px",と threshold: \[0.5,1\]を設定しました。  
rootMarginは負の数も設定可能です。この場合は下から100px分rootの範囲を狭めました。  
threshold: \[0.5,1\]でターゲットが50％、100％交差した時にコールバックが実行されます。

コールバック関数の部分は、  
ターゲットのstyle.cssにopacityを追加する記述です。  
値はentry.intersectionRatioで帰ってきた数値をそのままopacityの値にする、というコードです。

この様な動きになります↓

[![Image from Gyazo](/images/3a3a4abc6a15cc51e233ebc7d4be8b2c.gif)](https://gyazo.com/3a3a4abc6a15cc51e233ebc7d4be8b2c)

rootMarginをわかりやすくする為、線を引きました。  
この時点でbox1とbo2はrootと交差していてるので、opacityが1になっています。  
box3はこの時点でのrootとの交差率は0.085000..なのでopacityも0.085になっています。

この様にターゲットとrootとの交差率を取得するのがintersectionRatioです。

![](/images/const-rect-id.getBoundingClientRect.top-console.logrect-4-1-1024x536.png)

---

![](/images/morikenteacher.png)

現在、もりけん塾でJavaScriptを中心に学習をしています！

もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
