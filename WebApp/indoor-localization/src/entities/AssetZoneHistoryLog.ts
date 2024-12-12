import { Asset } from "./Asset";
import { Facility } from "./Facility";
import { Point } from "./Point";

export class AssetZoneHistoryLog {
    id: number;
    asset: Asset;
    facility: Facility;
    position: Point;
    dateTime: Date;
  
    constructor(
      id: number,
      asset: Asset,
      facility: Facility,
      position: Point,
      dateTime: Date
    ) {
      this.id = id;
      this.asset = asset;
      this.facility = facility;
      this.position = position;
      this.dateTime = dateTime;
    }
  }
  