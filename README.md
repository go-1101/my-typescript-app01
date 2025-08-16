# Todoリストアプリケーション

このプロジェクトは、AWS上にデプロイされたシンプルなTodoリストアプリケーションです。TypeScriptとNode.jsで書かれたバックエンドAPIが、Amazon RDSのMySQLデータベースと通信します。冗長性を確保するため、アプリケーションは2台のEC2インスタンスで動作しています。

## 特徴
- **フロントエンド**: HTMLとVanilla JavaScriptによるシンプルなWeb UI。
- **バックエンド**: TypeScript（Node.js/Express）で実装されたRESTful API。
- **データベース**: Amazon RDS (MySQL) を使用。
- **インフラ**: 2つのEC2インスタンスとElastic IPによる冗長構成。

---
### 環境構築とセットアップ

#### 1. 前提条件
- Node.js (v18以上)
- npm (v8以上)
- AWS CLI
- AWSアカウントとIAMユーザー

#### 2. AWSリソースの作成
AWSコンソールで以下のリソースを作成します。
1.  **VPC**: インターネットゲートウェイ、2つのパブリックサブネット、ルートテーブルを作成します。
2.  **セキュリティグループ**:
    - EC2用: ポート22 (SSH) とポート3000 (HTTP) をインバウンドで許可。
    - RDS用: EC2セキュリティグループからのポート3306をインバウンドで許可。
3.  **RDS (MySQL)**: データベース名 `mydb` を持つMySQLインスタンスを作成します。
4.  **EC2インスタンス**: 2つのAmazon Linux 2023インスタンスを起動し、公開鍵認証で接続できるように設定します。

#### 3. 環境変数の設定
プロジェクトのルートに `.env` ファイルを作成し、以下の内容を記述します。

DB_HOST=<RDSエンドポイント>
DB_USER=admin
DB_PASSWORD=<RDSパスワード>
DB_NAME=mydb

#### 4. アプリケーションの起動
1.  EC2インスタンスにSSH接続します。
2.  GitHubからリポジトリをクローンします。
    ```bash
    git clone [https://github.com/](https://github.com/)<あなたのユーザー名>/my-typescript-app01.git
    cd my-typescript-app01
    ```
3.  依存関係をインストールし、アプリケーションを起動します。
    ```bash
    npm install
    npm run build
    npm start
    ```

---
### 使い方

#### 1. Web UIからの操作
ブラウザで、EC2インスタンスのElastic IPアドレスにアクセスしてください。
`http://<EC2インスタンスのIPアドレス>:3000`

#### 2. APIのテスト
`curl`コマンドを使って、APIエンドポイントをテストできます。
- **タスク一覧を取得**:
  ```bash
  curl http://<EC2インスタンスのIPアドレス>:3000/todos
