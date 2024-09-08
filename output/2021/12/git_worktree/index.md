---
title: "git worktreeを理解したい！！！！【もりけん塾 勉強会の復習】"
date: "2021-12-19"
categories: 
  - "git-github"
tags: 
  - "git_github"
  - "morikenjuku"
  - "勉強会"
  - "学習記録"
coverImage: "WebブラウザにWebサイトが表示までの旅へ-2-1.jpg"
---

先日、もりけん塾で行われた勉強会で  
もりけん先生がgitについてのハンズオンをおこなってくださいました

https://twitter.com/terrace\_tech/status/1468584083706224643?s=20

もりけん先生のハンズオン

https://github.com/kenmori/handsonFrontend/blob/master/git/work/advance.md

今回は、ハンズオンの中のgit worktreeについての復習を行いました

## git worktreeとは。use caseは。

git worktreeを使用すると、一つのリポジトリに複数のワークツリーを作成し作業できます

もりけん先生のハンズオン教材にありますが、  
新機能開発中など、ブランチで作業中に  
急なバグ対応をしなくてはいけなくなった場合などに 使用するそうです。

ドキュメントには以下の様にありました

\> You are in the middle of a refactoring session and your boss comes in and demands that you fix something immediately. You might typically use [git-stash\[1\]](https://git-scm.com/docs/git-stash) to store your changes away temporarily, however, your working tree is in such a state of disarray (with new, moved, and removed files, and other bits and pieces strewn around) that you don’t want to risk disturbing any of it. Instead, you create a temporary linked working tree to make the emergency fix, remove it when done, and then resume your earlier refactoring session.  
  
DEEPL訳  
リファクタリングの最中に、上司がやってきて、すぐに何かを修正するように要求された場合。通常なら git-stash\[1\] を使って変更を一時的に保存しておくかもしれませんが、作業ツリーは（新しいファイルや移動・削除したファイル、その他の断片が散らばって）無秩序な状態になっており、それを邪魔するリスクは避けたいと思うでしょう。その代わりに、一時的にリンクされた作業ツリーを作成して緊急修正を行い、完了したらそれを削除して、以前のリファクタリングセッションを再開するのです。

https://git-scm.com/docs/git-worktree

## 早速やってみる

① 開発用ブランチ(feature/a)で作業中

```
// 開発用ブランチを作成し、移動
% git checkout -b feature/a
Switched to a new branch 'feature/a'

// 現在のブランチ状況
 % git branch
* feature/a
  main
```

② 急なバグ対応が入った! 💥  
worktreeを作成・追加  
`git worktree add <path> <branch>`

```
 % git worktree add ./worktree/dev main
Preparing worktree (checking out 'main')
HEAD is now at 9359c6c first commit
```

現状のディレクトリ状況

![](/images/スクリーンショット-2021-12-19-16.34.47.png)

作成したworktreeの中でmainブランチにcheckout  
この状態で、別のworktreeからmainブランチにcheckoutすることはできない

```
 % git checkout main
fatal: 'main' is already checked out at <path>
```

また、上記では既存のbranchを使用しましたが、新たにbranchを切ることもできる

```
 % git worktree add worktree/dev -b feature/b 
```

③ 現在のworktreeの状況を確認する

```
% git worktree list
/Users/sae/Desktop/git_lesson               35fd158 [feature/a]
/Users/sae/Desktop/git_lesson/worktree/dev  513153e [main]
```

④ 追加したworktreeのディレクトリへ移動

```
 % cd ./worktree/dev
```

⑤ ブランチを切り、何か修正・編集を行う

```
% git checkout -b feature/b
Switched to a new branch 'feature/b'
```

現状のブランチ状況

```
 % git branch
+ feature/a
* feature/b
  main
```

⑥ 作業した内容をgit add、commitする  
※./worktree/dev内のファイルで作業する

```
% git add .

 % git commit -m "fix:fix"
[feature/feature/b 95a6d32] fix:fix
 1 file changed, 1 insertion(+), 1 deletion(-) 
```

⑦ 元の場所へ戻る

```
% cd ../../
```

⑧ 不要になったworktreeを削除する

```
% git worktree remove ./worktree/dev
```

feature/bは残ったまま

```
% git branch
* feature/a
  feature/b
  main
```

これを統合するタイミングは自分でコントロール可能  
また、作成したworktreeから 直接pushすることもできる

```
git push origin HEAD
```

## 参考サイト

https://opensource.com/article/21/4/git-worktree

## まとめ

gitはまだまだ苦手意識があり、基本的に個人開発でしか使用していないので  
use caseもいまいちリアルに感じることができませんでした  
git管理をしている現場で働いている方との差を感じました

こういった勉強会の機会を無駄にせず  
必要に応じて使いこなせる様にしていきたいです✨

* * *

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
