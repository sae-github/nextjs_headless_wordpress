---
title: '【もりけん塾】#JS課題1・2'
date: '2021-08-01'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'morikenjuku'
coverImage: '印刷しやすい-シンプルなフォルダー-ラベル-8-1.png'
---

もりけん先生が作成された、  
「[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/kenmori/handsonFrontend/blob/69270d01cbb74bc06ff3b459484034f4ffc530aa/work/markup/1.md)」に取り組みました。

課題1、課題2はJavascriptで要素を生成・加工しHTMLへ追加する内容です

## 課題1

このDOMをhtml内のulの中に差し込んでください

```
<li>これです</li>
```

## 課題2

このDOMをJavaScriptでつくり、html内のulの中に差し込んでください

```
<li>
  <a href="1.html"><img src="bookmark.png" alt="ブックマーク" />これです</a>
</li>
```

## テキストの取得 / 設定

要素の配下のテキストを 取得 / 設定 するには、innerHTMLとtextContentを利用します。

以下のHTMLを例にinnerHTMLとtextContentの違いを見ます。

<div>の配下にテキストを設定します。

```
  <div id="js-test">
    <p></p>
  </div>
```

### textContent

```
  const test = document.getElementById('js-test');
  test.textContent = '<a href="#">これはtextContentで設定したテキストです</a>';
```

textContentはテキストとして埋め込むので<a>タグも表示されています。

![](/images/スクリーンショット-2021-07-31-20.57.44.png)

> ノードの `textContent` を設定すると、そのノードの*すべて*の子が取り除かれて、指定された値をもつ単一のテキストノードに置き換わります。
>
> https://developer.mozilla.org/ja/docs/Web/API/Node/textContent

### innerHTML

```
const test = document.getElementById('js-test');
test.innerHTML = '<a href="#">これはtextContentで設定したテキストです</a>';
```

ブラウザで確認すると、divの中にテキストが設定されました。  
innerHTMLはテキストをHTML文字列として扱います。

![](/images/スクリーンショット-2021-07-31-21.01.36.png)

以下の引用にある通り、HTMLを解析し、指定したノードに書き換えるので、  
HTML文字列でない場合はtextContentを使用するのがパフォーマンス的には良いそうです。

> `innerHTML` に値を設定すると、要素のすべての子孫を削除して、 htmlString の文字列で与えられた HTML を解析して構築されたノードに置き換えます。
>
> https://developer.mozilla.org/ja/docs/Web/API/Element/innerHTML

・innerHTMLとtextContentで設定されるテキストは、  
指定した要素の配下に設定されるため、もともと配下にあった要素は残らない

・HTML文字列ではなくテキストを埋め込みたい場合はtextContentを優先する

---

### createElement

createElementを利用しノードを追加することができます。  
生成された要素ノードは、どこにも階層関係を持っていない状態です。

```
document.createElement(要素名)      // 要素ノードを生成
document.createTextNode(テキスト) // テキストノードを生成
document.createAttribute(属性名)   // 属性ノードを生成
```

このように生成したノードをドキュメントに追加します。  
appendChildメソッドは指定した要素の最後の子要素として生成したノードを追加します。

```
elem.appendChild(node)
```

一番初めの例を実装してみます。

```
　　　const test = document.getElementById('js-test');
　　　　// <a>要素を生成
    const anchor = document.createElement('a');
　　　//  href属性を生成
    const href = document.createAttribute('href');
    // hrefの属性ノードを生成
    href.value = '#';
   // <a>要素に属性ノードを配置
    anchor.setAttributeNode(href);
　　　//　　テキストノードを生成
    const text = document.createTextNode('これはcreateTextNodeで設定したテキストです');
　　　　// id="js-test"の配下に<a>要素を配置
    test.appendChild(anchor);
　　　// <a>要素の配下にテキストノードを配置
    anchor.appendChild(text)
```

要素ノードを追加する部分を見ていきます。

```
　　　 const anchor = document.createElement('a');
　　　　const href = document.createAttribute('href');
    href.value = '#';
    anchor.setAttributeNode(href);
```

以下のコードでも同じ結果になります。

```
　　　　const anchor = document.createElement('a');
    anchor.href = '#';
```

createAttributeに関しては、本格入門にこのように書いてありました。

> 属性名を文字列で指定できることから、「スクリプトから動的に属性名を変更できる」というメリットがあり。より汎用的なコードを記述する場合には利用することもあります。
>
> JavaScript本格入門

https://www.javascripttutorial.net/javascript-dom/javascript-innerhtml-vs-createelement/

### insertAdjacentElement()

こちらは[もなかさん](https://twitter.com/ruby443n)にレビューを頂いた際に、教えて頂いたメソッドです。

> インターフェイスの**`insertAdjacentElement()`**メソッドは、 [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element)呼び出された要素に対して特定の位置に特定の要素ノードを挿入します。
>
> https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement

こちらを例に、実装し直します。

<div>の子要素に<a>タグ、テキストを追加します。

```
  <div id="js-test">
  </div>
```

```
　　　 const test = document.getElementById('js-test');
    const anchor = document.createElement('a');
    anchor.href = '#';
    anchor.textContent = 'これはinsertAdjacentElementで設定したテキストです';
    test.insertAdjacentElement('afterbegin',anchor);
```

insertAdjacentElementにはプロパティがあり、プロパティを使用して特定の位置へと追加します。

<table><tbody><tr><td><strong>beforebegin</strong></td><td>指定した要素の直前に挿入</td></tr><tr><td><strong>afterbegin</strong></td><td><meta charset="utf-8">指定した要素の、最初の子要素の前に挿入</td></tr><tr><td><strong>beforeend</strong></td><td><meta charset="utf-8">指定した要素の、最後の子要素の後に挿入</td></tr><tr><td><strong>afterend</strong></td><td><meta charset="utf-8">指定した要素の直後に挿入</td></tr></tbody></table>

https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement

### insertAdjacentHTML()

> `insertAdjacentHTML()` は、第二引数で指定するテキストを HTML または XML としてパースし、その結果であるノードを DOM ツリー内の指定された位置（第一引数で指定）に挿入します。
>
> これは挿入先の要素を再度パースするものではないため、既存の要素や要素内部の破壊を伴いません。余分なシリアル化のステップを回避できる分、 `innerHTML` への代入による直接的な操作よりもはるかに高速な動作となります。
>
> https://developer.mozilla.org/ja/docs/Web/API/Element/insertAdjacentHTML

先程と同じ例を使用して実装し直します。

insertAdjacentElementと同じくプロパティを使用し、追加したい位置を指定します。

```
    const test = document.getElementById('js-test');
    const anchor = document.createElement('a');
    anchor.href = '#';
    test.appendChild(anchor);
    anchor.insertAdjacentHTML('beforeend','これはinsertAdjacentHTMLで設定したテキストです');

```

テキストをHTML文書として変換するので以下でも、同じ様に実装できました。

```
    const test = document.getElementById('js-test');
    test.insertAdjacentHTML('beforeend','<a href="#">これはinsertAdjacentHTMLで設定したテキストです</a>');
```

https://developer.mozilla.org/ja/docs/Web/API/Element/insertAdjacentHTML

今回のまとめは以上です。

レビューをしてくれた[もりけん先生](https://twitter.com/terrace_tech)・[もなかさん](https://twitter.com/ruby443n)...  
ありがとうございました！

---

![](/images/morikenteacher.png)

現在、もりけん塾でJavaScriptを中心に学習をしています！

もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
