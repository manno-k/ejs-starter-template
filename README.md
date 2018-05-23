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
※使用前にgulpfile.js要設定  
※imgフォルダは監視対象外  

#### gulp image
`src/img`内の画像ファイルを圧縮し、`assets/img`に保存します。  
`src/img/svgSprite`内に設置したSVGファイルをSVGスプライトとして`assets/svg`に保存します。  
SVGスプライトのID名、画像は`doc/svg/template.html`に保存されています。

#### gulp test-sass
sass lint を走らせます。

#### gulp style
style guideを作成します。  
sc5-styleguideを走らせてます。  

## コード規約
### Sass
CSS設計にFLOCSSを採用。  
style.scssで、Bootstarp/FontAwesomeの読み込みが可能です。
必要に応じてコメントアウトを解除して下さい。

#### mixin
##### リンクカラー一括制御
```sass
@mixin link_color($color) {
  a, a:visited, a:hover, a:focus, a:active {
    color: $color;
    @content;
  }
}
```
##### IEにのみCSSを当てる
```sass
@mixin ie_only{
  @media all and (-ms-high-contrast: none) {
    *::-ms-backdrop, & {
      @content;
    }
  }
}
```