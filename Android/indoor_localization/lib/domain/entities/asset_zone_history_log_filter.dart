class AssetZoneHistoryLogFilter {
  final int zoneId;
  final int assetId;
  final DateTime enterStartDate;
  final DateTime enterEndDate;
  final DateTime exitStartDate;
  final DateTime exitEndDate;
  final int minRetentionTime;
  final int maxRetentionTime;

  AssetZoneHistoryLogFilter({
    required this.zoneId,
    required this.assetId,
    required this.enterStartDate,
    required this.enterEndDate,
    required this.exitStartDate,
    required this.exitEndDate,
    required this.minRetentionTime,
    required this.maxRetentionTime,
  });
}
