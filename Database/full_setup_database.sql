-- Create the database
CREATE DATABASE asset_managment;

\c asset_managment

-- Create tables
CREATE TABLE floorMaps (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image TEXT
);

CREATE TABLE assets (
    id SERIAL PRIMARY KEY,
    floorMapId INT REFERENCES floorMaps(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    x INT NOT NULL,
    y INT NOT NULL,
    lastSync TIMESTAMP DEFAULT NOW(),
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE zones (
    id SERIAL PRIMARY KEY,
    floorMapId INT REFERENCES floorMaps(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    points JSON NOT NULL
);

CREATE TABLE assetPositionHistory (
    id SERIAL PRIMARY KEY,
    assetId INT REFERENCES assets(id) ON DELETE CASCADE,
    floorMapId INT REFERENCES floorMaps(id) ON DELETE CASCADE,
    x INT NOT NULL,
    y INT NOT NULL,
    dateTime TIMESTAMP NOT NULL
);

CREATE TABLE assetZoneHistory (
    id SERIAL PRIMARY KEY,
    assetId INT REFERENCES assets(id) ON DELETE CASCADE,
    zoneId INT REFERENCES zones(id) ON DELETE CASCADE,
    enterDateTime TIMESTAMP NOT NULL,
    exitDateTime TIMESTAMP,
    retentionTime INT
);

-- Insert initial data
INSERT INTO floorMaps (name, image) VALUES
    ('Ground Floor', 'image1.png'),
    ('First Floor', 'image2.png');

INSERT INTO assets (floorMapId, name, x, y, active) VALUES
    (1, 'Asset 1', 100, 200, TRUE),
    (1, 'Asset 2', 300, 400, TRUE),
    (2, 'Asset 3', 500, 600, FALSE);

INSERT INTO zones (floorMapId, name, points) VALUES
    (1, 'Zone A', '[{"x": 0, "y": 0}, {"x": 100, "y": 0}, {"x": 100, "y": 100}, {"x": 0, "y": 100}]'),
    (2, 'Zone B', '[{"x": 200, "y": 200}, {"x": 300, "y": 200}, {"x": 300, "y": 300}, {"x": 200, "y": 300}]');

INSERT INTO assetPositionHistory (assetId, floorMapId, x, y, dateTime) VALUES
    (1, 1, 110, 210, '2024-12-24 10:00:00'),
    (1, 1, 120, 220, '2024-12-24 11:00:00'),
    (2, 1, 310, 410, '2024-12-24 12:00:00');

INSERT INTO assetZoneHistory (assetId, zoneId, enterDateTime, exitDateTime, retentionTime) VALUES
    (1, 1, '2024-12-24 09:00:00', '2024-12-24 09:30:00', 30),
    (2, 2, '2024-12-24 10:00:00', '2024-12-24 10:45:00', 45);