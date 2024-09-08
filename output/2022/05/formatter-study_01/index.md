---
title: 'Formatterについての学習記録(Stylelint/ESLint/Prettier)'
date: '2022-05-16'
categories:
  - 'css'
  - 'javascript'
tags:
  - 'css'
  - 'javascript'
  - 'プログラミング'
  - '学習記録'
coverImage: 'Twitter-post-16.png'
---

![管理人](//images/43D8A608-67A3-48E2-9600-EFFAEB7E218E_1_201_a-150x150.jpeg)

管理人

こんにちは、さえと申します👩‍💻  
フロントエンドエンジニアになるために 日々勉強をしています  
このブログは その勉強の記録と アウトプットのために運営をしています✨

この記事はFormmaterについて調べたことや、よく詰まる部分をまとめた記事です  
**[Stylelint](https://stylelint.io/)**、**[ESLint](https://eslint.org/)**、**[Prettier](https://prettier.io/)**のインストール・設定をおこない  
3つを併用してプロジェクトの管理ができるようにセットアップをしてみました

## Stylelint

https://stylelint.io/

### ①インストール

stylelint本体と設定をインストールする  
今回は`SCSS`に対してStylelintを使用したいので [_stylelint-config-standard-scss_](https://github.com/stylelint-scss/stylelint-config-standard-scss)をインストール

```
% npm install --save-dev stylelint stylelint-config-recommended-scss
```

### ②.stylelintrc.jsonの作成

`.stylelintrc.json`を作成し、ファイル内に設定を記述する

```
{
  "extends":"stylelint-config-recommended-scss"
}
```

### ③実行

```
% npx stylelint **/*.scss(or css,sass...)
```

### 自動修正

`--fix`をつけて実行すると、自動で修正をしてくれる  
自動修正されるのは全てではなく、一部のみ。自動で修正されないエラーに関しては手動で修正する必要がある

```
% npx stylelint **/*.scss(or css,sass...) --fix
```

package.jsonの`scripts`へ追加し、任意のコマンドで実行できる様にしておくと良き

```
"scripts": {
  "stylelint": "npx stylelint '*.scss'",
  "stylelint:fix": "npx stylelint '*.scss' --fix"
}
```

```
% npm run stylelint
```

### 入れ子にできる最大数を設定する

_[max-nesting-depth](https://stylelint.io/user-guide/rules/list/max-nesting-depth)_ を使用し、入れ子で記述できる最大数を設定

```
"rules": {
  "max-nesting-depth":2
}
```

以下のSCSSファイルへlinterを実行してみる

```
.item {
  color: red;

  .a {
    font-size: 120px;

    .b {
      color: #333;

      .c {
        background-size: contain;
      }
    }
  }
}
```

```
% npm run stylelint

> npx stylelint '*.scss'


style.scss
 10:7  ✖  Expected nesting depth to be no more than 2  max-nesting-depth
```

`Expected nesting depth to be no more than 2 max-nesting-depth`  
エラー箇所とエラーの内容が表示された

### よく怒られるエラーについて...

私がよくStylelintに怒られることをまとめておく

・`**[no-descending-sp](https://stylelint.io/user-guide/rules/list/no-descending-specificity/)**``**[ecificity](https://stylelint.io/user-guide/rules/list/no-descending-specificity/)**`

詳細度が低いセレクタが詳細度の高いセレクタの後に記述されいる場合に起こるエラー  
私がよくやりがちで怒られるのは以下のようなパターン

```
.item {
  color: red;

  &:hover + .aaa {
    background-color: red;
  }
}

.aaa {
  display: flex;
}
```

この状態でstylelintを走らせると...  
`Expected selector ".aaa" to come before selector ".item:hover + .aaa" no-descending-specificity` と怒られる

以下のように書くことが求められる

```
.item {
  color: red;
}

.aaa {
  display: flex;
}

.item:hover + .aaa {
  background-color: red;
}
```

stylelintを導入するまでは意識して書いてなかった...  
この設定の必要性についてはドキュメントに書かれています

> The clashes of these two mechanisms for prioritization, source order and specificity, can cause some confusion when reading stylesheets. If a selector with higher specificity comes before the selector it overrides, we have to think harder to understand it, because it violates the source order expectation. Stylesheets are most legible when overriding selectors always come after the selectors they override. That way both mechanisms, source order and specificity, work together nicely.  
> DeepL訳)  
> ソース順と特異性という2つの優先順位付けのメカニズムが衝突すると、スタイルシートを読むときに混乱が生じることがあります。より高い特異性を持つセレクタが、それがオーバーライドするセレクタの前に来る場合、それを理解するために、より難しく考えなければならないのです、それはソース・オーダーの期待に反するからです。スタイルシートが最も読みやすいのは、オーバーライドするセレクタが常にオーバーライドするセレクタの後にある場合です。そうすることで、ソース・オーダーと特異性の両方のメカニズムがうまく機能するようになります。
>
> https://stylelint.io/user-guide/rules/list/no-descending-specificity

こちらを読んでかなり納得しました。実装の迷いや、スタイルのカスケードで悩むことを事前に減らすことは重要なことであると学びました。

・`**[selector-class-pattern](https://stylelint.io/user-guide/rules/list/selector-class-pattern/)**`

どのようなクラス名を許可するか正規表現で設定されていて、それに反した場合はエラーとなる  
今回使用している [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)の場合は、以下のような設定になっています

```
'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected class selector to be kebab-case',
      },
  ]
```

kebab-caseで指定されたclass名以外は弾かれるような設定になっています  
仮にBEMでCSSを書いていた場合は、ネストして記述する必要があり、  
反対に`__`を使用したelementでクラス名を指定することはエラーとなる

```
.hogehoge {
  color: red;

  // OK
  &__list {
    background-color: red;
  }
}

// NG
.hogehoge__item {
  background-color: red;
}
```

### 個別で設定をOFFにしたい

プロジェクトによって設定を変えたい場合がある。  
その場合は完全にカスタマイズするか、既存の設定を使用しそれを拡張していく必要がある

個別にルールをOFFしたい場合

```
"rules": {
  "selector-class-pattern": null
}
```

## eslint

https://eslint.org/docs/user-guide/configuring/

### ①インストール

```
% npm install eslint --save-dev
```

### ②configファイルの生成

```
% npm init @eslint/config
```

何だか色々聞かれるので答えると 設定が記述された`.eslintrc`ファイルが生成される  
デフォルトで生成された内容をみていく

```
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    }
}
```

\- `**env**`  
検証の環境条件  
指定された環境であらかじめ定義されたグローバル変数を提供してくれる  
\- `**extends**`  
共有の設定。パッケージをインストールして指定することもできる。  
デフォルトではESLintの標準のもので、[Rules](https://eslint.org/docs/rules/)チェックマークの付いているルールが有効となる。また、ここに記述したルール間で設定が重複している場合は後ろに記述されたルールが優先される

\- `**parser**`  
使用するパーサーの指定  
\- `**parserOptions**`  
パーサーに関する設定  
ecmaVersionをlatestにすると最新のサポートのバージョンにしてくれる

\- `plugins`

任意のプラグインの設定  
\- **`rules`**  
プロジェクトが使用するルールの設定について

### 実行

```
% npx eslint *.js
```

### 自動修正

Stylelintと同様に--fixをつけることで自動で補完修正をしてくれる(こちらも全てではない)

```
% npx eslint *.js --fix
```

### ルールの設定

`.eslintrc.js`の`rules`内でプロジェクトのルールを設定する  
値へはエラーレベルと各ルールが持っているオプションを指定する  
値を2つ以上指定する場合は配列にする  
エラーレベルは`"off"`、`"warn"`、`"error"`の3つ

#### **クォーテーションマーク**

- [quotes](https://eslint.org/docs/rules/quotes)

```
"rules": {
  "quotes": ["error","single"]
}
```

#### セミコロン

- [semi](https://eslint.org/docs/rules/semi)  
   セミコロンがついていなかった場合エラーが出るように設定

```
"rules": {
  "semi": "error",
}
```

## Prettier

https://prettier.io/

### ①インストール

```
% npm i --save-dev --save-exact prettier
```

### ②`.prettierrc.json`の作成

```
{
  "tabWidth": 2,
  "singleQuote": true
}
```

#### よく使いそうな設定

- **[printWidth](https://prettier.io/docs/en/options.html#print-width)**  
   一行の最長文字数。指定した文字数を超えると折り返す(デフォルトは80)

- **[tabWidth](https://prettier.io/docs/en/options.html#tab-width)**  
   インデントのスペース数についての設定(デフォルトは2)

- [**quotes**](https://prettier.io/docs/en/options.html#quotes)  
   `singleQuote`をtrueにするとシングルクォートに設定できる(デフォルトはダブルクォート)

- **[semi](https://prettier.io/docs/en/options.html#quotes)**  
   末尾にセミコロンを付ける(デフォルトはtrue)

#### `.prettierignore`ファイルの作成

`.prettierignore`を作成し、フォーマットさせたくないファイルを指定する  
デフォルトでは`.git`/`.svn`/`.hg`/`node_modules`は設定されている状態

```
.eslintrc.js
.stylelintrc.json
prettierrc.json
package.json
package-lock.json
css
```

### 実行

`.prettierignore`でignoreしたファイル以外のファイルへprettierを実行

```
% npx prettier --write .
```

## LintersとPrettier、それぞれの役割

> _In other words, use **Prettier for formatting** and **linters for catching bugs!**_  
> DeepL訳) 書式設定にはPrettierを使い、バグ取りにはリンターを使うのです
>
> https://prettier.io/docs/en/comparison.html

Stylelint・ESLintのどちらもコードを整形する機能は組み込まれているが  
コードの整形に関してはPrettierを使用するケースが多いと調べていた肌感覚では思いました

## LintersとPrettierの併用について

Lintersと衝突する可能性のあるルールなどをOFFにする必要がある

### ESlint

[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#installation)をインストール

```
% npm i eslint-config-prettier
```

`.eslintrc.js`の`extends`へ追加する  
設定は上書きされていくため、後に記述する

```
extends: ["eslint:recommended","prettier"],
```

[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#installation)を実行することで、Prettierと衝突するルールを教えてくれます

```
% npx eslint-config-prettier index.js
```

semiというルールが衝突していることがわかりました  
この場合は、ESLintで設定したrulesが優先されます

```
The following rules are unnecessary or might conflict with Prettier:
- semi
```

### Stylelint

[_stylelint-config-prettier-scss_](https://www.npmjs.com/package/stylelint-config-prettier-scss)をインストールし、`.stylelintrc.json`へ追記します

```
% npm i stylelint-config-prettier-scss
```

```
"extends": ["stylelint-config-standard-scss", "stylelint-config-prettier"],
```

衝突するルールを確認する

```
% npx stylelint-config-prettier-check
No conflicting rules detected in your stylelint configuration!
```

https://prettier.io/docs/en/integrating-with-linters.html#docsNav

## package.json

最終的なpackage.json

```
{
  "name": "formatter-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "stylelint": "npx stylelint '*.scss'",
    "stylelint:fix": "npx stylelint '*.scss' --fix",
    "eslint": "npx eslint 'index.js'",
    "eslint:fix": "npx eslint 'index.js' --fix",
    "prettier": "npx prettier --check .",
    "prettier:fix": "npx prettier --write .",
    "format": "npm run prettier && npm run eslint && npm run stylelint",
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "eslint": "^8.15.0",
    "prettier": "2.6.2",
    "stylelint": "^14.8.2",
    "stylelint-config-recommended": "^7.0.0",
    "stylelint-config-recommended-scss": "^6.0.0",
    "stylelint-scss": "^4.2.0"
  },
  "dependencies": {
    "eslint-config-prettier": "^8.5.0",
    "stylelint-config-prettier": "^9.0.3",
    "stylelint-config-standard-scss": "^3.0.0"
  }
}
```

## 参考記事

https://qiita.com/y-w/items/bd7f11013fe34b69f0df

https://www.webprofessional.jp/taking-css-linting-next-level-stylelint/

http://www.creativenightly.com/2016/02/How-to-lint-your-css-with-stylelint/

https://qiita.com/mysticatea/items/f523dab04a25f617c87d#-%E7%92%B0%E5%A2%83%E8%A8%AD%E5%AE%9A%E3%82%92%E3%81%99%E3%82%8B

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
