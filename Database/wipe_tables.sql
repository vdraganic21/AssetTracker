-- Disable foreign key constraints temporarily
SET session_replication_role = 'replica';

-- Delete data in reverse dependency order to handle foreign key constraint
DELETE FROM assetPositionHistory;
DELETE FROM zones;
DELETE FROM assets;
DELETE FROM floorMaps;

SELECT setval(pg_get_serial_sequence('assetPositionHistory', 'id'), 1, false);
SELECT setval(pg_get_serial_sequence('zones', 'id'), 1, false);
SELECT setval(pg_get_serial_sequence('assets', 'id'), 1, false);
SELECT setval(pg_get_serial_sequence('floorMaps', 'id'), 1, false);

-- Re-enable foreign key constraints
SET session_replication_role = 'origin';
