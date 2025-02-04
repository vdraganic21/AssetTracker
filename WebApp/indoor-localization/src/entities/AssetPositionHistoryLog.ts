import { Point } from "./Point";

export class AssetPositionHistoryLog {
    id: number;
    assetId: number;
    facilityId: number;
    position: Point;
    dateTime: Date;
  
    constructor(
      id: number,
      assetId: number,
      facilityId: number,
      position: Point,
      dateTime: Date
    ) {
      this.id = id;
      this.assetId = assetId;
      this.facilityId = facilityId;
      this.position = position;
      this.dateTime = dateTime;
    }
  }
  