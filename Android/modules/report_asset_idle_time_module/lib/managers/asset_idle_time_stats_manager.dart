import 'package:indoor_localization/domain/entities/asset_position_history_log.dart';
import 'asset_idle_time_counter.dart';

class AssetIdleTimeStatsManager {
  List<AssetPositionHistoryLog> dataset;

  AssetIdleTimeStatsManager(this.dataset);

  Map<int, double> _getIdleTimesByAsset() {
    final assetGroups = <int, List<AssetPositionHistoryLog>>{};
    for (final log in dataset) {
      if (!assetGroups.containsKey(log.assetId)) {
        assetGroups[log.assetId] = [];
      }
      assetGroups[log.assetId]!.add(log);
    }

    final idleTimes = <int, double>{};
    for (final assetId in assetGroups.keys) {
      final counter = AssetIdleTimeCounter(assetGroups[assetId]!);
      idleTimes[assetId] = counter.getAssetIdleTime();
    }
    return idleTimes;
  }

  double getAvgIdleTime() {
    final idleTimes = _getIdleTimesByAsset().values.toList();
    if (idleTimes.isEmpty) return 0;
    return idleTimes.reduce((sum, time) => sum + time) / idleTimes.length;
  }

  double getMinIdleTime() {
    final idleTimes = _getIdleTimesByAsset().values.toList();
    if (idleTimes.isEmpty) return 0;
    return idleTimes.reduce((a, b) => a < b ? a : b);
  }

  double getMaxIdleTime() {
    final idleTimes = _getIdleTimesByAsset().values.toList();
    if (idleTimes.isEmpty) return 0;
    return idleTimes.reduce((a, b) => a > b ? a : b);
  }
}