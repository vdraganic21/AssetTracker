import { Asset } from "./Asset";
import { Zone } from "./Zone";

export class AssetZoneHistoryLog {
  id: number;
  asset: Asset;
  zone: Zone;
  enterDateTime: Date;
  exitDateTime: Date;
  retentionTime: number;

  constructor(
    id: number,
    asset: Asset,
    zone: Zone,
    enterDateTime: Date,
    exitDateTime: Date,
    retentionTime: number
  ) {
    this.id = id;
    this.asset = asset;
    this.zone = zone;
    this.enterDateTime = enterDateTime;
    this.exitDateTime = exitDateTime;
    this.retentionTime = retentionTime;
  }
}
