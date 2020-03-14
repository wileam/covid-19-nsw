#!/usr/bin/env bash

if [[ -n $CI ]]; then
  echo "Building on CI, regenerate the updated date..."
  cp ./src/dateTime.tpl ./src/dateTime.current
  echo $(TZ=Australia/Sydney date +"'%B %d, %Y %T';") >> ./src/dateTime.current
  mv ./src/dateTime.current ./src/dateTime.js
else
  echo "Not build on CI, ignore the regenerating update date..."
fi
