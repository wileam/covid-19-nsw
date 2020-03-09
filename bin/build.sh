#!/usr/bin/env bash

cp ./src/dateTime.tpl ./src/dateTime.current

echo $(TZ=-11 date +"'%B %d, %y %T';") >> ./src/dateTime.current

mv ./src/dateTime.current ./src/dateTime.js
