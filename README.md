# 世界遺産アプリ

### アプリ概要
- 世界遺産・国の情報が閲覧できるアプリ。
- 世界遺産の画像投稿が可能。
- 行った世界遺産・国を保存できるコレクト機能を搭載。

### 制作背景
海外旅行に行きたいと思っており、大学に進学して旅行を沢山したいと考えていましたが、コロナの拡大により行けなくなってしまいました。
もともと世界遺産に興味があったこともあり、旅行に行けるようになった時の観光の手助けになるアプリを作りたいと思い、世界遺産アプリを制作しました。
また、情報を見るだけでなく、旅行に行く楽しみをもっと増やしたいと思い、コレクト機能も実装しました。


## 使用技術
- フロントエンド
-- HTML/CSS
-- React 16.2.0
-- React Hooks
- バックエンド
-- PHP 7.3.30
-- Laravel 6.20.35


## 機能一覧

### ログイン・新規登録機能
- ログイン機能(管理者/会員/ゲスト)
- ユーザー新規登録機能
- ユーザー情報変更機能
- パスワードリセット機能

### 共通機能
- 国・世界遺産情報閲覧機能
- 人気ランキング機能
- レスポンシブ対応

### 会員限定機能
- 世界遺産コメント機能
- 世界遺産星評価機能
- お気に入り登録機能(国・世界遺産)
- コレクト機能(国・世界遺産)
- 世界遺産情報編集機能(世界遺産名・入場料・写真投稿)

### 管理者限定
- 国情報CRUD機能
- 通貨情報編集機能
- 世界遺産追加機能