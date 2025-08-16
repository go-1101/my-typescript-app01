# Todoリストアプリケーション

このプロジェクトは、AWS上にデプロイされたシンプルなTodoリストアプリケーションです。TypeScriptとNode.jsで書かれたバックエンドAPIが、Amazon RDSのMySQLデータベースと通信します。冗長性を確保するため、アプリケーションは2台のEC2インスタンスで動作しています。

## 特徴
- **フロントエンド**: HTMLとVanilla JavaScriptによるシンプルなWeb UI。
- **バックエンド**: TypeScript（Node.js/Express）で実装されたRESTful API。
- **データベース**: Amazon RDS (MySQL) を使用。
- **インフラ**: 2つのEC2インスタンスとElastic IPによる冗長構成。
