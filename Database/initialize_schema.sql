DROP TABLE IF EXISTS assetZoneHistory;
DROP TABLE IF EXISTS assetPositionHistory;
DROP TABLE IF EXISTS zones;
DROP TABLE IF EXISTS assets;
DROP TABLE IF EXISTS floorMaps;

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