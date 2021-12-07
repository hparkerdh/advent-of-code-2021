#!/bin/bash

data=$(<data.txt)
positions=(${data//,/ })
sorted=($(echo "${positions[*]}" | tr " " "\n" | sort -g | tr "\n" " "))
# sorted=($sorted)

start=${sorted[0]}
end=${sorted[${#sorted[@]}-1]}

# setting min to max int value as "seed"
min1=2147483647
min2=2147483647

for (( i=$start; i<=$end; i++ ))
do
  check1=0
  check2=0
  for val in "${sorted[@]}"
  do
    if [[ $(($val - $i)) -lt 0 ]]
    then
      delta=$(($i - $val))
    else
      delta=$(($val - $i))
    fi
    check1=$(($check1 + $delta))
    check2=$(($check2 + ($delta * ($delta + 1) / 2)))
  done
  if [[ $check1 -lt $min1 ]]
  then
    min1=${check1}
  fi
  if [[ $check2 -lt $min2 ]]
  then
    min2=${check2}
  fi
done

echo "Cheapest, part 1: $min1"
echo "Cheapest, part 2: $min2"
