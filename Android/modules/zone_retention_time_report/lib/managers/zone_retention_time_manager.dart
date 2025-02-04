class AssetZoneHistoryLog {
  final int assetId;
  final int? retentionTime;

  AssetZoneHistoryLog({required this.assetId, this.retentionTime});
}

class ZoneRetentionTimeManager {
  final List<AssetZoneHistoryLog> dataset;

  ZoneRetentionTimeManager(this.dataset);

  List<int> getAssetIdsInDataset() {
    return dataset.map((log) => log.assetId).toSet().toList();
  }

  int getAssetRetentionTime(int assetId) {
    return dataset
        .where((log) => log.assetId == assetId)
        .fold(0, (sum, log) => sum + (log.retentionTime ?? 0));
  }

  double getAvgRetentionTime() {
    if (dataset.isEmpty) return 0;

    final totalRetention = dataset.fold(
        0, (sum, log) => sum + (log.retentionTime ?? 0));
    return totalRetention / dataset.length;
  }

  int getMaxRetentionTime() {
    if (dataset.isEmpty) return 0;

    final assetRetentionTimes = getAssetIdsInDataset()
        .map((assetId) => getAssetRetentionTime(assetId))
        .toList();

    return assetRetentionTimes.reduce((a, b) => a > b ? a : b);
  }

  int getMinRetentionTime() {
    if (dataset.isEmpty) return 0;

    final assetRetentionTimes = getAssetIdsInDataset()
        .map((assetId) => getAssetRetentionTime(assetId))
        .toList();

    return assetRetentionTimes.reduce((a, b) => a < b ? a : b);
  }
}