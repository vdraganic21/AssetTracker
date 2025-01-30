import { AssetPositionHistoryLog } from "../../../../entities/AssetPositionHistoryLog";

export default class AssetIdleTimeCounter {
    private dataset: AssetPositionHistoryLog[]; 
    
    constructor(dataset: AssetPositionHistoryLog[]) {
        this.dataset = dataset;
    }

    public getAssetIdleTime(): number {

        return 0;
    }

    public getFacilityIdsInDataset(): number[] {

        return [];
    }

    public getIdleTimeInFacility(id: number): number {

        return 0;
    }
}