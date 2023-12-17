#!/bin/bash

DAY=$1

cp src/day-xx.template.ts src/day-$1.ts
sed -i "s/day-xx/day-$1/g" src/day-$1.ts

touch input/day-$1.txt
touch input/day-$1.debug.txt