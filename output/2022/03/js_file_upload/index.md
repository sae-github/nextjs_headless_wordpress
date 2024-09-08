---
title: 'FileAPIを使用して画像のアップロード・プレビューを実装(ドラッグアンドドロップ対応)'
date: '2022-03-07'
categories:
  - 'javascript'
tags:
  - 'javascript'
  - 'プログラミング'
  - '学習記録'
coverImage: 'Frame-5-1.jpg'
---

題の通り `ファイルのアップロード ▶︎プレビュー表示` をvanillaJSで実装しました

## 実装したもの

![](/images/6b7981e5cea2a96d47fe564e89e7e7e0.gif)

ファイルのアップロードは、ドラッグアンドドロップ またはファイル選択ボタンからできる仕様です

## HTML

```
<input type="file" name="file" id="file">
```

✏︎ `multiple`属性を付けると、複数ファイルを指定できる

```
<input type="file" name="file" id="file" multiple>
```

✏︎ accept属性で受け入れるファイルのタイプを指定することができる

```
<input type="file" name="file" id="file" accept=image/*>
```

## JavaScriptで扱う

filesプロパティを使用すると FileLIstオブジェクトへアクセスすることができ、  
選択したファイルの情報を確認することができる

```
file.addEventListener("change",(e) => {
  console.log(e.target.files);
});
```

検証ツールを見てみると、以下のような内容が確認できました

![](/images/スクリーンショット-2022-03-05-14.16.21.png)

`lastModified` … ファイルの最終更新時刻をミリ秒で表す  
`lastModifiedDate` … ファイルの最終更新時刻  
`name` … ファイル名  
`size` … ファイルサイズ(バイト単位)  
`type` … ファイルのタイプ・種類

https://developer.mozilla.org/ja/docs/Web/API/File

## プレビュー表示する

### FileRender

データの読み込みに FileRenderオブジェクトを使用しました

FileRenderは非同期のため、イベントを使用して読み取り結果を取得しました  
今回は、画像のURLを取得するために`readAsDataURL()`を使用しました

loadはエラーなく読み込みが完了した際に発生し、errorはエラーが発生した際に起こるイベント  
loadが起こった際には、`readAsDataURL()`の結果を、`render.result` で取得しました

```
const readerUploadImage = async (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {

    reader.addEventListener('load', () => {
      resolve(reader.result);
    });

    reader.addEventListener("onerror", () => {
      reject(new Error("ファイルの読み込みに失敗しました"));
    });

    reader.readAsDataURL(file);
  });
}
```

読み込み結果を取得できた場合の処理と、エラーだった際の処理を定義しました

```
const handleUploadFile = async (file) => {
  let result;
  try {
   // ファイルの読み込み結果を取得する
    result = await readerUploadImage(file);
  } catch (e) {
    uploadBox.textContent = e;
    return;
  }

  //変更するボタンを有効に切り替え
  changeButton.disabled = false;
  //プレビューの表示を実行する
  showPreviewImage(result);
}

// ファイルが選択された際に実行
fileField.addEventListener('change', (e) => {
  const file = e.target.files[0];
  handleUploadFile(file);
});
```

プレビュー表示するための要素を生成し、  
`<img>`のsrcには`readAsDataURL()`で取得した値を入れ DOMに追加しました

```
const createPreviewImage = (result) => {
  const img = document.createElement("img");
  const uploadPreviewWrapper = document.createElement("div");
  img.src = result;
  uploadPreviewWrapper.appendChild(img);
  return uploadPreviewWrapper;
}

const showPreviewImage = (uri) => {
  uploadBoxInner.style.display = "none";
  uploadBox.appendChild(createPreviewImage(uri));
}
```

## ドラッグアンドドロップの実装

ドラッグアンドドロップで画像のアップロードができるようにAPIを使用して実装しました

https://developer.mozilla.org/ja/docs/Web/API/HTML\_Drag\_and\_Drop\_API

以下のイベントを使用しました

`dragenter` … ドラッグ中のファイルが対象の範囲に入った際に発生する  
`dragover` … ドラッグ中のファイルが対象の範囲上にある場合に数ﾐﾘ秒間隔で発生する  
`dragleave` … ドラッグ中のファイルが対象範囲を離れた場合に発生する  
`drop` … 対象の範囲にドロップされた際に発生する

### classのつけ外し

ドラッグ中のファイルが対象の範囲に入ったことがユーザーに視覚的にわかるように  
class名を付与し、styleに変化を与えました

```
["dragenter", "dragover"].forEach((type) => {
  uploadBox.addEventListener(type, (e) => {
    e.stopPropagation();
    e.preventDefault();
   uploadBox.classList.add("is-drag-over");
  });
});

['dragleave', 'drop'].forEach((type) => {
  uploadBox.addEventListener(type, (e) => {
    e.stopPropagation();
    e.preventDefault();
    uploadBox.classList.remove("is-drag-over");
  });
});
```

```
.is-drag-over {
  border: dashed 3px #daf2fc;
}
```

### dataTransfer

dataTransferプロパティを使用してドラッグしたファイル情報を取得しました  
`dataTransfer.files`はドラッグ操作中のファイルのリストにアクセスすることができるプロパティ

```
uploadBox.addEventListener('drop', (e) => {
  e.stopPropagation();
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  handleUploadFile(file);
});
```

あとは先ほど同様の関数を使用してプレビュー表示します

## 参考サイト

https://developer.mozilla.org/ja/docs/Web/API/File/Using\_files\_from\_web\_applications

https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/

https://blog.shovonhasan.com/using-promises-with-filereader/

https://web.dev/drag-and-drop/
