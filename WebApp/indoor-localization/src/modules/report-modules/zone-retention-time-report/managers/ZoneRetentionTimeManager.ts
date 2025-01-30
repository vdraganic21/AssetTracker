import { AssetZoneHistoryLog } from "../../../../entities/AssetZoneHistoryLog";

export default class ZoneRetentionTimeManager {
    private dataset: AssetZoneHistoryLog[]; 

    constructor(dataset: AssetZoneHistoryLog[]) {
        this.dataset = dataset;
    }

    public getAssetIdsInDataset(): number[]{

        return [];
    }
    public getAssetRetentionTime(assetId: number): number{

        return 0;
    }
    public getAvgRetentionTime(): number{

        return 0;
    }

    public getMaxRetentionTime(): number{

        return 0;
    }

    public getMinRetentionTime(): number{

        return 0;
    }
}