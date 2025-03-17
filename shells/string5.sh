#!/bin/bash

str="Hello, World, Linux!"
echo "${str:7:5}"


## string6.sh

#!/bin/bash

str="Hello, World, Linux!"
echo $str | cut -c 8-12
