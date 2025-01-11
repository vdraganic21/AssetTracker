-- Disable foreign key constraints temporarily
SET session_replication_role = 'replica';

-- Delete data in reverse dependency order to handle foreign key constraint
DELETE FROM PositionHistories;
DELETE FROM Zones;
DELETE FROM Assets;
DELETE FROM FloorMaps;

SELECT setval(pg_get_serial_sequence('PositionHistories', 'id'), 1, false);
SELECT setval(pg_get_serial_sequence('Zones', 'id'), 1, false);
SELECT setval(pg_get_serial_sequence('Assets', 'id'), 1, false);
SELECT setval(pg_get_serial_sequence('FloorMaps', 'id'), 1, false);

-- Re-enable foreign key constraints
SET session_replication_role = 'origin';
