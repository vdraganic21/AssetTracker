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
});