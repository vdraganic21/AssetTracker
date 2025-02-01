import { AssetPositionHistoryLog } from "../../../../entities/AssetPositionHistoryLog";
import AssetIdleTimeCounter from "./AssetIdleTimeCounter";

export default class AssetIdleTimeStatsManager {
  private dataset: AssetPositionHistoryLog[];

  constructor(dataset: AssetPositionHistoryLog[]) {
    this.dataset = dataset;
  }

  private getIdleTimesByAsset(): Record<number, number> {
    const assetGroups: Record<number, AssetPositionHistoryLog[]> = {};
    this.dataset.forEach((log) => {
      if (!assetGroups[log.assetId]) {
        assetGroups[log.assetId] = [];
      }
      assetGroups[log.assetId].push(log);
    });

    const idleTimes: Record<number, number> = {};
    for (const assetId in assetGroups) {
      const counter = new AssetIdleTimeCounter(assetGroups[assetId]);
      idleTimes[Number(assetId)] = counter.getAssetIdleTime();
    }
    return idleTimes;
  }

  public getAvgIdleTime(): number {
    const idleTimes = Object.values(this.getIdleTimesByAsset());
    if (idleTimes.length === 0) return 0;
    return idleTimes.reduce((sum, time) => sum + time, 0) / idleTimes.length;
  }

  public getMinIdleTime(): number {
    const idleTimes = Object.values(this.getIdleTimesByAsset());
    if (idleTimes.length === 0) return 0;
    return Math.min(...idleTimes);
  }

  public getMaxIdleTime(): number {
    const idleTimes = Object.values(this.getIdleTimesByAsset());
    if (idleTimes.length === 0) return 0;
    return Math.max(...idleTimes);
  }
}
