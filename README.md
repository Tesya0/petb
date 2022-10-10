# Pet B

[Pet B](https://petb.net)  
ペット愛好家のための趣味アプリサイト。

## 技術選定

- Next.js(React)
- TypeScript
- styled-components
- GSAP3
- next-i18next
- date-fns, date-fns-tz
- SWR
- Dog API
- microCMS
- Vercel

## 所感

構想〜公開まで約2週間ほど。  
犬種名検定というアプリをDog APIを使用し開発。  
クイズ自体は割とスムーズに実装できましたが、APIで受け取る情報は全て英語なので、英語→日本語に訳すための辞書作成に時間を浪費しました(next-i18next使用)。  
なおSWRを使用してfetchしています。  
お知らせもmicroCMSで管理しているので、JAMStackな構成になっております。  
Vercelにデプロイするとタイムゾーンのずれが生じるので、date-fnsとdate-fns-tzでフォーマット。  
下記URLを参考にセキュリティヘッダーも設定。  
https://zenn.dev/heavenosk/scraps/1e0b5d88b7a135  

## 将来的な実装

スピード重視で開発したのでまずはリファクタリングとアニメーション実装を行いたいです。  
その後は犬種名検定の各難易度ごとの実装や同サービス内で構想中の新アプリ開発も視野に入れ、場合によっては Auth0 などを使い会員システムも導入したいです。
