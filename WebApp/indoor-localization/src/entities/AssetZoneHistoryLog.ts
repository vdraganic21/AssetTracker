export class AssetZoneHistoryLog {
  id: number;
  assetId: number;
  zoneId: number;
  enterDateTime: Date;
  exitDateTime: Date;
  retentionTime: number;

  constructor(
    id: number,
    assetId: number,
    zoneId: number,
    enterDateTime: Date,
    exitDateTime: Date,
    retentionTime: number
  ) {
    this.id = id;
    this.assetId = assetId;
    this.zoneId = zoneId;
    this.enterDateTime = enterDateTime;
    this.exitDateTime = exitDateTime;
    this.retentionTime = retentionTime;
  }
}
