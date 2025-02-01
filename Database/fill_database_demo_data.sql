DROP TABLE IF EXISTS AssetZoneHistory;
DROP TABLE IF EXISTS PositionHistories;
DROP TABLE IF EXISTS Zones;
DROP TABLE IF EXISTS Assets;
DROP TABLE IF EXISTS FloorMaps;

CREATE TABLE FloorMaps (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(5000000)
);

CREATE TABLE Assets (
    id SERIAL PRIMARY KEY,
    floorMapId INT REFERENCES FloorMaps(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    x INT NOT NULL,
    y INT NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE Zones (
    id SERIAL PRIMARY KEY,
    floorMapId INT REFERENCES FloorMaps(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    points JSON NOT NULL
);

CREATE TABLE PositionHistories (
    id SERIAL PRIMARY KEY,
    assetId INT REFERENCES Assets(id) ON DELETE CASCADE,
    floorMapId INT REFERENCES FloorMaps(id) ON DELETE CASCADE,
    x INT NOT NULL,
    y INT NOT NULL,
    dateTime TIMESTAMP NOT NULL
);

CREATE TABLE AssetZoneHistory (
    id SERIAL PRIMARY KEY,
    assetId INT REFERENCES Assets(id) ON DELETE CASCADE,
    zoneId INT REFERENCES Zones(id) ON DELETE CASCADE,
    enterDateTime TIMESTAMP NOT NULL,
    exitDateTime TIMESTAMP,
    retentionTime INT
);

INSERT INTO FloorMaps (name, image) VALUES
    ('Floor 1', 'data/floor1.png'),
    ('Floor 2', 'data/floor2.png'),
    ('Floor 3', 'data/floor3.png'),
    ('Floor 4', 'data/floor4.png'),
    ('Floor 5', 'data/floor5.png');

DO $$
DECLARE
    currentFloorMapId INT;
    assetName VARCHAR(100);
    activeStatus BOOLEAN;
BEGIN
    FOR currentFloorMapId IN 1..5 LOOP
        FOR i IN 1..5 LOOP
            assetName := 'Asset ' || i;
            activeStatus := (i % 2 = 0);
            INSERT INTO Assets (floorMapId, name, x, y, active) VALUES
            (currentFloorMapId, assetName, i * 10, i * 10, activeStatus);
        END LOOP;
    END LOOP;
END $$;

-- Insert Zones for each FloorMap
DO $$
DECLARE
    currentFloorMapId INT;
    zoneName VARCHAR(100);
    points JSON;
BEGIN
    FOR currentFloorMapId IN 1..5 LOOP
        FOR i IN 1..3 LOOP
            zoneName := 'Zone ' || i || ' - Floor ' || currentFloorMapId;
            points := '[{"x": ' || (i * 20) || ', "y": ' || (i * 20) || '}, {"x": ' || (i * 20 + 10) || ', "y": ' || (i * 20 + 10) || '}]';
            INSERT INTO Zones (floorMapId, name, points) VALUES
            (currentFloorMapId, zoneName, points);
        END LOOP;
    END LOOP;
END $$;

-- Simulate asset movements over the past month
DO $$
DECLARE
    assetId INT;
    currentFloorMapId INT;
    x INT;
    y INT;
    currentDateTime TIMESTAMP;
    enterDateTime TIMESTAMP;
    exitDateTime TIMESTAMP;
    retentionTime INT;
    zoneId INT;
BEGIN
    FOR assetId IN 1..25 LOOP
        SELECT floorMapId INTO currentFloorMapId FROM Assets WHERE id = assetId;

        -- Simulate movements for the past month
        FOR i IN 1..30 LOOP
            currentDateTime := NOW() - INTERVAL '1 month' + INTERVAL '1 day' * i;

            x := (random() * 100)::INT;
            y := (random() * 100)::INT;

            INSERT INTO PositionHistories (assetId, floorMapId, x, y, dateTime) VALUES
            (assetId, currentFloorMapId, x, y, currentDateTime);

            -- Check if the asset entered a zone
            FOR zoneId IN (SELECT id FROM Zones WHERE floorMapId = currentFloorMapId) LOOP
                IF (x BETWEEN 20 AND 30 AND y BETWEEN 20 AND 30) THEN
                    enterDateTime := currentDateTime;
                    exitDateTime := enterDateTime + INTERVAL '1 hour';
                    retentionTime := EXTRACT(EPOCH FROM (exitDateTime - enterDateTime));

                    INSERT INTO AssetZoneHistory (assetId, zoneId, enterDateTime, exitDateTime, retentionTime) VALUES
                    (assetId, zoneId, enterDateTime, exitDateTime, retentionTime);
                END IF;
            END LOOP;
        END LOOP;
    END LOOP;
END $$;