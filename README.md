# EJSスターターテンプレート
静的サイトを効率よく作成するためのEJSスターターテンプレートです。  
npm がインストールされている事が前提条件となります。  
EJSについては下記サイトを参考にして下さい。

- [EJSでサイト制作効率化](https://www.to-r.net/media/ejs-02/)
- [テンプレートエンジンEJSで使える便利な構文まとめ](https://qiita.com/y_hokkey/items/31f1daa6cecb5f4ea4c9#--)
- [Gulp + EJS初心者のつまづきポイントまとめ](https://qiita.com/sygnas/items/6e7472667219522f9757)

## 使用方法
git clone してフォルダ内で  
`npm install`  

## ディレクトリ構成
```
root/
　├ build/
　├ doc/
　└ src/
　　　└ ejs/
　　　└ js/
　　　└ sass/
```
主に`src`内で作業していく形となります。  
build されたファイルは`build`に保存されます。

## EJSについて
### config.json

titleなどの項目は`config.json`に記入することで、`_head.ejs`に挿入されビルドされます。  
親ファイルには下記コードを記入すること。
```js
<%-
include('common/_head', {
page: json['home']
});
%>
```
項目がない場合、デフォルトの項目が出力されます。
例：titleがない場合、デフォルトのtitleが出力される。
```json
  "default": {
    "title": "default title",
    "description": "default description"
  }
```

### Titleタグについて
```javascript
<%= page['title'] %>
<% if(page !== json['home']){ %>
-
<%= json['default']['title'] %><% } %>
```
homeかどうかで、Titleタグの出力が変わるようにしています。

## Gulpについて
gulpfile.jsの File Destinationsに様々なpathを書いていく事ができます。  
brawsersyncのアドレスなどをここで設定して下さい。

### コマンド
#### gulp
brawsersyncが起動。  
※使用前に`gulpfileconfig.js`要設定  

##### 起動しない場合
以下のエラーが出た場合`npx gulp`で解消される場合があります。

```javascript
gulpInst.start.apply(gulpInst, toRun);                   

TypeError: Cannot read property 'apply' of undefined

```

#### Browser syncが表示されない
`build`以下のファイルはgit clone時作成されていません。
gulp起動後`src/ejs/`以下のファイルを一度更新すると、作成されるのでブラウザをリロードすると解消されます。

#### gulp image
`src/img`内の画像ファイルを圧縮し、`assets/img`に保存します。  

## コーディング規約

`doc/`以下に下記のコーディング規約を保存しているため確認してください。

```
coding_guide.md: コーディング規約
css.md: cssコーディング規約
img.md: 画像ファイルの規約
js.md: javascriptに関する規約
```

<!-- 以下、各種リンク -->

[FLOCSS]: https://github.com/hiloki/flocss
[MindBEMding]: https://github.com/juno/bem-methodology-ja/blob/master/definitions.md
[Bootstarp]: https://getbootstrap.com/
[slick]: http://kenwheeler.github.io/slick/
[drawer]: https://github.com/blivesta/drawer
