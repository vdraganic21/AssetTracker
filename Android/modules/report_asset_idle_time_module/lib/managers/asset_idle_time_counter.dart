import 'package:indoor_localization/domain/entities/asset_position_history_log.dart';

class AssetIdleTimeCounter {
  late List<AssetPositionHistoryLog> dataset;

  AssetIdleTimeCounter(List<AssetPositionHistoryLog> dataset) {
    this.dataset = List.from(dataset)
      ..sort((a, b) => a.dateTime.compareTo(b.dateTime));
  }

  double getAssetIdleTime() {
    double totalIdleTime = 0;
    for (int i = 1; i < dataset.length; i++) {
      bool isIdle = _isIdle(dataset[i - 1], dataset[i]);
      double diff = _getTimeDifference(dataset[i - 1], dataset[i]);

      print("Asset ${dataset[i].assetId} - Idle Check: $isIdle, Time Diff: $diff sec");

      if (dataset[i - 1].facilityId == dataset[i].facilityId && isIdle) {
        print("Facility Change: Prev(${dataset[i - 1].facilityId}) -> Curr(${dataset[i].facilityId})");
        totalIdleTime += diff;
      }
    }
    print("Total Idle Time: $totalIdleTime");
    return totalIdleTime;
  }

  List<int> getFacilityIdsInDataset() {
    return dataset.map((log) => log.facilityId).toSet().toList();
  }

  double getIdleTimeInFacility(int id) {
    final facilityLogs = dataset.where((log) => log.facilityId == id).toList();
    double idleTime = 0;
    for (int i = 1; i < facilityLogs.length; i++) {
      if (_isIdle(facilityLogs[i - 1], facilityLogs[i])) {
        idleTime += _getTimeDifference(facilityLogs[i - 1], facilityLogs[i]);
      }
    }
    return idleTime;
  }

  bool _isIdle(AssetPositionHistoryLog prevLog, AssetPositionHistoryLog currentLog) {
    print("Checking idle: Prev(${prevLog.position.x}, ${prevLog.position.y}) vs Curr(${currentLog.position.x}, ${currentLog.position.y})");
    return prevLog.position.x == currentLog.position.x &&
        prevLog.position.y == currentLog.position.y;
  }

  double _getTimeDifference(AssetPositionHistoryLog prevLog, AssetPositionHistoryLog currentLog) {
    return currentLog.dateTime.difference(prevLog.dateTime).inSeconds.toDouble();
  }
}
