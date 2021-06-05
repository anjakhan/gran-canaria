#!/bin/bash

rollup -c
terser ./out/adminIndex.js -o ./out/adminIndex.min.js -c -m