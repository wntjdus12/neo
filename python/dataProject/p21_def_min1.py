#!/usr/bin/env python

def main(a, b):
    return a if a < b else b


a = int(input("input first number: "))
b = int(input("input second number: "))

print("{} vs {} : Min number = {}".format(a, b, main(a, b)))

