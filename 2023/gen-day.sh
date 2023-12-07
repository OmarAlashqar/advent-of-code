#!/bin/bash

DAY=$1

cp src/day-xx.template.ts src/day-$1.ts
sed -i "s/day-xx.txt/day-$1.txt/" src/day-$1.ts

touch input/day-$1.txt
touch input/day-$1.debug.txt