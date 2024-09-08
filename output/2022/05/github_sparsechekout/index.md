---
title: "【GitHub記録】特定のディレクトリのみcloneする方法"
date: "2022-05-11"
categories: 
  - "git-github"
tags: 
  - "git_github"
  - "プログラミング"
coverImage: "特定のディレクトリのみを-cloneさせる方法-1-1.png"
---

GitHubのリモートリポジトリから特定のディレクトリ(又はファイル)のみを`clone`する方法を知り、  
実際に調べながらやってみた記録です。

## 空のディレクトリを作成

空のディレクトリを作成し、移動

```
mkdir [ディレクトリ名]
cd [ディレクトリ名]
```

## ローカルリポジトリを作成

上で作成したディレクトリ内で`git init`する

```
git init
```

## `sparsecheckout`をtrueにする

```
git config core.sparsecheckout true
```

git config内を確認できるコマンド

```
git config -l

...
core.sparsecheckout=true
```

## cloneしたいリモートリポジトリを追加

```
git remote add origin [url]
```

## 必要なファイルやディレクトリを記述

.git / infoの配下にsparse-checkoutを作成し、そこに必要なディレクトリやファイル名を追加します

```
echo [dir pass] >> .git/info/sparse-checkout
```

## git pull する

```
git pull origin master
```

完

### 参考

https://git-scm.com/docs/git-sparse-checkout

https://leico.github.io/TechnicalNote/Git/sparse-checkout

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
