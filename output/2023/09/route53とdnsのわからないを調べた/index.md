---
title: "Route53とDNSのわからないを調べた"
date: "2023-09-26"
---

当ブログをWordpressからheadlessCMS化/Next.jsに移行した際、インフラ周りでだいぶ苦戦したので復習がてら調べたことを残す。  
ちなみに今回のドメインは新たに取得したものではなくXserverのドメインサービスですでに所有していたドメインのサブドメインを使用し、AWSのRoute53でドメインの管理ができる様にした。

参考：[Amplify にデプロイしたアプリケーションをサブドメインで運用する](https://qiita.com/aburasoba/items/2c8d992b051e87565951)

## Route53

AWSが提供するDNSウェブサービス

[Amazon Route53](https://aws.amazon.com/jp/route53/)

Route53は国道53号線。53はTCP/IP通信でDNSが使用するポート番号のこと。

## DNSとは

Domain Name System

ドメイン名とIPアドレスの関係を管理する電話帳のようなシステム(DNSサーバー)のこと。  
DNSサーバーに対象のドメインのIPアドレスを問い合わせることを名前解決という。  
1つのドメインに対して複数のIPアドレスを対応づけることも可能。

DNS とは

> インターネットの DNS システムはいわば電話帳のようなもので、名前と番号のマッピングが管理されています。DNS サーバーはドメイン名を IP アドレスに変換することで、エンドユーザーがウェブブラウザにドメイン名を入力した際、どのサーバーにつながるかを管理します。このリクエストは、**クエリ**と呼ばれます。
> 
> https://aws.amazon.com/jp/route53/what-is-dns/

### キャッシュDNSサーバー

聞かれたドメイン名のIPアドレスを該当する権威サーバーに問い合わせ応答するサーバー。  
また問い合わせた結果を一定期間キャッシュするサーバー。Route53ではリゾルバーと呼んでいる。フルサービスリゾルバと呼ばれることもある。  
キャッシュする期間はTTL(Time To Live)で設定できる。[Amazon Route 53 DNS のベストプラクティス](https://docs.aws.amazon.com/ja_jp/Route53/latest/DeveloperGuide/best-practices-dns.html)ではTTL 値の推奨範囲は 60 ～ 172,800 秒と記載があった。  
TTLが短いとより頻繁にクエリを実行する必要がありコストが増大する。またTTLを長くするとキャッシュから応答されるため高速。場合によってはセキュアになる。  
新しくレコードを追加した場合などは一時的にTTLを短くすることも可能。

<figure>

![](/images/スクリーンショット-2023-09-26-8.52.25-1024x521.png)

<figcaption>

Route53＞ホストゾーン

</figcaption>

</figure>

### 権威DNSサーバー

ドメインとIPアドレスの紐付け(ゾーン)が情報として保持されていて、自身が管理する情報のみを応答するサーバー。Route53ではホストゾーンと呼んでいる。ネームサーバーと呼ばれるケースもある。

ドメインは階層を持つ。各ゾーンを管理しているのが権威サーバー。

![](/images/名称未設定ファイル.drawio-1-1.png)

## DNSレコード

ドメインに関連付くIPアドレスやドメインに対するリクエストを処理する方法などが書かれた台帳(ゾーンファイル)の一行一行をDNSレコードという。TTLもここに記載されている。  
権威サーバーの管轄ゾーン内で管理している。以下使用したレコードについてまとめておく。

### Aレコード

ドメイン名に対応するIPアドレス(IPv4)が書かれたレコード。

### CNAME

ドメイン名に別名を定義するレコード。

### MXレコード

対象のドメイン宛のメール配送先(メールサーバー)を定義するレコード。

#### 定義方法について

MXレコードを登録する際には優先度をつける必要があるので注意。  
それを知らず、`MXRRDATANotTwoFields (MX record doesn't have 2 fields) encountered with ‘*.com*'')`と怒られて地味に詰まった。  
レコードの作成画面にも丁寧に記載があった

![](/images/スクリーンショット-2023-09-26-23.45.40-1024x658.png)

### NSレコード

ゾーン情報を管理するネームサーバー(権威DNSサーバー)のサーバー名を定義するレコード。そのドメインのことなら◯◯サーバーに聞いて！っていう時に必要な情報。  
Route53でパブリックホストゾーンを作成すると自動的に作成してくれる

### SOA

Start of Authority (SOA)。ドメインに関する管理情報を定義するレコード。

Route53でパブリックホストゾーンを作成すると自動的に作成してくれる

### TXT

ドメインに関する追加情報や任意の情報をテキスト形式で含めることができるレコード。

[Amazon Route 53 がパブリックホストゾーンに作成する NS レコードと SOA レコード](https://docs.aws.amazon.com/ja_jp/Route53/latest/DeveloperGuide/SOA-NSrecords.html)

## レジストリ

> レジストリとは、世界中で使われている「.com」や「.net」「.jp」などのトップレベルドメイン毎に1つのみ存在する一番上位の機関をいいます。
> 
> https://www.nadukete.net/domain-guide/setting/registry-registrar.html

ドメインのデータベースを管理している。

## レジストラ

ドメインを登録すること。レジストリに対して新たにドメインを登録する権限をもつ事業者。

Route53では独自ドメインを取得、管理する機能をもつ(=レジストラ)

## 詰まったこと

Cromeからアクセスすると`この接続ではプライバシーが保護されません`とでる問題が発生。  
\=> 原因はMXレコードの登録がされていなかったからだった。

> ドメインが E メールを受信するように設定されていることを確認します。ACM のメールサーバーが ドメイン検証 E メールの送信先を特定できるように、ドメインのネームサーバーにメールエクスチェンジャレコード (MX) を保持していることが必要です。
> 
> [証明書のリクエストの失敗 - AWS Certificate Manager](https://docs.aws.amazon.com/ja_jp/acm/latest/userguide/troubleshooting-failed.html)

またMXレコードを追加後も、暫く反映されずで詰まった。結果、TTLが3600になっていたからだった。

## 参考

- [Amazon Route 53をやさしくおさらい](https://speakerdeck.com/minorun365/amazon-route-53woyasasikuosarai)

- [レジストリとレジストラ](https://www.nadukete.net/domain-guide/setting/registry-registrar.html)

- [Amazon Route 53 DNS のベストプラクティス](https://docs.aws.amazon.com/ja_jp/Route53/latest/DeveloperGuide/best-practices-dns.html)

- [DNSって何？DNSレコードって？イチから理解しよう！](https://remacre.jp/column/homepage/8786/)

- [【初心者向け】DNSってなに？](https://blog.serverworks.co.jp/2021/12/14/150225)
