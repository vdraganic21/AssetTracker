export class AssetPositionHistoryLogFilter {
  facilityId: number | null;
  assetId: number | null;
  startDate: Date | null;
  endDate: Date | null;

  constructor(
    facilityId: number | null,
    assetId: number | null,
    startDate: Date | null,
    endDate: Date | null
  ) {
    this.facilityId = facilityId;
    this.assetId = assetId;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
