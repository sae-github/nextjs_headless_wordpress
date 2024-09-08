---
title: 'lint-stagedでESLintがコケる問題への対応(error Failed to load env from .env.production.local Error: ENOTDIR: not a directory)'
date: '2023-08-27'
---

## 開発環境

- Next.js 13.4.17

- TypeScript 5.1.6

- ESLint 8.47.0

- Prettier ^3.0.2

## 事象

package.jsonでlint-stagedで実行するスクリプトを設定した

```
{
...
　　"lint-staged": {
    "*.{ts,tsx,css,json}": [
      "eslint",
      "npm run format"
    ]
  }
```

commitしてみると下記エラーが発生した

```
Parsing error: Missing semicolon.
```

手動で`npx eslint --fix`と`npm run format`を実行し、再度commitすると解消した・・・

## 調査

### lint-stagedで指定する

下記の様に`npx eslint --fix`のあとに、`npm run format`を実行する様に設定を変えてみた

```
{
...
  "lint-staged": {
    "*.{ts,tsx,css,json}": [
      "npx eslint --fix",
      "npm run format"
    ]
  }
```

結果は上記と同じParsing error: Missing semicolon. (1:4)が発生・・・

### next lintに変えてみる

```
{
...
  "lint-staged": {
    "*.{ts,tsx,css,json}": [
      "lint:fix",
      "npm run format"
    ]
  }
```

下記のエラーが発生

```
> lint-staged

✔ Preparing lint-staged...
⚠ Running tasks for staged files...
  ❯ package.json — 4 files
    ❯ *.{ts,tsx,css,json} — 3 files
      ✖ npm run lint:fix [FAILED]
      ◼ npm run format
↓ Skipped because of errors from tasks.
✔ Reverting to original state because of errors...
✔ Cleaning up temporary files...

✖ npm run lint:fix:
- error Failed to load env from .env.production.local Error: ENOTDIR: not a directory, stat '/Users/sae/Desktop/nextjs_headless_wordpress/package.json/.env.production.local'
    at Object.statSync (node:fs:1596:3)
    at loadEnvConfig (/Users/sae/Desktop/nextjs_headless_wordpress/node_modules/@next/env/dist/index.js:1:4834)
    at loadConfig (/Users/sae/Desktop/nextjs_headless_wordpress/node_modules/next/dist/server/config.js:570:28)
    at nextLint (/Users/sae/Desktop/nextjs_headless_wordpress/node_modules/next/dist/cli/next-lint.js:172:50)
    at /Users/sae/Desktop/nextjs_headless_wordpress/node_modules/next/dist/bin/next:150:44 {
  errno: -20,
  syscall: 'stat',
  code: 'ENOTDIR',
  path: '/Users/sae/Desktop/nextjs_headless_wordpress/package.json/.env.production.local'
}
- error Failed to load env from .env.local Error: ENOTDIR: not a directory, stat '/Users/sae/Desktop/nextjs_headless_wordpress/package.json/.env.local'
    at Object.statSync (node:fs:1596:3)
    at loadEnvConfig (/Users/sae/Desktop/nextjs_headless_wordpress/node_modules/@next/env/dist/index.js:1:4834)
    at loadConfig (/Users/sae/Desktop/nextjs_headless_wordpress/node_modules/next/dist/server/config.js:570:28)
    at nextLint (/Users/sae/Desktop/nextjs_headless_wordpress/node_modules/next/dist/cli/next-lint.js:172:50)
    at /Users/sae/Desktop/nextjs_headless_wordpress/node_modules/next/dist/bin/next:150:44 {
  errno: -20,
  syscall: 'stat',
  code: 'ENOTDIR',
  path: '/Users/sae/Desktop/nextjs_headless_wordpress/package.json/.env.local'
}
- error Failed to load env from .env.production Error: ENOTDIR: not a directory, stat '/Users/sae/Desktop/nextjs_headless_wordpress/package.json/.env.production'
    at Object.statSync (node:fs:1596:3)
    at loadEnvConfig (/Users/sae/Desktop/nextjs_headless_wordpress/node_modules/@next/env/dist/index.js:1:4834)
    at loadConfig (/Users/sae/Desktop/nextjs_headless_wordpress/node_modules/next/dist/server/config.js:570:28)
    at nextLint (/Users/sae/Desktop/nextjs_headless_wordpress/node_modules/next/dist/cli/next-lint.js:172:50)
    at /Users/sae/Desktop/nextjs_headless_wordpress/node_modules/next/dist/bin/next:150:44 {
  errno: -20,
  syscall: 'stat',
  code: 'ENOTDIR',
  path: '/Users/sae/Desktop/nextjs_headless_wordpress/package.json/.env.production'
}
- error Failed to load env from .env Error: ENOTDIR: not a directory, stat '/Users/sae/Desktop/nextjs_headless_wordpress/package.json/.env'
    at Object.statSync (node:fs:1596:3)
    at loadEnvConfig (/Users/sae/Desktop/nextjs_headless_wordpress/node_modules/@next/env/dist/index.js:1:4834)
    at loadConfig (/Users/sae/Desktop/nextjs_headless_wordpress/node_modules/next/dist/server/config.js:570:28)
    at nextLint (/Users/sae/Desktop/nextjs_headless_wordpress/node_modules/next/dist/cli/next-lint.js:172:50)
    at /Users/sae/Desktop/nextjs_headless_wordpress/node_modules/next/dist/bin/next:150:44 {
  errno: -20,
  syscall: 'stat',
  code: 'ENOTDIR',
  path: '/Users/sae/Desktop/nextjs_headless_wordpress/package.json/.env'
}
/Users/sae/Desktop/nextjs_headless_wordpress/node_modules/next/dist/lib/find-pages-dir.js:54
        throw new Error("> Couldn't find any `pages` or `app` directory. Please create one under the project root");
              ^

Error: > Couldn't find any `pages` or `app` directory. Please create one under the project root
    at findPagesDir (/Users/sae/Desktop/nextjs_headless_wordpress/node_modules/next/dist/lib/find-pages-dir.js:54:15)
    at nextLint (/Users/sae/Desktop/nextjs_headless_wordpress/node_modules/next/dist/cli/next-lint.js:195:67)

Node.js v18.12.1

> nextjs_headless_wordpress@0.1.0 lint:fix
> next lint --fix --dir src /Users/sae/Desktop/nextjs_headless_wordpress/package.json /Users/sae/Desktop/nextjs_headless_wordpress/src/components/app/Home/index.tsx /Users/sae/Desktop/nextjs_headless_wordpress/src/components/app/[id]/style.css
```

## 解決方法

package.jsonで指定した設定は削除し、[Next.jsのドキュメント通り](https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged)にlint-stagedの設定を行う

```
const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, 'npm run format'],　// ここで実行したいスクリプトを指定
}
```

next lintは pages/, app/, components/, lib/, src/ すべてのファイルを対象にESLintを実行するから  
lint-stagedでステージングされたファイルだけを対象とする場合は、--fileで対象のファイルを指定する必要があると理解した。

## 参考

https://github.com/okonet/lint-staged#integrate-with-nextjs

https://github.com/vercel/next.js/issues/33096
