import 'package:indoor_localization/domain/entities/asset_position_history_log.dart';
import 'package:indoor_localization/domain/entities/asset_position_history_log_filter.dart';
import 'package:indoor_localization/domain/repository-interfaces/asset_position_history_log_repository.dart';

class MockAssetPositionHistoryLogRepository implements IAssetPositionHistoryLogRepository {
  static List<AssetPositionHistoryLog> logs = [];

  @override
  AssetPositionHistoryLog? get(int id) {
    return logs.firstWhere((log) => log.id == id);
  }

  @override
  List<AssetPositionHistoryLog> getLogs(AssetPositionHistoryLogFilter filter) {
    return logs.where((log) {
      final isFacilityMatch = filter.facilityId != null
          ? log.facility.id == filter.facilityId
          : true;
      final isAssetMatch = filter.assetId != null
          ? log.asset.id == filter.assetId
          : true;
      final isDateInRange = log.dateTime.isAfter(filter.startDate) &&
          log.dateTime.isBefore(filter.endDate);

      return isFacilityMatch && isAssetMatch && isDateInRange;
    }).toList();
  }

  @override
  List<AssetPositionHistoryLog> getAll() {
    return logs;
  }

  @override
  bool add(AssetPositionHistoryLog log) {
    logs.add(log);
    return true;
  }

  @override
  bool delete(int id) {
    final index = logs.indexWhere((log) => log.id == id);
    if (index != -1) {
      logs.removeAt(index);
      return true;
    }
    return false;
  }

  @override
  bool update(AssetPositionHistoryLog updatedLog) {
    final index = logs.indexWhere((log) => log.id == updatedLog.id);
    if (index != -1) {
      logs[index] = updatedLog;
      return true;
    }
    return false;
  }
}
