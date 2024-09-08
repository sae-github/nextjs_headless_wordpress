---
title: "【もりけん塾】言語チャレンジ@2つの数値の和が指定された値になる組み合わせを考える"
date: "2022-01-30"
categories: 
  - "javascript"
tags: 
  - "javascript"
  - "プログラミング"
  - "morikenjuku"
  - "学習記録"
  - "言語チャレンジ"
coverImage: "Twitter-post-10-1.jpg"
---

  

![管理人](/images/43D8A608-67A3-48E2-9600-EFFAEB7E218E_1_201_a-150x150.jpeg)

管理人

こんにちは、さえと申します👩‍💻  
現在 フロントエンドエンジニアになるために 日々勉強をしています  
このブログは その勉強の記録と アウトプットのために運営をしています✨

もりけん塾で JavaScriptの言語チャレンジに 取り組んでいます

https://github.com/kenmori/handsonFrontend/blob/master/work/basic/Work.md

課題は `input`の値を`output`の値として出力することです  
関数の引数に inputの値を渡し、実行した結果をconsole.logで示します  
  
ここではoutputの値が、課題で提示されている通りになっていれば クリアとなります  
つまり、ベストな書き方でなくても OKとなります  
  
ブログでは、一つの課題に対して様々な方法で実装することを目標にしています

## 課題24

inputした配列内の数値の和が 2つ目のinputの値になる 組み合わせ を考えます  

input

```
[1, 9, 10, 3, 4, 2, 6] , 8
```

output

```
[2,6]
```

もし、第二引数が3であれば \[1, 2\]となるし、20であった場合は 組み合わせがないのでfalseになる  
また 今回は、`for(){ for(){}}`で実装するのは NGという縛りがあります

## どの様に求めるか考える

![考えたこと](/images/43D8A608-67A3-48E2-9600-EFFAEB7E218E_1_201_a-150x150.jpeg)

考えたこと

まず、どの様に求めるかを考えました

X + Y = total(2つ目に指定する値= 求める合計値))  
Xに配列内の値をloopして入れていき、  
total - X でYを求め、Yが配列内にあれば 新たな配列に格納する  
また、配列内が0であればfalseを返す....

```
const f = (parma, total) => {
   const result = parma.reduce((arr, x) => {
      const y = total - x;
       parma.includes(y) && arr.push(x);
       return arr;
    }, []);
    return result.length === 0 ? false : result;
};

console.log(f([1, 9, 10, 3, 4, 2, 6], 8));  // output :  [4, 2, 6]
```

reduceを使用し、Yを求めYがinputした配列に含まれていれば 新たな配列に格納させ、  
その結果次第で 戻り値を判断します  

上記の結果は \[4, 2, 6\] なので求めていたものではありません...  

![考えたこと](/images/43D8A608-67A3-48E2-9600-EFFAEB7E218E_1_201_a-150x150.jpeg)

考えたこと

Xに4が入った場合に、Yの解も4となり  
4はinputした配列に含まれているので trueとなり  
4も配列に格納されてしまう  
  
ここでは、現在 loopの対象となっている値は 含まない様にしたい

```
const f = (parma, total) => {
  const result = parma.reduce((arr, x) => {
     const y = total - x;
     parma.includes(y) && y !== x && arr.push(x);
     return arr;
   }, []);
     return result.length === 0 ? false : result;
};

console.log(f([1, 9, 10, 3, 4, 2, 6], 8));  //output: [2, 6]
console.log(f([1, 9, 10, 3, 4, 2, 6], 3));  // output:  [1, 2]
console.log(f([1, 9, 10, 3, 4, 2, 6], 20));  // output: false
```

reduce内の条件分岐に 条件を追加しました

## indexOfを使用したVer  

![考えたこと<br>](/images/43D8A608-67A3-48E2-9600-EFFAEB7E218E_1_201_a-150x150.jpeg)

考えたこと  

indexOfを使用したケースも考えられそう

```
const f = (parma, total) => {
   const result = parma.reduce((arr, x, index) => {
      const y = total - x;
        if (parma.indexOf(y) !== -1 && parma.indexOf(y) !== index) {
          arr = [y,x];
        }
       return arr;
      }, [])
      return result.length === 0 ? false : result;
 }

console.log(f([1, 9, 10, 3, 4, 2, 6], 8));  //output: [2, 6]
console.log(f([1, 9, 10, 3, 4, 2, 6], 3));  // output:  [1, 2]
console.log(f([1, 9, 10, 3, 4, 2, 6], 20));  // output: false
```

## for文を使用したVer

```
const f = (parma, total) => {
    let arr = [];
    for (let i = 0; i < parma.length; i++) {
      const y = total - parma[i];
    if (parma.includes(y) && parma[i] !== y) {
       arr.push(parma[i]);
    }
 }
   return arr.length === 0 ? false : arr;
}

console.log(f([1, 9, 10, 3, 4, 2, 6], 8));  //output: [2, 6]
console.log(f([1, 9, 10, 3, 4, 2, 6], 3));  // output:  [1, 2]
console.log(f([1, 9, 10, 3, 4, 2, 6], 20));  // output: false
```

## for(){for(){}}で書いてみる  

![考えたこと](/images/43D8A608-67A3-48E2-9600-EFFAEB7E218E_1_201_a-150x150.jpeg)

考えたこと

今回は for文を入れ子にして実装するの、なし という縛りのもとやってたけど  
for文の入れ子バージョンもやってみよう

```
const f = function (parma, target) {
  for (let i = 0; i < parma.length; i++) {
    for (let j = i + 1; j < parma.length; j++) {
      if (parma[i] + parma[j] === target) {
        return [parma[i], parma[j]];
      }
    }
  }
  return false;
};

console.log(f([1, 9, 10, 3, 4, 2, 6], 8));  //output: [2, 6]
console.log(f([1, 9, 10, 3, 4, 2, 6], 3));  // output:  [1, 2]
console.log(f([1, 9, 10, 3, 4, 2, 6], 20));  // output: false
```

今回も さまざまな方法を考え実装してみました!  

* * *

もりけん塾でJavaScriptを学習をしています！  
もりけん先生のTwitter：[https://twitter.com/terrace\_tech](https://twitter.com/terrace_tech)

https://kenjimorita.jp/
