---
title: "【Codewars】素数にまつわるアルゴリズム問題に取り組んだ記録"
date: "2022-10-11"
categories: 
  - "codewars"
  - "javascript"
tags: 
  - "codewars"
  - "javascript"
  - "プログラミング"
  - "学習記録"
coverImage: "Twitter-post-27.png"
---

最近は毎日[Codewars](https://www.codewars.com/)に取り組んでいます！

[Codewars](https://www.codewars.com/)で学んだこと、もう少し深堀して調べたことを残します。  
今回は[Codewars](https://www.codewars.com/)で素数にまつわるアルゴリズム問題を中心にやってみました！

## 素数かどうか

...素数ってなんだっけ...

### 素数とは

> **素数**（そすう、[英](https://ja.wikipedia.org/wiki/%E8%8B%B1%E8%AA%9E): _prime_あるいは_prime number_）とは、2 以上の[自然数](https://ja.wikipedia.org/wiki/%E8%87%AA%E7%84%B6%E6%95%B0)で、正の[約数](https://ja.wikipedia.org/wiki/%E7%B4%84%E6%95%B0)が [1](https://ja.wikipedia.org/wiki/1) と自分自身のみであるもののことである。正の約数の個数が 2 である自然数と言い換えることもできる。1 より大きい自然数で素数でないものは[合成数](https://ja.wikipedia.org/wiki/%E5%90%88%E6%88%90%E6%95%B0)と呼ばれる。
> 
> https://ja.wikipedia.org/wiki/%E7%B4%A0%E6%95%B0

for文を使用して、約数を洗い出して最終的な個数によって素数かどうかを判断してみる  
初期値を2にして、引数(n)以下であればループを続ける条件で。

```
function isPrime(n) {
  if (n < 2) return false;
  let arr = [];
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      arr.push(i);
    }
  }
  return arr.length === 0;
}

console.log(isPrime(0)); // false
console.log(isPrime(1)); // false
console.log(isPrime(2)); // true
console.log(isPrime(12)); // false
```

## 双子素数かどうか

...双子素数ってなに...

### 双子素数とは

> **双子素数**（ふたごそすう、[英](https://ja.wikipedia.org/wiki/%E8%8B%B1%E8%AA%9E): twin prime）とは、差が 2 である二つの[素数](https://ja.wikipedia.org/wiki/%E7%B4%A0%E6%95%B0)の組を構成する各素数のことである。双子素数の組は、(2, 3) を除いた、最も近い素数の組である。双子素数を小さい順に並べた列は、次のとおりである。
> 
> https://ja.wikipedia.org/wiki/%E5%8F%8C%E5%AD%90%E7%B4%A0%E6%95%B0

対象の値にプラス2、マイナス2した値のどちらかが素数であれば双子素数となるので`some`を使用しました。

```
function isTwinPrime(n) {
  const f = (num) => {
    if (num < 2) return false;
    for (let i = 2; i < num; i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  if (!f(n)) return false;
  return [n + 2, n - 2].some((a) => f(a));
}

console.log(isTwinPrime(19)); // true
console.log(isTwinPrime(953)); // false
```

## ウィルソン素数かどうか

### ウィルソン素数とは

> **ウィルソン素数**（ウィルソンそすう、[英](https://ja.wikipedia.org/wiki/%E8%8B%B1%E8%AA%9E): Wilson prime）とは、_p_2 が (_p_ − 1)! + 1 を[割り切る](https://ja.wikipedia.org/wiki/%E7%B4%84%E6%95%B0)ような[素数](https://ja.wikipedia.org/wiki/%E7%B4%A0%E6%95%B0) _p_ である。ここで "!" は[階乗](https://ja.wikipedia.org/wiki/%E9%9A%8E%E4%B9%97)。任意の素数 _p_ が (_p_ − 1)! + 1 を割り切ることはわかっている（[ウィルソンの定理](https://ja.wikipedia.org/wiki/%E3%82%A6%E3%82%A3%E3%83%AB%E3%82%BD%E3%83%B3%E3%81%AE%E5%AE%9A%E7%90%86)）。名称は[イングランド](https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%82%B0%E3%83%A9%E3%83%B3%E3%83%89%E4%BA%BA)の数学者[ジョン・ウィルソン](https://ja.wikipedia.org/w/index.php?title=%E3%82%B8%E3%83%A7%E3%83%B3%E3%83%BB%E3%82%A6%E3%82%A3%E3%83%AB%E3%82%BD%E3%83%B3_\(%E6%95%B0%E5%AD%A6%E8%80%85\)&action=edit&redlink=1)（[英語版](https://en.wikipedia.org/wiki/John_Wilson_\(mathematician\))）にちなむ。
> 
> https://ja.wikipedia.org/wiki/%E3%82%A6%E3%82%A3%E3%83%AB%E3%82%BD%E3%83%B3%E7%B4%A0%E6%95%B0

`((P-1)! + 1) / (P * P)`をコードで実現する!  
階乗部分はfor文でできそう

```
function amIWilson(p) {
  const getFactorial = (num) => {
    let factorial = 1;
    for (let i = num; i > 0; i--) {
      factorial *= i;
    }
    return factorial;
  };
  return (getFactorial(p - 1) + 1) % (p * p) === 0;
}

console.log(amIWilson(5)); // true
console.log(amIWilson(9));  // false
console.log(amIWilson(6));  // false
```

上記のコードでも実装できたのですが  
inputする値が大きくなった場合に階乗した値が`Infinity`になってしまい、意図した解にならなくなってしまいました...

```
function amIWilson(p) {
  const getFactorial = (num) => {
    let factorial = 1;
    for (let i = num; i > 0; i--) {
      factorial *= i;
    }
    return factorial;
  };
  return (getFactorial(p - 1) + 1) % (p * p) === 0;
}

console.log(amIWilson(563)); // false
```

### ウィルソン素数について...

ウィルソン素数について調べていると、現在知られているウィルソン素数がわかりました

> 現在まで知られているウィルソン素数は5、13、563だけです。

なので、この知識があれば以下のように書くことができます。

```
function amIWilson(p) {
  return [5, 13, 536].includes(p);
}


console.log(amIWilson(5)); // true
console.log(amIWilson(9));  // false
console.log(amIWilson(6));  // false
```

## まとめ

今回は素数に関係するアルゴリズム問題にチャレンジしました。  
まずは8kyuや7kyuの問題から挑戦してみました
