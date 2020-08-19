npm i
npm run build

aws s3 rm --recursive s3://elfenthlis-decklist-front
aws s3 cp --recursive ./build s3://elfenthlis-decklist-front
aws cloudfront create-invalidation --distribution-id EU5J1Y9PQOFTD --paths "/*"
