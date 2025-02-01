import { AssetPositionHistoryLog } from "../../../../entities/AssetPositionHistoryLog";

export default class AssetIdleTimeCounter {
  private dataset: AssetPositionHistoryLog[];

  constructor(dataset: AssetPositionHistoryLog[]) {
    this.dataset = dataset.sort(
      (a, b) => a.dateTime.getTime() - b.dateTime.getTime()
    );
  }

  public getAssetIdleTime(): number {
    let totalIdleTime = 0;
    for (let i = 1; i < this.dataset.length; i++) {
      if (
        this.dataset[i - 1].facilityId === this.dataset[i].facilityId &&
        this.isIdle(this.dataset[i - 1], this.dataset[i])
      ) {
        totalIdleTime += this.getTimeDifference(
          this.dataset[i - 1],
          this.dataset[i]
        );
      }
    }
    return totalIdleTime;
  }

  public getFacilityIdsInDataset(): number[] {
    return [...new Set(this.dataset.map((log) => log.facilityId))];
  }

  public getIdleTimeInFacility(id: number): number {
    const facilityLogs = this.dataset.filter((log) => log.facilityId === id);
    let idleTime = 0;
    for (let i = 1; i < facilityLogs.length; i++) {
      if (this.isIdle(facilityLogs[i - 1], facilityLogs[i])) {
        idleTime += this.getTimeDifference(
          facilityLogs[i - 1],
          facilityLogs[i]
        );
      }
    }
    return idleTime;
  }

  private isIdle(
    prevLog: AssetPositionHistoryLog,
    currentLog: AssetPositionHistoryLog
  ): boolean {
    return (
      prevLog.position.x === currentLog.position.x &&
      prevLog.position.y === currentLog.position.y
    );
  }

  private getTimeDifference(
    prevLog: AssetPositionHistoryLog,
    currentLog: AssetPositionHistoryLog
  ): number {
    return (currentLog.dateTime.getTime() - prevLog.dateTime.getTime()) / 1000;
  }
}
