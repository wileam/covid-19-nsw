#!/usr/bin/env bash

cp ./src/dateTime.tpl ./src/dateTime.current

echo $(TZ=Australia/Sydney date +"'%B %d, %Y %T';") >> ./src/dateTime.current

mv ./src/dateTime.current ./src/dateTime.js
