#!/bin/bash

DAY=$1

cp src/template.py src/day-$DAY.py
sed -i '' -e "s/day-xx/day-$DAY/g" src/day-$DAY.py

touch input/day-$DAY.txt
touch input/day-$DAY.debug.txt