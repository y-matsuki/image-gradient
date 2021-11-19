# image-gradient

[Cloud Vision API](https://cloud.google.com/vision/)を使用して画像ファイルからカラーコードを取得するサンプル

## クイックスタート
1. Cloud Vision APIを利用する準備をする
   - https://cloud.google.com/vision/docs/setup
2. 取得したJSONファイルのパスを.env.localファイルに記述
3. インストールと起動
   ```
   yarn install
   yarn dev
   ```
4. http://localhost:3000/ にアクセス

## 使用したライブラリ
- ドラッグ&ドロップ(react-dropzone)
  - https://react-dropzone.js.org/
- APIでファイルを受け取る(formidable)
  - https://github.com/node-formidable/formidable

## 類似の機能をクライアントのみで実現するライブラリ
- https://github.com/Vibrant-Colors/node-vibrant
- https://github.com/lokesh/color-thief
