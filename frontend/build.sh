yarn build
rm -rf ../backend/public/assets/
mkdir -p ../backend/public/
cp -r ./dist/* ../backend/public/
