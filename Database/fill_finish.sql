BEGIN TRANSACTION;

UPDATE Assets
SET
    name = CASE
        --- First Floormap
        WHEN id = 1 THEN 'Lazy Larry'
        WHEN id = 2 THEN 'Robo Dog'
        WHEN id = 3 THEN 'Big Boss'
        WHEN id = 4 THEN 'Pallete Worker'
        WHEN id = 5 THEN 'Sleeping Sam'
        --- Second Floormap
        WHEN id = 6 THEN 'Loading Lorry'
        WHEN id = 7 THEN 'Hydratized Henry'
        WHEN id = 8 THEN 'Janitor Jerry'
        WHEN id = 9 THEN 'Ticketron'
        WHEN id = 10 THEN 'Flightless Fred'
        --- Third Floormap
        WHEN id = 11 THEN 'Cargo Carl'
        WHEN id = 12 THEN 'Diligent Danny'
        WHEN id = 13 THEN 'Storehouse Manager'
        WHEN id = 14 THEN 'Protectron-9000'
        WHEN id = 15 THEN 'Lazy Larry'
        --- Fourth Floormap
        WHEN id = 16 THEN 'Diligent Danny'
        WHEN id = 17 THEN 'Learned Larry'
        WHEN id = 18 THEN 'QA Leader'
        WHEN id = 19 THEN 'Accountant'
        WHEN id = 20 THEN 'Storehouse Manager'
        --- Fifth Floormap
        WHEN id = 21 THEN 'While (1) Windowshop'
        WHEN id = 22 THEN 'Delivery Deril'
        WHEN id = 23 THEN 'Elevator Eddie'
        WHEN id = 24 THEN 'Shopaholic Shannon'
        WHEN id = 25 THEN 'Retail Rita'
        ELSE name
    END,
    active = CASE
        --- First Floormap
        WHEN id = 1 THEN TRUE
        WHEN id = 2 THEN TRUE
        WHEN id = 3 THEN TRUE
        WHEN id = 4 THEN TRUE
        WHEN id = 5 THEN FALSE
        --- Second Floormap
        WHEN id = 6 THEN TRUE
        WHEN id = 7 THEN TRUE
        WHEN id = 8 THEN TRUE
        WHEN id = 9 THEN TRUE
        WHEN id = 10 THEN FALSE
        --- Third Floormap
        WHEN id = 11 THEN TRUE
        WHEN id = 12 THEN TRUE
        WHEN id = 13 THEN FALSE
        WHEN id = 14 THEN FALSE
        WHEN id = 15 THEN FALSE
        --- Fourth Floormap
        WHEN id = 16 THEN TRUE
        WHEN id = 17 THEN TRUE
        WHEN id = 18 THEN FALSE
        WHEN id = 19 THEN FALSE
        WHEN id = 20 THEN FALSE
        --- Fifth Floormap
        WHEN id = 21 THEN TRUE
        WHEN id = 22 THEN TRUE
        WHEN id = 23 THEN TRUE
        WHEN id = 24 THEN TRUE
        WHEN id = 25 THEN TRUE
        ELSE active
    END,
    --- Spawn locations
    x = CASE
        --- First Floormap
        WHEN id = 1 THEN 906
        WHEN id = 2 THEN 318
        WHEN id = 3 THEN 552
        WHEN id = 4 THEN 139
        WHEN id = 5 THEN 944
        --- Second Floormap
        WHEN id = 6 THEN 760
        WHEN id = 7 THEN 238
        WHEN id = 8 THEN 233
        WHEN id = 9 THEN 21
        WHEN id = 10 THEN 599
        --- Third Floormap
        WHEN id = 11 THEN 814
        WHEN id = 12 THEN 730
        WHEN id = 13 THEN 129
        WHEN id = 14 THEN 271
        WHEN id = 15 THEN 253
        --- Fourth Floormap
        WHEN id = 16 THEN 613
        WHEN id = 17 THEN 1468
        WHEN id = 18 THEN 1710
        WHEN id = 19 THEN 623
        WHEN id = 20 THEN 1369
        --- Fifth Floormap
        WHEN id = 21 THEN 1459
        WHEN id = 22 THEN 280
        WHEN id = 23 THEN 195
        WHEN id = 24 THEN 1197
        WHEN id = 25 THEN 710
        ELSE x
    END,
    y = CASE
        --- First Floormap
        WHEN id = 1 THEN 789
        WHEN id = 2 THEN 270
        WHEN id = 3 THEN 107
        WHEN id = 4 THEN 247
        WHEN id = 5 THEN 325
        --- Second Floormap
        WHEN id = 6 THEN 73
        WHEN id = 7 THEN 470
        WHEN id = 8 THEN 146
        WHEN id = 9 THEN 243
        WHEN id = 10 THEN 147
        --- Third Floormap
        WHEN id = 11 THEN 731
        WHEN id = 12 THEN 220
        WHEN id = 13 THEN 867
        WHEN id = 14 THEN 889
        WHEN id = 15 THEN 828
        --- Fourth Floormap
        WHEN id = 16 THEN 632
        WHEN id = 17 THEN 428
        WHEN id = 18 THEN 893
        WHEN id = 19 THEN 199
        WHEN id = 20 THEN 138
        --- Fifth Floormap
        WHEN id = 21 THEN 375
        WHEN id = 22 THEN 989
        WHEN id = 23 THEN 385
        WHEN id = 24 THEN 590
        WHEN id = 25 THEN 145
        ELSE y
    END
WHERE
    id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25);

UPDATE Zones
SET
    name = CASE
        --- Floormap 1
        WHEN id = 1 THEN 'Safe Room'
        WHEN id = 2 THEN 'Office'
        WHEN id = 3 THEN 'Lounge'
        --- Floormap 2
        WHEN id = 4 THEN 'Cargo'
        WHEN id = 5 THEN 'Plane'
        WHEN id = 6 THEN 'Lobby'
        --- Floormap 3
        WHEN id = 7 THEN 'Storage Area'
        WHEN id = 8 THEN 'Packing Area'
        WHEN id = 9 THEN 'Office'
        --- Floormap 4
        WHEN id = 10 THEN 'Conveyor Belt'
        WHEN id = 11 THEN 'Loading Area'
        WHEN id = 12 THEN 'Quality Assurance Room'
        --- Floormap 5
        WHEN id = 13 THEN 'Loading Doc'
        WHEN id = 14 THEN 'Lift Lobby'
        WHEN id = 15 THEN 'Main Lobby'
        ELSE name
    END,
    points = CASE
        --- Floormap 1
        WHEN id = 1 THEN '[{"x": 50, "y": 867}, {"x": 265, "y": 647}]'
        WHEN id = 2 THEN '[{"x": 495, "y": 227}, {"x": 795, "y": 57}]'
        WHEN id = 3 THEN '[{"x": 765, "y": 867}, {"x": 970, "y": 642}]'
        --- Floormap 2
        WHEN id = 4 THEN '[{"x": 811, "y": 134}, {"x": 812, "y": 262}, {"x": 903, "y": 265}, {"x": 905, "y": 26}, {"x": 691, "y": 28}, {"x": 692, "y": 134}]'
        WHEN id = 5 THEN '[{"x": 591, "y": 99}, {"x": 602, "y": 119}, {"x": 610, "y": 153}, {"x": 611, "y": 277}, {"x": 609, "y": 383}, {"x": 607, "y": 435}, {"x": 596, "y": 513}, {"x": 581, "y": 511}, {"x": 569, "y": 436}, {"x": 568, "y": 383}, {"x": 569, "y": 278}, {"x": 569, "y": 156}, {"x": 579, "y": 120}]'
        WHEN id = 6 THEN '[{"x": 120, "y": 539}, {"x": 119, "y": 609}, {"x": 249, "y": 611}, {"x": 248, "y": 537}]'
        --- Floormap 3
        WHEN id = 7 THEN '[{"x": 123, "y": 389}, {"x": 560, "y": 81}]'
        WHEN id = 8 THEN '[{"x": 361, "y": 661}, {"x": 943, "y": 949}]'
        WHEN id = 9 THEN '[{"x": 65, "y": 738}, {"x": 348, "y": 948}]'
        --- Floormap 4
        WHEN id = 10 THEN '[{"x": 493, "y": 597}, {"x": 755, "y": 593}, {"x": 763, "y": 407}, {"x": 1478, "y": 395}, {"x": 1477, "y": 449}, {"x": 808, "y": 449}, {"x": 793, "y": 639}, {"x": 493, "y": 642}]'
        WHEN id = 11 THEN '[{"x": 1474, "y": 362}, {"x": 1728, "y": 582}]'
        WHEN id = 12 THEN '[{"x": 1475, "y": 769}, {"x": 1730, "y": 942}]'
        --- Floormap 5
        WHEN id = 13 THEN '[{"x": 253, "y": 971}, {"x": 575, "y": 1084}]'
        WHEN id = 14 THEN '[{"x": 178, "y": 324}, {"x": 209, "y": 418}]'
        WHEN id = 15 THEN '[{"x": 590, "y": 475}, {"x": 590, "y": 460}, {"x": 676, "y": 372}, {"x": 675, "y": 182}, {"x": 757, "y": 182}, {"x": 757, "y": 372}, {"x": 845, "y": 460}, {"x": 845, "y": 474}, {"x": 899, "y": 484}, {"x": 1217, "y": 485}, {"x": 1215, "y": 640}, {"x": 844, "y": 640}, {"x": 789, "y": 655}, {"x": 756, "y": 660}, {"x": 667, "y": 659}, {"x": 589, "y": 641}, {"x": 121, "y": 638}, {"x": 121, "y": 557}, {"x": 405, "y": 556}, {"x": 569, "y": 476}]'
        ELSE points
    END
WHERE
    id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);

UPDATE FloorMaps
SET
    name = CASE
        WHEN id = 1 THEN 'Warehouse 1'
        WHEN id = 2 THEN 'Hangar'
        WHEN id = 3 THEN 'Warehouse 2'
        WHEN id = 4 THEN 'Warehouse 3'
        WHEN id = 5 THEN 'Shopping Mall'
        ELSE name
    END
WHERE
    id IN(1, 2, 3, 4, 5);

COMMIT;