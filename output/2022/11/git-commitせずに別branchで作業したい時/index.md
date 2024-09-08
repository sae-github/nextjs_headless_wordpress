---
title: 'git commitせずに別branchで作業したい時【git stash】'
date: '2022-11-05'
categories:
  - 'git-github'
tags:
  - 'git_github'
  - '学習記録'
---

今回は`git commit`せずに別branchで作業したい...そんな時に使用できる  
`git stash`と`git worktree`についての記事です。

以前、自身がお世話になっている もりけん塾の勉強会で `git worktree`を教えていただきましたが、  
当時は use caseにいまいちピンときていなく、実際業務で必要になった場面で使用することができませんでした...  
`git worktree`は以前書いた記事があるので、今回は`git stash`を使用したパターンをまとめました。

## git commitせずにbranchを切り替えるとどうなる？

内容がmergeされてしまう。  
つまりfeatureブランチで新機能を開発していた際に、  
`git commit`せずに他branchへcheckoutしてしまうと、featureブランチで作業していた内容がcheckout先のブランチにmergeされる。

mergeした際にコンフリクトが発生する場合は、エラーがでるので自動的にmergeはされない。

```
% git checkout **
error: Your local changes to the following files would be overwritten by checkout:
        index.html
Please commit your changes or stash them before you switch branches.
Aborting
```

### 具体的な use case

現在、featureブランチで機能追加を実装中。  
「「 バグ発生 !!!!!!!!!!!!!!!!!!!!!!至急対応!!!!!!!!!!!!!!!!!!! 」」

機能追加を実装していたfeatureブランチではなく、  
新たにブランチを切ってバグ対応をしなくてはいけない状況に。

しかし、機能追加実装中のfeatureブランチ内はまだcommitしたくない...そんな時！！！！！！

## git stash

stashは隠すという意味

### 作業中の内容をstashする

```
% git stash
Saved working directory and index state WIP on feature: d1cb3ed Merge pull request #10 from sae-github/dev
```

POINT

git stashでは untrackファイルはstashされないので注意。

```
% git stash
No local changes to save
```

untrackファイルも含めて退避させたい時は `-u (--include-untracked)`オプションを付与する

```
% git stash -u
```

### git statusで現在の状態を確認

作業途中の内容はstashされ、working tree cleanに

```
% git status
On branch feature
nothing to commit, working tree clean
```

### stashした一覧を確認

```
% git stash list
stash@{0}: WIP on feature: d1cb3ed Merge pull request #10 from sae-github/dev
// WIP on の後はbranch名
```

### 退避した作業内容を反映する

```
% git stash apply
On branch feature
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   index.html

no changes added to commit (use "git add" and/or "git commit -a")
```

### 不要なstashを削除する

```
% git stash drop
Dropped refs/stash@{0} (92fad7c538481485cec40c24404dd7274fbb9710)
```

### その他、良さそうなコマンド

#### messageをつけてstashしたい時

```
% git stash save "message"
Saved working directory and index state On feature: message

% git stash list
stash@{0}: On feature: message
```

#### 退避した作業をもとに戻し、リストからも削除する

(applyとdropを同時にやってくれる)

```
% git stash pop stash@{0}
```

### git add していないものだけstashさせたい

untrackファイルはstashされないので注意。

```
% git stash -k
```

### 参考サイト

https://qiita.com/chihiro/items/f373873d5c2dfbd03250

https://qiita.com/akasakas/items/768c0b563b96f8a9be9d

### git worktreeを使用する

https://itosae.com/git\_worktree/
