import { AssetPositionHistoryLog } from "../../../../entities/AssetPositionHistoryLog";
import { Point } from "../../../../entities/Point";
import AssetIdleTimeCounter from "./AssetIdleTimeCounter";

describe('AssetIdleTimeCounter', () => {
    it('should be instanced when given dataset', () => {
        let dataset = [
            new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date()), 
            new AssetPositionHistoryLog(2, 3, 4, new Point(10, 10), new Date()), 
        ];
        let manager = new AssetIdleTimeCounter(dataset);
        
        expect(manager).not.toBeNull();
    });

    it.each([
        {
            description: 'should return empty array given empty dataset',
            dataset: [],
            expectedFacilityIds: [],
        },
        {
            description: 'should return id if single facility in dataset with one log',
            dataset: [            
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date()), 
            ],
            expectedFacilityIds: [1],
        },
        {
            description: 'should return ids if two facilities in dataset with two logs',
            dataset: [            
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date()), 
                new AssetPositionHistoryLog(2, 1, 6, new Point(0, 0), new Date()), 
            ],
            expectedFacilityIds: [1, 6],
        },
        {
            description: 'should return ids facilities in dataset with multiple logs',
            dataset: [            
                new AssetPositionHistoryLog(1, 1, 2, new Point(0, 0), new Date()), 
                new AssetPositionHistoryLog(2, 1, 6, new Point(0, 0), new Date()), 
                new AssetPositionHistoryLog(3, 1, 2, new Point(0, 0), new Date()), 
                new AssetPositionHistoryLog(4, 1, 6, new Point(0, 0), new Date()), 
                new AssetPositionHistoryLog(5, 1, 1, new Point(0, 0), new Date()), 

            ],
            expectedFacilityIds: [2, 6, 1],
        },
    ])('$description', ({ dataset, expectedFacilityIds }) => {
        let manager = new AssetIdleTimeCounter(dataset);
        let facilityIds = manager.getFacilityIdsInDataset();
        expect(facilityIds).toEqual(expectedFacilityIds);
    });

    it.each([
        {
            description: 'should return 0 if dataset is empty',
            dataset: [            
            ],
            expectedAssetIdleTime: 0,
        },
        {
            description: 'should return 0 if dataset has single log',
            dataset: [    
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
            ],
            expectedAssetIdleTime: 0,
        },
        {
            description: 'should return 0 if dataset has no idle time',
            dataset: [    
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(2, 1), new Date(2024, 0, 30, 14, 31, 0)), 
                new AssetPositionHistoryLog(3, 1, 1, new Point(3, 2), new Date(2024, 0, 30, 14, 32, 0)), 
                new AssetPositionHistoryLog(4, 1, 1, new Point(4, 3), new Date(2024, 0, 30, 14, 33, 0)), 
            ],
            expectedAssetIdleTime: 0,
        },
        {
            description: 'should return 0 if dataset has idle time, but in different facilities',
            dataset: [    
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 2, new Point(0, 0), new Date(2024, 0, 30, 14, 31, 0)), 
                new AssetPositionHistoryLog(3, 1, 4, new Point(0, 0), new Date(2024, 0, 30, 14, 32, 0)), 
                new AssetPositionHistoryLog(4, 1, 3, new Point(0, 0), new Date(2024, 0, 30, 14, 33, 0)), 

            ],
            expectedAssetIdleTime: 0,
        },
        {
            description: 'should return idle time if dataset has idle time',
            dataset: [    
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(1, 1), new Date(2024, 0, 30, 14, 31, 0)), 
                new AssetPositionHistoryLog(3, 1, 1, new Point(1, 1), new Date(2024, 0, 30, 14, 32, 0)), 
                new AssetPositionHistoryLog(4, 1, 1, new Point(2, 3), new Date(2024, 0, 30, 14, 33, 0)), 

            ],
            expectedAssetIdleTime: 1,
        },
        {
            description: 'should return idle time if dataset has idle time',
            dataset: [    
                new AssetPositionHistoryLog(1, 1, 1, new Point(1, 1), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(1, 1), new Date(2024, 0, 30, 14, 31, 0)), 
                new AssetPositionHistoryLog(3, 1, 1, new Point(1, 1), new Date(2024, 0, 30, 14, 32, 0)), 
                new AssetPositionHistoryLog(4, 1, 1, new Point(2, 3), new Date(2024, 0, 30, 14, 33, 0)), 
                new AssetPositionHistoryLog(5, 1, 1, new Point(5, 5), new Date(2024, 0, 30, 14, 34, 0)), 
                new AssetPositionHistoryLog(6, 1, 1, new Point(5, 5), new Date(2024, 0, 30, 14, 35, 0)), 
                new AssetPositionHistoryLog(7, 1, 1, new Point(5, 3), new Date(2024, 0, 30, 14, 36, 0)), 
            ],
            expectedAssetIdleTime: 3,
        },
        {
            description: 'should return decimal idle time if dataset has idle time',
            dataset: [    
                new AssetPositionHistoryLog(1, 1, 1, new Point(1, 1), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(1, 1), new Date(2024, 0, 30, 14, 30, 30)), 
                new AssetPositionHistoryLog(3, 1, 1, new Point(1, 1), new Date(2024, 0, 30, 14, 31, 30)), 
                new AssetPositionHistoryLog(4, 1, 1, new Point(2, 3), new Date(2024, 0, 30, 14, 33, 0)), 

            ],
            expectedAssetIdleTime: 1.5,
        },        
    ])('$description', ({ dataset, expectedAssetIdleTime }) => {
        let manager = new AssetIdleTimeCounter(dataset);
        let idleTime = manager.getAssetIdleTime();
        expect(idleTime).toEqual(expectedAssetIdleTime);
    });

    it.each([
        {
            description: 'should return 0 if dataset is empty',
            dataset: [            
            ],
            id: 1,
            expectedFacilityIdleTime: 0,
        },  
        {
            description: 'should return 0 if dataset doesnt have logs for facility',
            dataset: [    
                new AssetPositionHistoryLog(1, 1, 1, new Point(1, 1), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 2, new Point(1, 1), new Date(2024, 0, 30, 14, 30, 30)), 
                new AssetPositionHistoryLog(3, 1, 3, new Point(1, 1), new Date(2024, 0, 30, 14, 31, 30)), 
                new AssetPositionHistoryLog(4, 1, 4, new Point(2, 3), new Date(2024, 0, 30, 14, 33, 0)), 

            ],
            id: 5,
            expectedFacilityIdleTime: 0,
        },
        {
            description: 'should return 0 if dataset doesnt idle time for facility',
            dataset: [    
                new AssetPositionHistoryLog(1, 1, 1, new Point(1, 1), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(2, 1), new Date(2024, 0, 30, 14, 31, 0)), 
                new AssetPositionHistoryLog(3, 1, 1, new Point(3, 1), new Date(2024, 0, 30, 14, 32, 0)), 
                new AssetPositionHistoryLog(4, 1, 1, new Point(1, 3), new Date(2024, 0, 30, 14, 33, 0)), 
                new AssetPositionHistoryLog(5, 1, 1, new Point(1, 4), new Date(2024, 0, 30, 14, 34, 0)), 
                new AssetPositionHistoryLog(6, 1, 1, new Point(1, 5), new Date(2024, 0, 30, 14, 35, 0)), 
            ],
            id: 1,
            expectedFacilityIdleTime: 0,
        },
        {
            description: 'should return idle time if dataset has idle time for facility',
            dataset: [    
                new AssetPositionHistoryLog(1, 1, 1, new Point(1, 1), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(2, 1), new Date(2024, 0, 30, 14, 31, 0)), 
                new AssetPositionHistoryLog(3, 1, 1, new Point(3, 1), new Date(2024, 0, 30, 14, 32, 0)), 
                new AssetPositionHistoryLog(4, 1, 1, new Point(1, 4), new Date(2024, 0, 30, 14, 33, 0)), 
                new AssetPositionHistoryLog(5, 1, 1, new Point(1, 4), new Date(2024, 0, 30, 14, 34, 0)), 
                new AssetPositionHistoryLog(6, 1, 1, new Point(1, 5), new Date(2024, 0, 30, 14, 35, 0)), 
            ],
            id: 1,
            expectedFacilityIdleTime: 1,
        }, 
        {
            description: 'should return idle time if dataset has idle time for facility',
            dataset: [    
                new AssetPositionHistoryLog(1, 1, 1, new Point(1, 1), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(1, 1), new Date(2024, 0, 30, 14, 31, 0)), 
                new AssetPositionHistoryLog(3, 1, 1, new Point(1, 4), new Date(2024, 0, 30, 14, 32, 0)), 
                new AssetPositionHistoryLog(4, 1, 1, new Point(1, 4), new Date(2024, 0, 30, 14, 33, 0)), 
                new AssetPositionHistoryLog(5, 1, 1, new Point(1, 4), new Date(2024, 0, 30, 14, 34, 0)), 
                new AssetPositionHistoryLog(6, 1, 1, new Point(1, 5), new Date(2024, 0, 30, 14, 35, 0)), 
            ],
            id: 1,
            expectedFacilityIdleTime: 3,
        },    
        {
            description: 'should return decimal idle time if dataset has idle time for facility',
            dataset: [    
                new AssetPositionHistoryLog(1, 1, 1, new Point(1, 1), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(1, 1), new Date(2024, 0, 30, 14, 30, 30)), 
                new AssetPositionHistoryLog(3, 1, 1, new Point(1, 4), new Date(2024, 0, 30, 14, 32, 0)), 
                new AssetPositionHistoryLog(4, 1, 1, new Point(1, 4), new Date(2024, 0, 30, 14, 33, 0)), 
                new AssetPositionHistoryLog(5, 1, 1, new Point(1, 4), new Date(2024, 0, 30, 14, 34, 0)), 
                new AssetPositionHistoryLog(6, 1, 1, new Point(1, 5), new Date(2024, 0, 30, 14, 35, 0)), 
            ],
            id: 1,
            expectedFacilityIdleTime: 2.5,
        },     
    ])('$description', ({ dataset, id, expectedFacilityIdleTime }) => {
        let manager = new AssetIdleTimeCounter(dataset);
        let idleTime = manager.getIdleTimeInFacility(id);
        expect(idleTime).toEqual(expectedFacilityIdleTime);
    });
});