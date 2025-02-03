# Database Schemas

This folder contains SQL scripts for managing the database schemas and data for the application.

## Files

- `setup_database.sql`: Creates a database.
- `initialize_schema.sql`: Fills the database with tables.
- `wipe_tables.sql`: Deletes all data from the tables while maintaining foreign key integrity.
- `fill_tables_.sql`: Populates the database with sample data.
- `full_setup_database.sql`: Creates a database and fills it with tables and data.

## Usage

Make sure you have installed postresql and added it to PATH variables.

To setup a filled database use:
psql -U postgres -f setup_database.sql

Then use:
psql -U postgres -f full_setup_database.sql

To setup an empty database use:
psql -U postgres -f setup_database.sql

To fill the database with tables use:
psql -U postgres -d asset_managment -f initialize_schema.sql

To fill the database tables with data use:
psql -U postgres -d asset_managment -f fill_tables.sql

To clear all data from the database:
psql -U postgres -d asset_managment -f wipe_tables.sql

### Database setup for demo showcase

Create database:
psql -U postgres -f setup_database.sql

Fill database with test/demo data:
psql -U postgres -d asset_managment -f fill_database_demo_data.sql

Fill floormaps tables with base64 images:
psql -U postgres -d asset_managment -f fill_floormaps_table.sql

Alter database assets and zones to display practical data (assets and zones that appear as if they have a real function in the facilities):
psql -U postgres -d asset_managment -f fill_finish.sql

## Issues

Since we're using Base64 to store images you cannot easily use SELECT * FROM floorMaps; 
instead you should use psql -U postgres -d asset_managment -c "SELECT * FROM floorMaps;" > output.txt 
which will give you a slightly better overview of what is stored inside that table.