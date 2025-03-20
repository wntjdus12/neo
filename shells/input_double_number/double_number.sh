#!/bin/bash

read -p "input number: " number

if [[ ! "$number" =~ ^[0-9]+$ ]]; then
    echo "Please enter numbers only."
    exit 1
fi

result=$((number * 2))s

echo "Input number : $number"
echo "Double the entered number : $result"