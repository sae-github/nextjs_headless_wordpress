---
title: "【もりけん塾】viteハンズオン勉強会"
date: "2021-09-01"
tags: 
  - "javascript"
  - "vite"
  - "プログラミング"
  - "morikenjuku"
  - "勉強会"
  - "学習記録"
coverImage: "印刷しやすい-シンプルなフォルダー-ラベル-9-1.png"
---

8月22日にもりけん塾でviteハンズオン勉強会がありました！  
もりけん先生が作成してくれた資料を元に、環境構築からGitHubにデプロイまでを行いました。  
今回はその学習記録です。

https://twitter.com/terrace\_tech/status/1429250380378955784?s=20

https://terracetech.jp/2021/08/22/benkyoukai-5/

## viteとは

Vueの作成者が作ったフロントエンドビルドツール。  
viteはヴィートと読み、フランス語で「速い」を意味する。  
とりあえず超高速！  
これから来るであろう、**ネクストブレイクフロントエンドビルドツール！！！！**

https://vitejs.dev/

### 特徴

> Vite.js pre-bundles the [dependencies](https://vitejs.dev/guide/dep-pre-bundling.html) with `esbuild` 10 to 100 times faster than JavaScript-based bundlers. It serves the source code over [native ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) and lets the browser do the job of bundler. It only transforms the source code on demand whenever the browser requests it. Then, it bundles the code with [Rollup](https://rollupjs.org/) for production.
> 
> //DeepL使用  
> Vite.jsは、JavaScriptベースのバンドルラーよりも10～100倍高速にesbuildで依存関係を事前にバンドルします。Vite.jsはソースコードをネイティブのESMで提供し、ブラウザにバンドルラーの仕事をさせます。ブラウザがソースコードを要求したときだけ、必要に応じてソースコードを変換します。その後、Rollupでコードをバンドルして本番に臨みます。
> 
> https://medium.com/habilelabs/introducing-vite-js-an-opinionated-frontend-build-tool-484385701245

https://medium.com/habilelabs/introducing-vite-js-an-opinionated-frontend-build-tool-484385701245

https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules#introducing\_an\_example

以下のリンク先では、  
ビルドツールの満足度や関心、実際に使用されている率を見ることができます。  
ビルドツールの多さと、入れ替わりの早さに驚きました。

https://2020.stateofjs.com/en-US/technologies/build-tools/

## 導入

もりけん先生が作成した資料と公式ドキュメントを見ながら導入を行いました。

https://github.com/kenmori/handsonFrontend/blob/master/vite/Work.md

### インストール

```
% npm init @vitejs/app
```

### ディレクトリが生成

```
// プロジェクトネーム(デフォルトはvite-project)
? Project name: ›　  

//テンプレートの選択
? Select a framework: › - Use arrow-keys. Return to submit.　
❯   vanilla
    vue
    react
    preact
    lit-element
    svelte

? Select a variant: › - Use arrow-keys. Return to submit.
❯   vanilla
    vanilla-ts
```

#### ディレクトリ内を見る

![](/images/スクリーンショット-2021-08-25-0.12.48.png)

### npm i

package-lock.jsonとnode\_modulesが生成

```
% npm i
```

### 実行

npm run <スクリプト名>で実行

```
"scripts": {　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
   "dev": "vite",                  // 開発用サーバーが起動
   "build": "vite build",　　　　　　　　　　　　　　　　　　// distフォルダーが生成
   "serve": "vite preview"　　　　　　　　　　　　//  distフォルダー内を反映したサーバー起動
},
```

### sassも追加してみる

```
npm install -D sass
```

style.cssの拡張子を.scssへ変更し、HTMLで読み込むだけでCSSへコンパイルできました。

```
<link rel="stylesheet" href="./style.scss">
```

ファイル分割もできました  
style.scssで読み込みたいファイルをimportしました。

```
@import './sass/_test';
```

## デプロイする

GitHubPageへデプロイを行いました。  
(もりけん先生が作成した資料を元に復習をしました)

ローカルでgit initし、git commit まで行いました  
GitHubにリモートリポジトリを作成し、以下をコピペしました

![](/images/スクリーンショット-2021-08-31-21.20.11-1024x132.png)

これでリモートリポジトリへ反映できました

### deploy.shを作成

```
#!/usr/bin/env sh

# エラー時は停止
set -e

# ビルド
npm run build

# ビルド出力ディレクトリに移動
cd dist

# カスタムドメインにデプロイする場合
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# https://<USERNAME>.github.io にデプロイする場合
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# https://<USERNAME>.github.io/<REPO> にデプロイする場合
git push -f git@github.com:sae-github/vite-project master:gh-pages

cd -
```

### vite.config.js 作成

カスタマイズを行うファイル。  
defineConfig を使用すると補完を行ってくれる。

```
import { defineConfig } from 'vite'

export default defineConfig({
   base: "/vite-project/" //こちらはgithubで作ったリポジトリ名です
})
﻿
```

他にもオプションがいくつもありました

#### 脱線：開発用と本番用でディレクトリをわける

build.outDirは出力ディレクトリ(rootに対して)を指定することができます

```
export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist'
  }
})
```

これで実行してみると、srcディレクトリ(開発用)とdist(本番用)でわけることができました↓

![](/images/スクリーンショット-2021-09-01-11.37.02-1.png)

https://vitejs.dev/config/#config-file

### 実行

```
sh deploy.sh
```

GitHubを確認すると、gh-pagesブランチが確認できます。

![](/images/スクリーンショット-2021-08-31-19.17.15-1.png)

index.htmlとassetsフォルダが反映されました

![](/images/スクリーンショット-2021-08-31-19.18.58-1024x247.png)

Settings→Pages→URLをクリック

![](/images/スクリーンショット-2021-08-31-19.34.05-1024x525.png)

デプロイできました！

![](/images/スクリーンショット-2021-08-31-21.35.51.png)

## まとめ

もりけん先生が作成してくれた資料を見ながら、  
環境構築からGitHub Pagesへデプロイ までを行いました。

また一つ新しいことに触れることができました。  
こんな機会がなければ、viteを知る日はずっと先だった気がします...

ありがとうございました。

* * *

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
