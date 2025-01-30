import { AssetPositionHistoryLog } from "../../../../entities/AssetPositionHistoryLog";

export default class AssetIdleTimeStatsManager {
    private dataset: AssetPositionHistoryLog[]; 
    
    constructor(dataset: AssetPositionHistoryLog[]) {
        this.dataset = dataset;
    }

    public getAvgIdleTime(): number {

        return 0;
    }

    public getMinIdleTime(): number {

        return 0;
    }

    public getMaxIdleTime(): number {

        return 0;
    }
}