import { AssetPositionHistoryLog } from "../../../../entities/AssetPositionHistoryLog";
import { Point } from "../../../../entities/Point";
import AssetIdleTimeStatsManager from "./AssetIdleTimeStatsManager";

describe('AssetIdleTimeStatsManager', () => {
    it('should be instanced when given dataset', () => {
        let dataset = [
            new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
            new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
        ];
        let manager = new AssetIdleTimeStatsManager(dataset);
        
        expect(manager).not.toBeNull();
    });

    it.each([
        {
            description: 'should return 0 given empty dataset',
            dataset: [],
            expectedMinIdleTime: 0,
        },
        {
            description: 'should return 0 for single log in dataset',
            dataset: [            
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
            ],
            expectedMinIdleTime: 0,
        },
        {
            description: 'should return 0 for continuous logs (no idle time)',
            dataset: [
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(0, 1), new Date(2024, 0, 30, 14, 31, 0)), 
            ],
            expectedMinIdleTime: 0,
        },
        {
            description: 'should return correct idle time two logs',
            dataset: [
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 35, 0)), 
            ],
            expectedMinIdleTime: 300
        },
        {
            description: 'should return smallest idle time for multiple different logs',
            dataset: [
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 35, 0)), 
                new AssetPositionHistoryLog(3, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 40, 0)), 
                new AssetPositionHistoryLog(4, 2, 2, new Point(0, 0), new Date(2024, 0, 30, 14, 40, 0)), 
                new AssetPositionHistoryLog(5, 2, 2, new Point(0, 0), new Date(2024, 0, 30, 14, 41, 0)), 
                new AssetPositionHistoryLog(6, 2, 2, new Point(0, 0), new Date(2024, 0, 30, 14, 42, 0)), 

            ],
            expectedMinIdleTime: 120
        },
    ])('$description', ({ dataset, expectedMinIdleTime }) => {
        let manager = new AssetIdleTimeStatsManager(dataset);
        let minIdleTime = manager.getMinIdleTime();
        expect(minIdleTime).toEqual(expectedMinIdleTime);
    });

    it.each([
        {
            description: 'should return 0 given empty dataset',
            dataset: [],
            expectedMaxIdleTime: 0,
        },
        {
            description: 'should return 0 for single log in dataset',
            dataset: [            
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
            ],
            expectedMaxIdleTime: 0,
        },
        {
            description: 'should return 0 for continuous logs (no idle time)',
            dataset: [
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(0, 1), new Date(2024, 0, 30, 14, 31, 0)), 
            ],
            expectedMaxIdleTime: 0,
        },
        {
            description: 'should return correct idle time for two logs',
            dataset: [
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 35, 0)), 
            ],
            expectedMaxIdleTime: 300,
        },
        {
            description: 'should return largest idle time for multiple logs',
            dataset: [
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 35, 0)), 
                new AssetPositionHistoryLog(3, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 40, 0)), 
                new AssetPositionHistoryLog(4, 2, 2, new Point(0, 0), new Date(2024, 0, 30, 14, 40, 0)), 
                new AssetPositionHistoryLog(5, 2, 2, new Point(0, 0), new Date(2024, 0, 30, 14, 41, 0)), 
                new AssetPositionHistoryLog(6, 2, 2, new Point(0, 0), new Date(2024, 0, 30, 14, 42, 0)), 
            ],
            expectedMaxIdleTime: 600,
        },
    ])('$description', ({ dataset, expectedMaxIdleTime }) => {
        let manager = new AssetIdleTimeStatsManager(dataset);
        let maxIdleTime = manager.getMaxIdleTime();
        expect(maxIdleTime).toEqual(expectedMaxIdleTime);
    });

    it.each([
        {
            description: 'should return 0 given empty dataset',
            dataset: [],
            expectedAvgIdleTime: 0,
        },
        {
            description: 'should return 0 for single log in dataset',
            dataset: [            
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
            ],
            expectedAvgIdleTime: 0,
        },
        {
            description: 'should return 0 for continuous logs (no idle time)',
            dataset: [
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(0, 1), new Date(2024, 0, 30, 14, 31, 0)), 
            ],
            expectedAvgIdleTime: 0,
        },
        {
            description: 'should return correct idle time for two logs',
            dataset: [
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 35, 0)), 
            ],
            expectedAvgIdleTime: 300,
        },
        {
            description: 'should return average idle time for multiple logs',
            dataset: [
                new AssetPositionHistoryLog(1, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 30, 0)), 
                new AssetPositionHistoryLog(2, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 35, 0)), 
                new AssetPositionHistoryLog(3, 1, 1, new Point(0, 0), new Date(2024, 0, 30, 14, 40, 0)), 
                new AssetPositionHistoryLog(4, 2, 2, new Point(0, 0), new Date(2024, 0, 30, 14, 40, 0)), 
                new AssetPositionHistoryLog(5, 2, 2, new Point(0, 0), new Date(2024, 0, 30, 14, 41, 0)), 
                new AssetPositionHistoryLog(6, 2, 2, new Point(0, 0), new Date(2024, 0, 30, 14, 42, 0)), 
            ],
            expectedAvgIdleTime: 360,
        },
    ])('$description', ({ dataset, expectedAvgIdleTime }) => {
        let manager = new AssetIdleTimeStatsManager(dataset);
        let maxIdleTime = manager.getAvgIdleTime();
        expect(maxIdleTime).toEqual(expectedAvgIdleTime);
    });
});