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
    assetCounter INT := 1;
    activeStatus BOOLEAN;
BEGIN
    FOR currentFloorMapId IN 1..5 LOOP
        FOR i IN 1..5 LOOP
            INSERT INTO Assets (floorMapId, name, x, y, active) VALUES
            (currentFloorMapId, 'Asset ' || assetCounter, i * 10, i * 10, (assetCounter % 2 = 0));
            assetCounter := assetCounter + 1;
        END LOOP;
    END LOOP;
END $$;

-- Insert Zones for each FloorMap
DO $$
DECLARE
    currentFloorMapId INT;
    zoneName VARCHAR(100);
    points JSON;
    zoneStartX INT;
    zoneStartY INT;
    zoneWidth INT;
    zoneHeight INT;
BEGIN
    FOR currentFloorMapId IN 1..5 LOOP
        FOR i IN 1..3 LOOP
            -- Randomly determine zone size between 100x100 and 300x300
            zoneWidth := 100 + (random() * 200)::INT;
            zoneHeight := 100 + (random() * 200)::INT;
            
            -- Randomly determine zone start coordinates within 0-700 to ensure full zone fits within 1000x1000
            zoneStartX := (random() * (1000 - zoneWidth))::INT;
            zoneStartY := (random() * (1000 - zoneHeight))::INT;
            
            zoneName := 'Zone ' || i || ' - Floor ' || currentFloorMapId;
            points := json_build_array(
                json_build_object('x', zoneStartX, 'y', zoneStartY),
                json_build_object('x', zoneStartX + zoneWidth, 'y', zoneStartY),
                json_build_object('x', zoneStartX + zoneWidth, 'y', zoneStartY + zoneHeight),
                json_build_object('x', zoneStartX, 'y', zoneStartY + zoneHeight)
            );
            
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
    movementsPerDay INT;
    movementTime TIMESTAMP;
BEGIN
    FOR assetId IN 1..25 LOOP
        SELECT floorMapId INTO currentFloorMapId FROM Assets WHERE id = assetId;

        -- Simulate movements for the past month
        FOR i IN 1..30 LOOP
            currentDateTime := NOW() - INTERVAL '1 month' + INTERVAL '1 day' * i;

            movementsPerDay := 3 + (random() * 7)::INT;

            FOR j IN 1..movementsPerDay LOOP
                -- Spread movements throughout the day
                movementTime := currentDateTime + INTERVAL '1 hour' * (random() * 24)::INT;

                x := (random() * 1000)::INT;
                y := (random() * 1000)::INT;

                INSERT INTO PositionHistories (assetId, floorMapId, x, y, dateTime) VALUES
                (assetId, currentFloorMapId, x, y, movementTime);

                -- Check if the asset entered a zone
                FOR zoneId IN (SELECT id FROM Zones WHERE floorMapId = currentFloorMapId) LOOP
                    -- Retrieve zone coordinates from points JSON
                    DECLARE
                        zonePoints JSON;
                        zoneStartX INT;
                        zoneStartY INT;
                        zoneWidth INT;
                        zoneHeight INT;
                    BEGIN
                        SELECT points INTO zonePoints FROM Zones WHERE id = zoneId;
                        zoneStartX := (zonePoints->0->>'x')::INT;
                        zoneStartY := (zonePoints->0->>'y')::INT;
                        zoneWidth := (zonePoints->1->>'x')::INT - zoneStartX;
                        zoneHeight := (zonePoints->2->>'y')::INT - zoneStartY;

                        IF (x >= zoneStartX AND x <= zoneStartX + zoneWidth AND 
                            y >= zoneStartY AND y <= zoneStartY + zoneHeight) THEN
                            enterDateTime := movementTime;
                            exitDateTime := enterDateTime + INTERVAL '1 hour';
                            retentionTime := EXTRACT(EPOCH FROM (exitDateTime - enterDateTime));

                            INSERT INTO AssetZoneHistory (assetId, zoneId, enterDateTime, exitDateTime, retentionTime) VALUES
                            (assetId, zoneId, enterDateTime, exitDateTime, retentionTime);
                        END IF;
                    END;
                END LOOP;
            END LOOP;
        END LOOP;
    END LOOP;
END $$;