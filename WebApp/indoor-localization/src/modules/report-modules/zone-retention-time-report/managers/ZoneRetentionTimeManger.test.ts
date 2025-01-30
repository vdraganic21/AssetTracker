import { AssetZoneHistoryLog } from "../../../../entities/AssetZoneHistoryLog";
import ZoneRetentionTimeManager from "./ZoneRetentionTimeManager";

describe('ZoneRetentionTimeManager', () => {
    it('should accept list of zone retention logs in constructor', () => {
        let dataset = [
            new AssetZoneHistoryLog(1, 1, 1, new Date(), new Date(), 5), 
            new AssetZoneHistoryLog(2, 2, 2, new Date(), new Date(), 5)
        ];
        let manager = new ZoneRetentionTimeManager(dataset);
        
        expect(manager).not.toBeNull();
    });

    it.each([
        {
            description: 'should return empty array given empty dataset',
            dataset: [],
            expectedAssetIds: [],
        },
        {
            description: 'should return asset id given one log',
            dataset: [new AssetZoneHistoryLog(1, 1, 1, new Date(), new Date(), 5)],
            expectedAssetIds: [1],
        },
        {
            description: 'should return asset id given multiple logs with same id',
            dataset: [
                new AssetZoneHistoryLog(1, 2, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(2, 2, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(3, 2, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(4, 2, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(5, 2, 1, new Date(), new Date(), 5),
            ],
            expectedAssetIds: [1],
        },
        {
            description: 'should return asset ids given two logs with unique ids',
            dataset: [
                new AssetZoneHistoryLog(1, 1, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(2, 2, 2, new Date(), new Date(), 5),
            ],
            expectedAssetIds: [1, 2],
        },
        {
            description: 'should return asset ids given mutlitple logs with unique ids',
            dataset: [
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(2, 2, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(3, 3, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(4, 1, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(5, 2, 1, new Date(), new Date(), 5),
            ],
            expectedAssetIds: [3,2,1],
        }, 
    ])('$description', ({ dataset, expectedAssetIds }) => {
        let manager = new ZoneRetentionTimeManager(dataset);
        let assetIds = manager.getAssetIdsInDataset();
        expect(assetIds).toEqual(expectedAssetIds);
    });

    it.each([
        {
            description: 'should return 0 if getting asset retention time from empty dataset',
            dataset: [],
            id: 1,
            expectedRetentionTime: 0,
        },
        {
            description: 'should return 0 if getting asset retention time from dataset with no logs for asset',
            dataset: [
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(2, 2, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(3, 3, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(4, 1, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(5, 2, 1, new Date(), new Date(), 5),
            ],
            id: 22,
            expectedRetentionTime: 0,
        },
        {
            description: 'should return retention time if getting asset retention time from dataset with log for asset',
            dataset: [
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5),
            ],
            id: 3,
            expectedRetentionTime: 5,
        },
        {
            description: 'should return sum of retention times if getting asset retention time from dataset with multiple logs for asset',
            dataset: [
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 15),
            ],
            id: 3,
            expectedRetentionTime: 20,
        },
        {
            description: 'should return sum of retention times if getting asset retention time from dataset with multiple logs for different asset',
            dataset: [
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(1, 2, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 15),
                new AssetZoneHistoryLog(1, 1, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(1, 4, 1, new Date(), new Date(), 45),
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5),
            ],
            id: 3,
            expectedRetentionTime: 25,
        },
        {
            description: 'should return decimal sum of retention times if getting asset retention time from dataset with multiple logs for different asset',
            dataset: [
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 0.5),
                new AssetZoneHistoryLog(1, 2, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 1.5),
                new AssetZoneHistoryLog(1, 1, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(1, 4, 1, new Date(), new Date(), 45),
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 0.5),
            ],
            id: 3,
            expectedRetentionTime: 2.5,
        },
    ])('$description', ({ dataset, id, expectedRetentionTime }) => {
        let manager = new ZoneRetentionTimeManager(dataset);
        let assetRetentionTime = manager.getAssetRetentionTime(id);
        expect(assetRetentionTime).toEqual(expectedRetentionTime);
    });

    it.each([
        {
            description: 'should return 0 for max retention time given empty dataset',
            dataset: [
            ],
            expectedMaxRetentionTime: 0,
        },
        {
            description: 'should return max retention time if getting time from dataset with single log',
            dataset: [
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5),
            ],
            expectedMaxRetentionTime: 5,
        },
        {
            description: 'should return decimal max retention time if getting time from dataset with single log',
            dataset: [
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5.3),
            ],
            expectedMaxRetentionTime: 5.3,
        },
        {
            description: 'should return max retention timegiven dataset with multiple logs',
            dataset: [
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5.3),
            ],
            expectedMaxRetentionTime: 15.3,
        },
        {
            description: 'should return max retention time given dataset with multiple logs',
            dataset: [
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5.3),
            ],
            expectedMaxRetentionTime: 15.3,
        },
        {
            description: 'should return max retention time given dataset with multiple logs with different asset ids',
            dataset: [
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(1, 1, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5),
                new AssetZoneHistoryLog(1, 4, 1, new Date(), new Date(), 55),
                new AssetZoneHistoryLog(1, 3, 1, new Date(), new Date(), 5.3),
                new AssetZoneHistoryLog(1, 4, 1, new Date(), new Date(), 1),
            ],
            expectedMaxRetentionTime: 56,
        },
    ])('$description', ({ dataset, expectedMaxRetentionTime }) => {
        let manager = new ZoneRetentionTimeManager(dataset);
        let assetRetentionTime = manager.getMaxRetentionTime();
        expect(assetRetentionTime).toEqual(expectedMaxRetentionTime);
    });
});