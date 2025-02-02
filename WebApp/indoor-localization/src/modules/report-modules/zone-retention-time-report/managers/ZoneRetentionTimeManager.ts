import { AssetZoneHistoryLog } from "../../../../entities/AssetZoneHistoryLog";

export default class ZoneRetentionTimeManager {
  private dataset: AssetZoneHistoryLog[];

  constructor(dataset: AssetZoneHistoryLog[]) {
    this.dataset = dataset;
  }

  public getAssetIdsInDataset(): number[] {
    return [...new Set(this.dataset.map((log) => log.assetId))];
  }

  public getAssetRetentionTime(assetId: number): number {
    return this.dataset
      .filter((log) => log.assetId === assetId)
      .reduce((sum, log) => sum + (log.retentionTime || 0), 0);
  }

  public getAvgRetentionTime(): number {
    if (this.dataset.length === 0) return 0;

    const totalRetention = this.dataset.reduce(
      (sum, log) => sum + (log.retentionTime || 0),
      0
    );
    return totalRetention / this.dataset.length;
  }

  public getMaxRetentionTime(): number {
    if (this.dataset.length === 0) return 0;

    const assetRetentionTimes = this.getAssetIdsInDataset().map((assetId) =>
      this.getAssetRetentionTime(assetId)
    );

    return Math.max(...assetRetentionTimes);
  }

  public getMinRetentionTime(): number {
    if (this.dataset.length === 0) return 0;

    const assetRetentionTimes = this.getAssetIdsInDataset().map((assetId) =>
      this.getAssetRetentionTime(assetId)
    );

    return Math.min(...assetRetentionTimes);
  }
}
