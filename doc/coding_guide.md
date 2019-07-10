## コーディング規約

- Sass
  - npm stylelint-scss
  - recommended準拠
  - no-descending-specificity:null

## インデント管理
[Editorconfig](https://editorconfig.org/)を使用します。
エディターの設定をお願いします。
[設定参考URL](https://qiita.com/naru0504/items/82f09881abaf3f4dc171#phpstorm)

## フォルダ構成
圧縮前のファイルは `src` に保存する。
圧縮後のファイルは `build/assets`に保存する。

## テンプレート作成にあたっての留意点

- html,ejs,css,jsを編集する際、不要なファイルや不要なクラスは削除して頂いて構いません。
- プラグインの追加をする場合は、追加したプラグインの詳細等をRedmineに記す事。

## 問い合わせフォーム等でphpを使用する場合

src内に設置した場合buildされないので、build内に直接配置する。
またその旨をredmineの該当チケットに記載する事。

## その他
### Contact Form
- [【MailForm01】多機能メールフォーム（フリー版）](https://www.php-factory.net/mail/01.php)
### 地図
- [Google Maps](https://goo.gl/maps/voAb3VKKewj) : HTMLタグでの埋め込み
