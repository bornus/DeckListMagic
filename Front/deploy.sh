npm i
npm run build

aws2 s3 rm --recursive s3://ftn-developer-portal-dashboard
aws2 s3 cp --recursive ./build s3://ftn-developer-portal-dashboard
aws2 cloudfront create-invalidation --distribution-id E26G0G8PLJO9OS --paths "/*"