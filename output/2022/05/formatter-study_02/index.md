---
title: 'huskyとlint-stageでコミット時にformatterを走らせる'
date: '2022-05-22'
categories:
  - 'css'
  - 'javascript'
tags:
  - 'javascript'
  - 'プログラミング'
  - '学習記録'
coverImage: 'Twitter-post-17.png'
---

![管理人](/images/43D8A608-67A3-48E2-9600-EFFAEB7E218E_1_201_a-150x150.jpeg)

管理人

こんにちは、さえと申します👩‍💻  
フロントエンドエンジニアになるために 日々勉強をしています  
このブログは その勉強の記録と アウトプットのために運営をしています✨

前回に引き続きformatterについての学習記録です  
今回はコミットした際にformatterが走る様な設定を加えていく編

https://itosae.com/formatter-study\_01/

## 現状のpackage.json

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
    "format": "npm run prettier && npm run eslint && npm run stylelint"
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

## 導入

Prettierのドキュメントにあった[husky](https://github.com/typicode/husky)と[lint-staged](https://github.com/okonet/lint-staged) を使用した方法をやってみる

https://prettier.io/docs/en/precommit.html#option-1-lint-stagedhttpsgithubcomokonetlint-staged

### ① セットアップ

```
npx mrm@2 lint-staged
```

> これは husky と lint-staged をインストールし、プロジェクトの package.json に設定を追加して、対応するファイルを pre-commit フックで自動的にフォーマットするようにするものです。
>
> https://prettier.io/docs/en/precommit.html#option-1-lint-stagedhttpsgithubcomokonetlint-staged

以下の部分が`package.json` へ追加された

```
{
  ....
  "scripts": {
    ...
    "prepare": "husky install"
  },
  "devDependencies": {
    "husky": "^8.0.1",
    "lint-staged": "^12.4.1",
    ....
  },
  "lint-staged": {
    "*.js": "eslint --cache --fix",
    "*.css": "stylelint --fix",
    "*.stylelint": "prettier --write"
  }
}
```

`.husky`がプロジェクトディレクトリに追加された

![](/images/スクリーンショット-2022-05-21-22.24.19.png)

### "prepare": "husky install"ってなに

package.jsonへ追加された"prepare": "husky install"は何なのか

```
"scripts": {
  "prepare": "husky install"
}
```

npm iした後に自動的にGitフックディレクトリとして`.husky/`を使用する様するコマンド

https://blog.typicode.com/husky-git-hooks-javascript-config/

https://blog.typicode.com/husky-git-hooks-autoinstall/

### ② lint-staged内を変更

対象のファイルとnpmスクリプトを指定

```
"lint-staged": {
  "*.js": "npm run eslint:fix",
  "*.scss": "npm run stylelint:fix",
  "*.{js,scss,html}": "npm run prettier:fix"
}
```

### ③ コミットしてみる

eslintでエラーが発生！エラー箇所は`.eslintrc.js`ファイルの一行目

![](/images/スクリーンショット-2022-05-21-22.41.41-1-1024x479.png)

### 原因

lint-stageで.jsの拡張子がつくファイルに対して右辺が実行されている  
本来linterから除外したかった`.eslintrc.js`も対象ファイルとみなされlinterが走ってしまった

```
"lint-staged": {
  "*.js": "npm run eslint:fix",
  "*.scss": "npm run stylelint:fix",
  "*.{js,scss,html}": "npm run prettier:fix"
}
```

### 解決方法

ignoreする、またはlint-stagedで実行するファイルをの指定方法を変える

```
{
  ignorePatterns:[".eslintrc.js"],
}
```

## エラー記録

コミットした際にformatterが走らない。  
`The '.husky/pre-commit' hook was ignored because it's not set as executable.`とでた

```
% git commit -m "fix"
...
hint: The '.husky/pre-commit' hook was ignored because it's not set as executable.
hint: You can disable this warning with `git config advice.ignoredHook false`.
```

以下のコマンドを実行し、実行権限を許可してあげることで解決

```
chmod +x .husky/pre-commit
```

https://stackoverflow.com/questions/8598639/why-is-my-git-pre-commit-hook-not-executable-by-default

## 参考記事

https://rinoguchi.net/2021/12/husky-and-lint-staged.html

https://qiita.com/noraworld/items/c562de68a627ae792c6c

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
