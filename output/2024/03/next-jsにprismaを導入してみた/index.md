---
title: 'Next.jsにPrismaを導入してみた'
date: '2024-03-01'
---

[Learn Next.js](https://nextjs.org/learn/dashboard-app)で実装したアプリケーションのデータ操作をPrismaで書き換えてみた。

## [Prisma](https://www.prisma.io/)とは

> What is Prisma ORM?
>
> - Prisma ORM is an open-source next-generation ORM. It consists of the following parts:
> - **Prisma Client**: Auto-generated and type-safe query builder for Node.js & TypeScript
> - **Prisma Migrate**: Migration system
> - **Prisma Studio**: GUI to view and edit data in your database.
>
> https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma#what-is-prisma-orm

### ORMとは

**Object-Relational Mapping**

> [データベース](https://ja.wikipedia.org/wiki/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9)と[オブジェクト指向プログラミング言語](https://ja.wikipedia.org/wiki/%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E8%A8%80%E8%AA%9E)の間の非互換なデータを変換する[プログラミング](<https://ja.wikipedia.org/wiki/%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0_(%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC%E3%82%BF)>)技法である。
>
> https://ja.wikipedia.org/wiki/%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E9%96%A2%E4%BF%82%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0

業務先ではRailsを使用していて、ORMにはActive Recordを使用している。  
テーブルとモデルを関連づけることで、SQLを書かずともデータを操作できるもの。そうすることで再利用可能なコードを書くことができ、保守性にもつながるメリットを持つ。とざっくり理解している。

## インストール

```
npm install prisma --save-dev
```

## 初期設定

```
npx prisma init
```

prismaディレクトリとschema.prismaファイル爆誕！

![](/images/スクリーンショット-2024-02-25-19.34.39.png)

## 既存のDBに接続

今回は[Vercel](https://vercel.com/)のStorage機能を使って作成したDB(Postgres)に繋ぐ

[datasource](https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources)に環境変数で管理している、DBの接続先URLを指定する。

```
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
}
```

## モデルの生成

### Introspection

Prismaスキーマに現在のDBスキーマを反映したモデルを生成する。

<figure>

![](/images/prisma-db-pull-generate-schema-1024x480.png)

<figcaption>

ref: [What does introspection do?](https://www.prisma.io/docs/orm/prisma-schema/introspection#what-does-introspection-do)

</figcaption>

</figure>

```
npx prisma db pull
```

[datasource](https://www.prisma.io/docs/orm/prisma-schema/overview/data-sources)に指定したDBに接続し、DBスキーマを読み取りモデルに変換する。

prisma/scheme.prismaにmodelが生成された！

```
model customers {
  id        String @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  name      String @db.VarChar(255)
  email     String @db.VarChar(255)
  image_url String @db.VarChar(255)
}

model invoices {
  id          String   @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  customer_id String   @db.Uuid
  amount      Int
  status      String   @db.VarChar(255)
  date        DateTime @db.Date
}

model revenue {
  month   String @unique @db.VarChar(4)
  revenue Int
}

model users {
  id       String @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  name     String @db.VarChar(255)
  email    String @unique
  password String
}
```

## リレーションの追加

モデル間のリレーションをスキーマファイルに追加していく。今回の例でいうと、`customers`と`invoices`は1対多の関係性となる。  
relation fieldsは実際のDBには存在しないがPrisma Clientで使用するために定義する必要がある。

```
model customers {
  id        String @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  name      String @db.VarChar(255)
  email     String @db.VarChar(255)
  image_url String @db.VarChar(255)
  invoices invoices[]
}

model invoices {
  id          String   @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  customers customers @relation(fields: [customer_id], references: [id])
  customer_id String
  amount      Int
  status      String   @db.VarChar(255)
  date        DateTime @db.Date
}
```

ref: [relations](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations)

## Prisma Client

```
npm install @prisma/client
```

installした@prisma/clientモジュールはnode_modules/.prisma/clientフォルダを参照している。/.prisma/clientには生成されたPrisma Clientが格納されている。

<figure>

![](/images/prisma-client-install-and-generate-1024x480.png)

<figcaption>

ref: [Install and generate Prisma Client](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/install-prisma-client-typescript-postgresql#install-and-generate-prisma-client)

</figcaption>

</figure>

```
prisma generate
```

スキーマを更新する度に`prisma generate`を実行する必要がある。実行することでPrisma Clientが更新される。

### インスタンスの生成

[Best practices for using Prisma Client with Next.js](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices)に従い、lib/db.tsファイルを作成。  
globalオブジェクトにPrismaClientのインスタンスを保存した。

```
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient()
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
```

[Best practices for using Prisma Client with Next.js](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices)には下記のように書いてあった。  
余分なインスタンスの作成を防ぎ、コネクションプールが起きないようにするためと理解した。

> In development, the command next dev clears Node.js cache on run. This in turn initializes a new PrismaClient instance each time due to hot reloading that creates a connection to the database. This can quickly exhaust the database connections as each PrismaClient instance holds its own connection pool.  
> 開発では、next devコマンドは実行時にNode.jsキャッシュをクリアします。これは、データベースへの接続を作成するホットリロードにより、毎回新しいPrismaClientインスタンスを初期化します。これは、各PrismaClientインスタンスが独自の接続プールを保持するため、データベース接続をすぐに使い果たす可能性があります。
>
> https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices#problem

## レコードを取得してみる

元々のSQLクエリで取得していたデータをPrisma Clientを使用して置き換えていく。  
`invoices`テーブルから`amount、id`、`customers`テーブルから`name`、`image_url`、`email`をdateの降順で最大5件、取得している。  
上のschemaで定義した通り、customer_idが外部キーとなってcustomersテーブルのidと一致するcustomersのレコードの情報を持ってきている。

```
SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5
```

[findMany](https://www.prisma.io/docs/orm/reference/prisma-client-reference#findmany)を使用して指定した条件に合うレコードのリストを取得する。  
selectはどのプロパティを含めるかを指定することができる。

```
  const latestInvoices = await prisma.invoices.findMany({
    select: {
      amount: true,
      customers: {
        select: {
          name: true,
          image_url: true,
          email: true,
        },
      },
      id: true,
    },
    orderBy: {
      date: 'desc',
    },
    take: 5,
  });
```

## エラー記録

### PrismaClientInitializationError

PrismaClientInitializationError: Prisma has detected that this project was built on Vercel, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

ビルド時に出たエラー。  
エラー文言通りに`prisma generate` を追加した。

```
  "scripts": {
    "build": "prisma generate && next build",
...
  },
```

## 感想

ORM自体、触るのが初めてだったがドキュメントが丁寧で理解を助けてくれた。  
業務先ではRailsのActiveRecordを使用していて、時々modelsファイルを見たりしていたのでとっかかりやすかった。あと、SQLクエリからPrismaで提供されているクエリに書き換える際に、SQLクエリを読むことに苦戦した。。
