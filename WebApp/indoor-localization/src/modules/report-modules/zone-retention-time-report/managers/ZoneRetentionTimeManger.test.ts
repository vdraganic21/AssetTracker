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

    
});