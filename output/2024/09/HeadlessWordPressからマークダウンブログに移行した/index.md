---
title: 'HeadlessWordPressからマークダウンブログに移行した'
date: '2024-09-09'
---

題の通り、当ブログをHeadless WordPressからマークダウンブログに移行した。

## 移行前の状況
WP APIを使用してコンテンツ情報を取得し、Next.jsを使用してRSC内でAPIリクエストを行い描画していた。

## 移行のモチベーション
- サーバー代を節約したい
- 入稿がWordPressの管理画面から行う他なく、めんどくさい(追加慣れたエディターで書きたい)
- 記事を書くことで、GitHubのアクティビティ増やすことができればモチベーションUPになりそう

## 手順を振り返る

### 1. WordPress上にあるコンテンツ情報をエクスポートする

![](/images/2024090922000000.png)

WordPressの管理画面からxml形式で記事をエクスポート

### 2. markdown形式に変換する

[wordpress-export-to-markdown](https://github.com/lonekorean/wordpress-export-to-markdown)を使用して、先ほどエクスポートしたデータをmarkdown形式に変換した

ref: [WordPressの記事をMarkdown形式に一括出力する方法](https://www.webcreatorbox.com/tech/wordpress-to-md)

### 3. 記事を取得する処理を作成
outputディレクトリ内に年ごとにディレクトリを作り、さらに年ごとのディレクトリ内に月毎のディレクトリを作成し記事を管理する構造にした。
```
output/
　├ 2022/
　├ 2023/
　├ 2024/
　│　└ 01/
　│　└ 02/
　│　　　└ title/
　│　　　   └ index.md/
　│　　　   └ images/
```

```tsx
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const markdownOutPutDirectoryPath = path.join(process.cwd(), 'output')

export function getPosts(): PostData[] {
  const yearsPaths = fs.readdirSync(markdownOutPutDirectoryPath)
  const allPostData = yearsPaths.flatMap((year) => {
    const yearDirPath = path.join(process.cwd(), `output/${year}`)
    const monthPaths = fs.readdirSync(yearDirPath)
    return monthPaths.flatMap((month) => {
      const monthDirPath = path.join(process.cwd(), `output/${year}/${month}`)
      const pageTitlePaths = fs.readdirSync(monthDirPath)
      return pageTitlePaths.map((title, index) => {
        const id = `${year}${month}${index + 1}`
        const markdownContentPath = path.join(
          process.cwd(),
          `output/${year}/${month}/${title}/index.md`,
        )
        const fileContents = fs.readFileSync(markdownContentPath, 'utf8')
        const { data, content } = matter(fileContents)
        const postData: PostData = {
          id,
          title: data.title,
          date: data.date,
          content,
        }
        return postData
      })
    })
  })
  return allPostData.sort((a, b) => (a.date < b.date ? 1 : -1))
}
export type PostData = {
  id: string
  title: string
  date: string
  content: string
}

```

### 画像に関して

画像に関しては、変換したmarkdownファイルでは下記のようなパスになってしまい
各記事ディレクトリ内の画像が参照できなかった。
```md
![](images/2024090922000000.png)

```

画像に関しては少々面倒だったが、public下に全て移動させ、
画像のパスを変更することで参照できるようにした
```md
![](/images/2024090922000000.png)

```


### markdownで書く時に役立ったVSCodeのプラグイン
- [Visual Studio Code拡張 Markdown All in One](https://zenn.dev/ctrlkeykoyubi/articles/vscode-markdown-all-in-one)
