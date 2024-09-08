---
title: 'インターネットの仕組み~ブラウザにWebページが表示されるまでの旅~'
date: '2021-08-21'
tags:
  - 'インターネット'
  - 'morikenjuku'
  - '勉強会'
  - '学習記録'
coverImage: 'はじめに-4-1.png'
---

8月21日にもりけん塾で勉強会が行われました！

_**インターネットの仕組み**_**_~ブラウザにWebページが表示されるまでの旅_**_**~**_ というテーマで  
発表をさせて頂きました。

この様な機会を作っていただきありがとうございました。

今回は勉強会で発表した内容をまとめた記事です。  
私が学習し、知り得た範囲での内容なので  
もし誤りがあれば[TwitterのDM](https://twitter.com/sae_prog)等で教えていただけると嬉しいです。

## 経緯とテーマ

「勉強しようと思っていたけどやってなかったこと」をテーマにしました。  
重たい腰を起こすためにも、自ら立候補させて頂きました。

内容に関しては、もりけん先生が以前Twitterで紹介していた  
_フロントエンドエンジニアになるためのロードマップ_ を参考に範囲を決めました。

https://roadmap.sh/frontend

ロードマップの紫色のチェックがついている部分を、優先して学習するのがいいそうです！

## 大まかな流れ

以下の様な流れで進めました

![](/images/はじめに-2-7-1024x632.png)

## #1 Webサイトへアクセスする

今回はアドレスバーにgoogleのURLを入力しアクセスすることを仮定します

![](/images/2-1024x454.png)

## #2 ブラウザはURLの解読を始める

URLに含まれる情報の解読を行います。  
どの方法で？、どのサーバーから？、どのファイル(リソース)を？などの情報がURLには含まれています。

![](/images/はじめに-2-1-1-1024x347.png)

### プロトコル

通信規約、約束事。ネットワークに接続された機械同士が通信する時の共通のルールや手順のこと  
FTP、SMTPなどもプロトコルの一種です。

野球で例えると...

作戦や球種を味方に伝える際、相手チームに伝わらない様に、  
事前に決めたサインを使い味方に伝えます。  
それらのサインも事前にチーム内で共有されているからわかる約束事です。

### HTTP(HyperText Transfer Protocol)

WebクライアントとWebサーバーの通信をする際の決まり事

### IPアドレス・ドメイン名

住所の様なもの。  
ネットワーク上のやり取りには、識別番号としてIPアドレスが利用される。  
IPアドレスは数字の羅列で表記される(例：104.20.37.67)  
IPアドレスは人間が覚えにくく扱いにくい為、ドメインを利用しています。

電話帳で例えると...

IPアドレスはよく電話帳に例えられます。

電話やメールを送る際、相手の電話番号やアドレスを覚えていなくても、  
スマホに登録していれば、アドレスと名前が紐付いている為、登録名を選択すればおのずと連絡ができます。  
この登録名の役割を担っているのがドメイン名で、電話番号やメールアドレスがIPアドレスの様なイメージです。

## #3 DNSでIPアドレスを取得する

ドメイン名をDNSサーバーに投げ掛け、IPアドレスを教えてもらう  
FQDNからIPアドレスを割り出すことを、名前解決といいます。

![](/images/dns01-1024x438.png)

### もう少し詳しく流れを調べました

- **ブラウザとローカルのキャッシュを調べる**

- **DNSキャッシュサーバ(フルサービスリゾルバ\*\***)のキャッシュを調べる\*\*

- **DNSキャッシュサーバはルートサーバーへ問い合わせる**

- **取得したIPアドレスをブラウザに返す**

### DNSキャッシュサーバー

**フルサービスリゾルバ**と呼ばれることもある。  
まず自分のキャッシュを確認し、なければ他のDNSサーバーヘ問い合わせを行うサーバー。

![](/images/dns02-1024x461.png)

### hostsファイル

DNSが誕生する前まで主流で使われていた仕組み。  
ホスト名とIPアドレスの対応表を個々のコンピューターで管理していた。  
インターネットが普及し、ドメイン名も増えた為個々のhostsファイルで管理していくには限界があり  
DNSが名前解決の主流となった。hostsファイルは現在も存在している。

返却されたIPアドレスをもとに、ブラウザはHTTPリクエストを作成。

## #4 HTTPリクエスト / HTTPレスポンス

クライアント(Webブラウザ)からWebサーバーへ送られる要求のことを  
**HTTPリクエスト**、そのリクエストに対する応答を**HTTPレスポンス**という。

### ターミナルで確認してみる

HTTP通信の詳細を出力するコマンド

```
% curl -v https://www.google.com/
```

### HTTPリクエスト

HTTPリクエストは以下の様な構成になっています。  
(左側が構造で、右側が実際のHTTPリクエストです)

![](/images/13-1-1024x437.png)

リクエストラインにはメソッドを使用し、具体的に何を要求するのかを記載します。  
メソッドはGET以外にもPOSTやPUTなど全部で8つあり、それぞれ違う役割を持ちます。

今回はGETを使用しています。GETは指定されたURLの情報を取得するメソッドです。

### HTTPレスポンス

先ほどのリクエストに対しての応答がHTTPレスポンスです。  
(左側が構造で、右側が実際のHTTPレスポンスです)

![](/images/14-2-1024x537.png)

ステータスラインではステータスコードを使用し、要求に対する結果を伝えます。  
今回は200というリクエストが正常に終了したことを意味するコードです。

サーバーから返ってきたレスポンスの中に  
画像やCSSなどのリンクがあるとその度にリクエストを送り必要なデータをもらいます。

404コード

404はよく目にするステータスコードだと思います。  
要求されたリソースが見つからない場合を示します。

## #5 ブラウザレンダリング

サーバーから送られてきたHTMLファイルを解析し、レンダリング処理を行う。  
ブラウザのレンダリング機能をレンダリングエンジンといい、ブラウザごと存在している。

- **HTMLを解析、DOM・CSSOMを構築**

- **レンダリングツリーの構築**

- **レイアウト**

- **ペイント**

### HTMLを解析、DOM・CSSOMを構築

サーバーから送られてきたデータはBytes(バイト)という形式で送られてくる。  
これではHTMLと解釈することができないため解析を行う。

まず、BytesからCharacters(文字)へ変換を行い  
その後Tokens(トークン)と呼ばれる形に変換し、Nodes(ノード)へ変換後、DOMの構築を行う。  
(以下の参考画像をみるとわかりやすい...)

<figure>

![](/images/dom-construction-1024x567-1.png)

<figcaption>

https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model

</figcaption>

</figure>

### Tokens(トークン)

字句解析。  
文字に変換しただけではブラウザエンジンでは意味を持たない為、  
Tokens化を行い、HTMLタグに関する情報やルールを理解するプロセス。

いくつか記事を読んだのですが、あまり理解することができませんでした

### CSSOMを構築

HTMLを解析中にCSSに遭遇したら、CSSの読み込みを開始。  
解析のフローはHTMLの時と同様に行い、  
HTMLと違いCSSは**CSSOM ( CSS Object Model )** を構築する。

#### カスケードダウン

どの様にスタイルを適用していくかのルール。  
対象のノードに当てはまる一般的なスタイルを適用し、  
より具体的なスタイルがあれば上書きし調整する。

親要素から継承したり、個々に指定されたスタイルを適用したりする為  
ツリー構造にしスタイルの決定を行う。

<figure>

![](/images/cssom-tree.png)

<figcaption>

https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model

</figcaption>

</figure>

## レンダリングツリーの構築

DOMとCSSOMを組み合わせ、表示可能な情報を取り込んだ**レンダリングツリー**を構築する。  
表示可能なノードを取り込むため、<head>タグやその子要素などの表示されない要素や、  
CSSでdisplay:none;と指定されたノードもレンダリングの結果に影響しないため、  
レンダリングツリーには含まれない。  
また、visibility: hidden が適用されたノードは、スペースを確保するためにレンダリングツリーに含まれます。

<figure>

![](/images/render-tree-construction-1-1024x478.png)

<figcaption>

https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model

</figcaption>

</figure>

## レイアウト(リフロー)

レンダリングツリーに含まれる各ノードの位置やサイズを決定します。

https://youtu.be/dndeRnzkJDU

## ペイント

画面にコンテンツを表示していく。

### リフローとリペイントが起きる時の例

頻繁にリフローやリペイントが起こることはコストがかかり  
UIの動作に影響することは今までの学習で理解できました。  
実際にどの様な時に発生するのかを幾つかまとめました。

・ノードの追加、削除、更新、移動(アニメーション)

・ノードの非表示  
display: none　はリフローとリペイントの両方が発生する  
visibility: hidden はリペイントのみ発生する

・CSSの調整や、追加

...などが挙げられます。

脱線しましたが、  
これで無事にWebサイトが表示されました。

![](/images/はじめに-3-1-1024x610.png)

## まとめ

とても難しい内容でした...  
書籍や記事によって言葉や説明が微妙に違っていたりするところや  
どの様な処理がされているかのイメージがつきにくいところに苦戦しました。

レンダリングの部分は実装部分に大きく関わることだと思うので  
より深い知識を持つことで、視野を広く持つことができるのでは、と感じました。

こういった学習はなかなか必要に迫られないとやらなかったりするので  
勉強会で発表する機会を頂けて、学習のハードルが下がった様に思います。

今回はJavaScriptのレンダリングまで学習することができなかったので、  
引き続きJavaScriptのレンダリングについて学習をしていこうと思います。

## 参考

\- Frontend Developer Step by step guide  
[https://roadmap.sh/frontend/resources](https://roadmap.sh/frontend/resources)  
\- DNS  
[https://howdns.works/](https://howdns.works/)  
\- DOM構築  
[https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model)  
\- レンダリング  
[https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction)  
[https://developer.mozilla.org/ja/docs/Web/Performance/How_browsers_work#render](https://developer.mozilla.org/ja/docs/Web/Performance/How_browsers_work#render)  
[https://dev.to/gopal1996/understanding-reflow-and-repaint-in-the-browser-1jbg](https://dev.to/gopal1996/understanding-reflow-and-repaint-in-the-browser-1jbg)

\- Webの仕組み  
[https://www.freecodecamp.org/news/how-the-web-works-a-primer-for-newcomers-to-web-development-or-anyone-really-b4584e63585c/#.7l3tokoh1](https://www.freecodecamp.org/news/how-the-web-works-a-primer-for-newcomers-to-web-development-or-anyone-really-b4584e63585c/#.7l3tokoh1)  
[https://github.com/vasanthk/how-web-works#dns-lookup](https://github.com/vasanthk/how-web-works#dns-lookup)  
[https://blog.logrocket.com/how-browser-rendering-works-behind-scenes](https://blog.logrocket.com/how-browser-rendering-works-behind-scenes)/

[イラスト図解式 この一冊で全部わかるWeb技術の基本](https://www.amazon.co.jp/%E3%82%A4%E3%83%A9%E3%82%B9%E3%83%88%E5%9B%B3%E8%A7%A3%E5%BC%8F-%E3%81%93%E3%81%AE%E4%B8%80%E5%86%8A%E3%81%A7%E5%85%A8%E9%83%A8%E3%82%8F%E3%81%8B%E3%82%8BWeb%E6%8A%80%E8%A1%93%E3%81%AE%E5%9F%BA%E6%9C%AC-%E5%B0%8F%E6%9E%97-%E6%81%AD%E5%B9%B3/dp/4797388811)  
[Webを支える技術](https://www.amazon.co.jp/Web%E3%82%92%E6%94%AF%E3%81%88%E3%82%8B%E6%8A%80%E8%A1%93-HTTP%E3%80%81URI%E3%80%81HTML%E3%80%81%E3%81%9D%E3%81%97%E3%81%A6REST-WEB-PRESS-plus/dp/4774142042/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=17Q6OTZPT9NFR&dchild=1&keywords=web%E3%82%92%E6%94%AF%E3%81%88%E3%82%8B%E6%8A%80%E8%A1%93&qid=1629444101&s=books&sprefix=Web%E3%82%92%E3%81%95%2Cstripbooks%2C334&sr=1-1)

---

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
