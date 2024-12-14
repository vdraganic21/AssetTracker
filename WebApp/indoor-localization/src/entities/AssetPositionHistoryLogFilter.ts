export class AssetPositionHistoryLogFilter {
    facilityId: number;
    assetId: number;
    startDate: Date;
    endDate: Date;
  
    constructor(
      facilityId: number,
      assetId: number,
      startDate: Date,
      endDate: Date
    ) {
      this.facilityId = facilityId;
      this.assetId = assetId;
      this.startDate = startDate;
      this.endDate = endDate;
    }
  }
  