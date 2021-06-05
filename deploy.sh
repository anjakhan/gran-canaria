#!/bin/bash

./build.sh

mkdir ./dist

cp ./out/adminIndex.min.js ./dist/adminIndex.js
cp ./index.html ./dist/index.html
cp ./styles.css ./dist/styles.css