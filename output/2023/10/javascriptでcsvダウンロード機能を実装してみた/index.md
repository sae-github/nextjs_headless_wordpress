---
title: 'JavaScriptでcsvダウンロード機能を実装した'
date: '2023-10-25'
categories:
  - 'javascript'
---

業務先でJavaScriptでCSVダウンロード機能を実装する機会があり、[BlobAPI](https://developer.mozilla.org/ja/docs/Web/API/Blob)を初めて触った。この記事では、復習を兼ねて調べたことや実装をまとめておく。

## 実装コード

![](/images/image-1024x760.png)

https://stackblitz.com/edit/js-fjwru8?file=index.js

以下の様なcsvファイルがダウンロードできる

![](/images/スクリーンショット-2023-10-25-23.11.33.png)

### エスケープ処理について

値の中に`,`(カンマ)が含まれていた場合、区切り文字として識別されてしまい意図しないCSVになってしまう。それを防ぐためにエスケープ処理をする必要がある。  
値は`""`(ダブルクォーテーション)で囲い、値であることを明示的にした。また値に`""`(ダブルクォーテーション)が含まれていた場合はエスケープするような処理も追加した。

[【JavaScript】CSV 書き出しの際に必要なエスケープ処理と二次元配列→文字列変換の方法](https://qiita.com/ndj/items/c248c5859158f3a85468)

## Blobとは

Binary Large Object。バイトの塊を不透明な形で表したもの。[FileAPI](https://developer.mozilla.org/ja/docs/Web/API/File_API)はBlobインターフェイスを継承している。

> **`Blob`** オブジェクトは blob、すなわち不変の生データであるファイルのようなオブジェクトを表します
>
> https://developer.mozilla.org/ja/docs/Web/API/Blob

バイナリーデータを保持する様な役割を持つ。ブラウザがバイナリデータを内部的に保持する

[Blob](https://developer.mozilla.org/ja/docs/Web/API/Blob)オブジェクトは、データソースとオプション情報から生成する。オプションにはコンテンツタイプ([MIME](https://developer.mozilla.org/ja/docs/Web/HTTP/Basics_of_HTTP/MIME_types))を指定したりする。

```
const blob = new Blob(array, options)
```

- [MDN Blob](https://developer.mozilla.org/ja/docs/Web/API/Blob)

### Blob URL

[Blob](https://developer.mozilla.org/ja/docs/Web/API/Blob)はURLを使用して参照することができ、[URL.createObjectURL()](https://developer.mozilla.org/ja/docs/Web/API/URL/createObjectURL_static)を使用して生成できる。[Blob](https://developer.mozilla.org/ja/docs/Web/API/Blob)のURLは`Blob://`から始まる。[URL.createObjectURL()](https://developer.mozilla.org/ja/docs/Web/API/URL/createObjectURL_static) はパラメータで指定されたオブジェクトを表す文字列を作成する。

## BOMとは

byte order mark。通称DOM。csvファイルがExcelで文字化けしないように文字コードをBOM付きにする必要がある。

> プログラムがテキストデータを読み込む時、その先頭の数バイトからそのデータがUnicodeで表現されていること、また符号化形式（[エンコーディング](https://ja.wikipedia.org/wiki/%E3%82%A8%E3%83%B3%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0)）としてどれを使用しているかを判別できるようにしたものである。[\[1\]](https://ja.wikipedia.org/wiki/%E3%83%90%E3%82%A4%E3%83%88%E9%A0%86%E3%83%9E%E3%83%BC%E3%82%AF#cite_note-1)
>
> https://ja.wikipedia.org/wiki/%E3%83%90%E3%82%A4%E3%83%88%E9%A0%86%E3%83%9E%E3%83%BC%E3%82%AF

UTF-8の場合は0xEF 0xBB 0xBFを先頭につける必要がある。

```
const bom = Uint8Array([0xEF,0xBB,0xBF])
```

### Unicodeとは

> Unicode とは、世界の様々な言語、書式、記号に、番号を割り当てて定義した標準の[文字コード](https://developer.mozilla.org/ja/docs/Glossary/Character_set) です。一つ一つの[文字](https://developer.mozilla.org/ja/docs/Glossary/Character) に番号を割り当てることで、プログラマーは、どの言語が混ざっていても、コンピューターに保存、処理、伝送させるような[文字エンコーディング](https://developer.mozilla.org/ja/docs/Glossary/Character_encoding)を同じファイルやプログラムの中に作ることができます。
>
> https://developer.mozilla.org/ja/docs/Glossary/Unicode

文字コードとは、0と1の2進数しか扱えないコンピューターで文字を扱うためのに文字に対して割り振られた番号(ビット列)との関係をいう。(UTF-8やShift_JISなどがこれに当たる)

![](/images/Tips-1-1024x576.jpg)

### 符号化文字集合と文字符号化方式

文字とU+から始まる文字列の対応関係が符号化文字集合でこの例だとUnicodeとなる。  
文字集合をバイト表現に変換する方式が文字符号化方式。これがUTF-8などにあたる。

![](/images/Tips-2-1-1024x576.jpg)

## Uint8Array

> **`Uint8Array`** は型付き配列で、 8 ビット符号なし整数値の配列を表します
>
> https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global\_Objects/Uint8Array

## まとめ

今回はJavaScriptで自前CSVダウンロード機能を実装した。出力する値が動的な値の場合、考慮するべきことが結構ありそうでライブラリとか使用する方が無難なのかなとか思った。

## 参考

- [BOMやBlobを理解してJavaScriptでCSVを出力する](https://qiita.com/megadreams14/items/b4521308d5be65f0c544)

- [THE BLOB OBJECT](https://flaviocopes.com/blob/?source=post_page-----20c372dfca00--------------------------------)

- [What are Blobs used for in JavaScript?](https://javascript.plainenglish.io/javascript-blob-why-is-it-useful-20c372dfca00)

- [JavaScriptによるファイルとバイナリデータの扱い](https://amaraimusi.sakura.ne.jp/note_prg/JavaScript/file_binary.html#s130)

- [unicodeとは？文字コードとは？UTF-8とは？](https://qiita.com/hiroyuki_mrp/items/f0b497394f3a5d8a8395)

- [新人さんに知ってほしい「文字コードのお話」](https://qiita.com/yuji38kwmt/items/b3a7820b4d3b544da4ff)

- [【図解】【3分解説】UnicodeとUTF-8の違い！【今さら聞けない】](https://qiita.com/omiita/items/50814037af2fd8b2b21e)
