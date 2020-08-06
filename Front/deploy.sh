npm i
npm run build

aws2 s3 rm --recursive s3://elfenthlis-decklist-front
aws2 s3 cp --recursive ./build s3://elfenthlis-decklist-front
aws2 cloudfront create-invalidation --distribution-id EU5J1Y9PQOFTD --paths "/*"
