#!/bin/bash

database='gigsdb'

echo "Configuring database: $database"

dropdb -U postgres gigsdb
createdb -U postgres gigsdb

psql -U postgres gigsdb < ./sql_db/gigsdb.sql

echo "$database configured"
