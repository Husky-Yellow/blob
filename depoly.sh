#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'depoly脚本更新'

git config user.name Husky-Yellow
git config user.email s.yellow@foxmail.com

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f https://gitee.com/husky-bear/Blob.git master:gh-pages
git push -f git@github.com:Husky-Yellow/blob.git main:gh-pages
cd -