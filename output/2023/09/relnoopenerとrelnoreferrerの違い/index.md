---
title: 'rel=”noopener”とrel=”noreferrer”の違い'
date: '2023-09-10'
---

## 概要

aタグに`ref=noopener`を指定するとESLintで怒られたので改めて設定と、`noopener`と`noreferrer`の違いをまとめておく。

![](/images/IMG_0581-1024x152.png)

## ESLint

[Disallow `target="_blank"` attribute without `rel="noreferrer"`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md)

### ルールの詳細

> This rule aims to prevent user generated link hrefs and form actions from creating security vulnerabilities by requiring `rel='noreferrer'` for external link hrefs and form actions, and optionally any dynamically generated link hrefs and form actions.
>
> DeepL) このルールは、外部リンクとフォームアクション、およびオプションで動的に生成されるリンクとフォームアクションに rel='noreferrer' を要求することで、ユーザが生成したリンク href とフォームアクションがセキュリティの脆弱性を生み出すのを防ぐことを目的としています。
>
> https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md

現在の主要ブラウザでは自動的に`ref=noopener`が設定されているためIE等のレガシーブラウザのサポートが必要ない場合はこの設定は**不要**になる。

また外部リンク先が安全だと保証されている場合や、分析等で使用したい場合は設定で`allowReferrer`を`true`にすることで`noreferre`を必須としない設定にできる。

## そもそもrefの設定はなぜ必要か

`target=_blank`を使用して別サイトのページへアクセスした場合下記の問題が発生するリスクがある。

- セキュリティの問題

- サイトパフォーマンスの問題

### セキュリティの問題

window.openerを使用して遷移元のwindowオブジェクトにアクセスし悪意のある行為をされる可能性がある

例えば、遷移先で悪意のあるJavaScriptソースが仕込まれていて、元ページに似せたフィッシングサイトにリダイレクトさせたり...など

### サイトパフォーマンスの問題

遷移先ページでも遷移元のページと同じプロセスでリソースが実行される場合があり、不要なJavaScriptなどが実行されパフォーマンスの低下を可能性がある

#### 参考

- [Links to cross-origin destinations are unsafe](https://developer.chrome.com/en/docs/lighthouse/best-practices/external-anchors-use-rel-noopener/)

## noopenerとnoreferrerの違い

### noopener

- 遷移先で元のサイト(遷移元)の`window.opener`へのアクセスを許可しない(nullを返す)

- HTTPのRefererヘッダーは提供される

- 古いブラウザではサポートされていない(ref: [Can I use](https://caniuse.com/?search=noopener))

仕様書 : [4.6.7.13 Link type "`noopener`"](https://html.spec.whatwg.org/multipage/links.html#link-type-noopener)

### noreferrer

- `noopener`の作用と同様

- 参照先でHTTPのRefererヘッダーを省略し(referer)情報を渡さない様にブラウザに指示する

仕様書 : [4.6.7.14 Link type "noreferrer"](https://html.spec.whatwg.org/multipage/links.html#link-type-noreferrer)

#### Refererとは

> **`Referer`** リクエストヘッダーには、現在リクエストされているページへのリンク先を持った直前のウェブページのアドレスが含まれています。 `Referer` ヘッダーにより、サーバーは人々がどこから訪問しに来たかを識別し、分析、ログ、キャッシュの最適化などに利用することができます。
>
> https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Referer

##### 参考

- [Referrer を制御する](https://qiita.com/wakaba@github/items/707d72f97f2862cd8000)
