#!/usr/bin/env bash

if [[ -n $CI ]]; then
  echo "Building on CI, regenerate the updated date..."
  cp ./src/dateTime.tpl ./src/dateTime.current
  echo $(TZ=Australia/Sydney date +"'%B %d, %Y %T';") >> ./src/dateTime.current
  mv ./src/dateTime.current ./src/dateTime.js

  echo "fetching fetchTables data..."
  ./bin/tables/fetchTables.js
  echo "fetching fetchSponsors data..."
  ./bin/tables/fetchSponsorTables.js
  echo "fetching fetchAirtable data..."
  ./bin/fetchAirtable.js
else
  echo "Not build on CI, ignore the regenerating update date..."
fi
