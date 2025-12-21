# MarkdownEditor

## CICD Status
[![CICD Workflow](https://github.com/katagiri1999/markdowneditor/actions/workflows/cicd.yaml/badge.svg)](https://github.com/katagiri1999/markdowneditor/actions/workflows/cicd.yaml)

## Sample Application URL
https://www.cloudjex.com

## Summary
markdown管理アプリ用のPublicRepositoryです。  Serverless Architectureを使用した、シンプルなFrontend/Backend構成となります。
Serverlessを採用することで、非常に安価に構築/運用しています。  
OSS Applicationとして公開しておりますので、気軽にご利用ください。

## System Overview
本Repositoryでは以下のFramework/技術要素を使用しています。

| Framework/技術要素 | 言語    | 用途     |
| ------------------ | ------- | -------- |
| FastApi            | Python  | Backend  |
| React              | Node.js | Frontend |
| GithubActions      | shell   | CICD     |
| Terraform          | tf      | CICD     |

<br>

本Repositoryでは以下のサービスを使用しています。以下サービスを用意し、任意の環境にDeployされることを想定しています。  

| サービス       | 用途                                |
| -------------- | ----------------------------------- |
| AWS Lambda     | FastApi実行環境                     |
| AWS ApiGateway | FastApi配信                         |
| AWS S3         | React格納/配信, Terraform State管理 |
| AWS CloudFront | React配信                           |
| AWS DynamoDB   | DB                                  |
| お名前.com     | DNS                                 |

<br>

Architecture
![drowio](markdowneditor.drawio.svg)

## Table Design

### users table
| key     | type   | desctiption | option        |
| ------- | ------ | ----------- | ------------- |
| email   | str    | email       | Partition Key |
| options | object | options     |               |

### trees table
| key   | type   | desctiption  | option        |
| ----- | ------ | ------------ | ------------- |
| email | str    | email        | Partition Key |
| tree  | object | tree content |               |

### nodes table
| key   | type | desctiption | option        |
| ----- | ---- | ----------- | ------------- |
| email | str  | email       | Partition Key |
| id    | str  | node id     | Sort Key      |
| text  | str  | text        |               |
