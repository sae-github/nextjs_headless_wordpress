---
title: 'PrismaでTypeCastしてLIKE検索をする方法を調べた'
date: '2024-03-03'
tags:
  - 'prisma'
  - '学習記録'
---

## 前提

- Next.js 14.0.2

- Prisma 5.10.2

- postgres

データベースに`Int型`で保存されている値を文字列でLIKE検索する際に調べたことを残しておく。  
Schemeは下記の通り。

```
model invoices {
  id          String   @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  customers customers @relation(fields: [customer_id], references: [id])
  customer_id String
  amount      Int　　　// here
  status      String   @db.VarChar(255)
  date        DateTime @db.Date
}
```

invoicesモデルの`status`と`amount`が検索対象。  
検索はクライアント側でinputタグから文字入力で行える仕様を想定している。

## where

`status`に関しては`[contains](https://www.prisma.io/docs/orm/reference/prisma-client-reference#contains)`に入力値(query)を指定し、一致するレコードを取得することができた。

```
  const invoicesResult = await prisma.invoices.findMany({
    select: {
      id: true,
      amount: true,
      date: true,
      status: true,
    },
    where: {
         status: {
            contains: query,　//  here
            mode: 'insensitive',
        },
    },
  });
```

[mode](http://insensitive)に指定した`insensitive`は大文字小文字の区別をせずに検索を行うためのオプション。

`amount`も`status`と同じように`contains`に指定するとエラーが起きる。(下記↓)

```
const invoicesResult = await prisma.invoices.findMany({
    select: {
      id: true,
      amount: true,
      date: true,
      status: true,
    },
    where: {
         status: {
            contains: query,
            mode: 'insensitive',
        },
          amount: {　　　// here
            contains: query,
            mode: 'insensitive',
          },
    },
  });
```

`Unknown argument contains. Available options are marked with ?.`  
不明な引数だとランタイムエラーになる・・・

エディター上でも下記のような型エラーが出ている。  
`型 '{ contains: string; mode: string; }' を型 'number | IntFilter<"invoices"> | undefined' に割り当てることはできません。   オブジェクト リテラルは既知のプロパティのみ指定できます。'contains' は型 'IntFilter<"invoices">' に存在しません`

## Raw queriesとは

データベースに生のクエリを送信することができる

> Prisma queries will return data in the JavaScript types that [correspond](https://www.prisma.io/docs/concepts/database-connectors/postgresql#type-mapping-between-postgresql-to-prisma-schema) to the Prisma types defined in your `schema.prisma`. It’s possible to do SQL type casting, like casting from integer to string if you use [$queryRaw](https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access).  
> DEEL翻訳) Prisma クエリは、schema.prisma で定義した Prisma 型に対応する JavaScript 型のデータを返します。queryRawを使用すると、整数から文字列へのキャストのようなSQL型キャストを行うことができます。
>
> [How to perform type casting in prisma?](https://github.com/prisma/prisma/discussions/17248)

[How to perform type casting in prisma?](https://github.com/prisma/prisma/discussions/17248)

## $queryRaw

実際のデータベースのレコードを返す

ref: [$queryRaw](https://www.prisma.io/docs/orm/prisma-client/queries/raw-database-access/raw-queries#queryraw)

下記のように$queryRawを使用してSQLを書くことで実現できた。

```
await prisma.$queryRaw`SELECT * FROM invoices WHERE invoices.amount::text LIKE %${query}%`;
```

## 詰まりポイント

### PrismaClientKnownRequestError:Invalid prisma.$queryRaw() invocation:Raw query failed. Code: \*\*. Message: ERROR: syntax error at or near "%"

```
await prisma.$queryRaw`SELECT * FROM invoices JOIN customers ON invoices.customer_id = customers.id WHERE invoices.amount::text LIKE %${query}%`;
```

％を使用している付近で構文エラーが発生していると言われている。`CONCAT`を使用して指定することで解消した `LIKE CONCAT('%', ${query}, '%')`↓

```
await prisma.$queryRaw`SELECT * FROM invoices JOIN customers ON invoices.customer_id = customers.id WHERE invoices.amount::text LIKE CONCAT('%', ${query}, '%')`;
```

ref: [using query raw with like '%%' got error N/A](https://github.com/prisma/prisma/discussions/20568)

### 返り値がunknown型になる問題

$queryRawを使用して得た値が、unknown型になってしまう。下記のようにジェネリクスで返り値の型づけが可能。`prisma.$queryRaw<InvoicesTable[]>`

```
await prisma.$queryRaw<InvoicesTable[]>`SELECT * FROM invoices JOIN customers ON invoices.customer_id = customers.id WHERE invoices.amount::text LIKE CONCAT('%', ${query}, '%')`;
```

ref: [Typing `$queryRaw` results](https://www.prisma.io/docs/orm/prisma-client/queries/raw-database-access/raw-queries#typing-queryraw-results)

### Uncaught PrismaClientKnownRequestError:

Invalid prisma.$queryRaw() invocation: Raw query failed. Code: \*\*\*. Message: ERROR: operator does not exist: date ~~ text HINT: No operator matches the given name and argument types. You might need to add explicit type casts.

型が一致しないので明示的に型指定する必要があるとのこと。invoices.amountはnumber型なため。

```
await prisma.$queryRaw<InvoicesTable[]>`SELECT * FROM invoices JOIN customers ON invoices.customer_id = customers.id WHERE invoices.amount LIKE CONCAT('%', ${query}, '%')`;
```

`::text`を指定し、テキスト型にすることで解消。

```
await prisma.$queryRaw<InvoicesTable[]>`SELECT * FROM invoices JOIN customers ON invoices.customer_id = customers.id WHERE invoices.amount::text LIKE CONCAT('%', ${query}, '%')`;
```

[PostgreSQL typecasting fixes](https://www.prisma.io/docs/orm/prisma-client/queries/raw-database-access/raw-queries#postgresql-typecasting-fixes)

### 検索がAND条件になってしまう

テキスト入力した際に検索が意図したように動かないケースがあった。  
原因を調べると`where`の指定の仕方に問題があったことがわかった(以下は原因のあるコード)

```
 const invoicesResult = await prisma.invoices.findMany({
  select: {
    id: true,
    amount: true,
    date: true,
    status: true,
  },
  where: {
    OR: [
      {
        status: {
          contains: query,
          mode: 'insensitive',
        },
      },
      {
        customers: {
          name: {
            contains: query,
            mode: 'insensitive',
          },
          email: {
            contains: query,
            mode: 'insensitive',
          },
        },
      },
    ],
  },
});
```

emailがnameと同階層にあることで、AND条件になっていたことが吐き出されたSQLクエリをみてわかった。

```
SELECT "public"."invoices"."id", "public"."invoices"."amount", "public"."invoices"."date", "public"."invoices"."status", "public"."invoices"."customer_id"
FROM "public"."invoices" LEFT JOIN "public"."customers" AS "j1" ON ("j1"."id") = ("public"."invoices"."customer_id")
WHERE ("public"."invoices"."status" ILIKE $1 OR ("j1"."name" ILIKE $2 AND "j1"."email" ILIKE $3 AND ("j1"."id" IS NOT NULL)))
ORDER BY "public"."invoices"."date" DESC LIMIT $4 OFFSET $5
```

下記のように、別の階層で定義することでOR条件となり意図した挙動になった。

```
const invoicesResult = await prisma.invoices.findMany({
  select: {
    id: true,
    amount: true,
    date: true,
    status: true,
  },
  where: {
    OR: [
      {
        status: {
          contains: query,
          mode: 'insensitive',
        },
      },
      {
        customers: {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
      },
      {
        customers: {  // here
          email: {
            contains: query,
            mode: 'insensitive',
          },
        },
      },
    ],
  },
});
```

## 感想

TypeCastしてLIKE検索する方法は、もう少しいい方法がある気がするけど、辿り着けなかった。。  
何かいい方法があれば教えてください。([X はこちら](https://twitter.com/sae_prog))
