@echo off
set PGPASSWORD=lucca

psql -U postgres -d asset_managment -f fill_database_demo_data.sql
psql -U postgres -d asset_managment -f fill_floormaps_table.sql
psql -U postgres -d asset_managment -f fill_finish.sql

set PGPASSWORD=
echo Done!
