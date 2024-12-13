class AssetPositionHistoryLogFilter {
  final int facilityId;
  final int assetId;
  final DateTime startDate;
  final DateTime endDate;

  AssetPositionHistoryLogFilter({
    required this.facilityId,
    required this.assetId,
    required this.startDate,
    required this.endDate,
  });
}
