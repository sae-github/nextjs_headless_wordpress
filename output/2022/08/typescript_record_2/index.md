---
title: 'TypeScript学習記録#2 VoidとNeverの違い'
date: '2022-08-19'
categories:
  - 'javascript'
  - 'typescript'
tags:
  - 'javascript'
  - 'typescript'
  - 'プログラミング'
  - '学習記録'
coverImage: 'Twitter-post-22-2.jpg'
---

この記事はTypeScriptを勉強していく中で、学んだことや疑問に思ったことを記録していくための記事です。

## Void

値を持たないことを意味する

```
// returnがない(= undefined)の場合に使用するケースが多い
const f = ():void => {
  console.log("ほげほげ")
}
```

https://www.typescriptlang.org/docs/handbook/basic-types.html#void

## Never

決して発生しない値の型に使用される

```
// 必ずthorwされる関数
const f = () => {
  throw new Error("エラーです")
}

// 必ずreturnされない関数
const f = () => {
  while(true) {
  }
}
```

https://www.typescriptlang.org/docs/handbook/basic-types.html#never

## ２つの違いは？

https://medium.com/swlh/whats-the-difference-between-never-and-void-in-typescript-16f6629bfcdc
