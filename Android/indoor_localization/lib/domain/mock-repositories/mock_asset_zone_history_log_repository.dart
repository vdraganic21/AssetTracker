import 'package:indoor_localization/domain/entities/asset_zone_history_log.dart';
import 'package:indoor_localization/domain/entities/asset_zone_history_log_filter.dart';
import 'package:indoor_localization/domain/repository-interfaces/asset_zone_history_log_repository.dart';
/*
class MockAssetZoneHistoryLogRepository implements IAssetZoneHistoryLogRepository {
  static final List<AssetZoneHistoryLog> _logs = [];

  @override
  AssetZoneHistoryLog? get(int id) {
    return _logs.firstWhere((log) => log.id == id);
  }

  @override
  List<AssetZoneHistoryLog> getLogs(AssetZoneHistoryLogFilter filter) {
    return _logs.where((log) {
      final isZoneMatch = filter.zoneId != null ? log.zone.id == filter.zoneId : true;
      final isAssetMatch = filter.assetId != null ? log.asset.id == filter.assetId : true;
      final isEnterDateInRange = log.enterDateTime.isAfter(filter.enterStartDate) &&
          log.enterDateTime.isBefore(filter.enterEndDate);
      final isExitDateInRange = log.exitDateTime.isAfter(filter.exitStartDate) &&
          log.exitDateTime.isBefore(filter.exitEndDate);

      return isZoneMatch && isAssetMatch && isEnterDateInRange && isExitDateInRange;
    }).toList();
  }

  @override
  List<AssetZoneHistoryLog> getAll() {
    return _logs;
  }

  @override
  bool add(AssetZoneHistoryLog log) {
    _logs.add(log);
    return true;
  }

  @override
  bool delete(int id) {
    final index = _logs.indexWhere((log) => log.id == id);
    if (index != -1) {
      _logs.removeAt(index);
      return true;
    }
    return false;
  }

  @override
  bool update(AssetZoneHistoryLog updatedLog) {
    final index = _logs.indexWhere((log) => log.id == updatedLog.id);
    if (index != -1) {
      _logs[index] = updatedLog;
      return true;
    }
    return false;
  }
}

 */


