import '../entities/asset_position_history_log.dart';
import '../entities/asset_position_history_log_filter.dart';
import '../repository-interfaces/asset_position_history_log_repository.dart';

class MockAssetPositionHistoryLogRepository implements IAssetPositionHistoryLogRepository {
  static List<AssetPositionHistoryLog> logs = [];

  @override
  Future<AssetPositionHistoryLog?> get(int id) async {
    try {
      return logs.firstWhere((log) => log.id == id);
    } catch (e) {
      return null;
    }
  }

  @override
  List<AssetPositionHistoryLog> getLogs(AssetPositionHistoryLogFilter assetPositionHistoryLogFilter) {
    return logs.where((log) {
      final isFacilityMatch = assetPositionHistoryLogFilter.facilityId != null
          ? log.facilityId == assetPositionHistoryLogFilter.facilityId
          : true;
      final isAssetMatch = assetPositionHistoryLogFilter.assetId != null
          ? log.assetId == assetPositionHistoryLogFilter.assetId
          : true;
      final isDateInRange = log.dateTime.isAfter(assetPositionHistoryLogFilter.startDate) &&
          log.dateTime.isBefore(assetPositionHistoryLogFilter.endDate);

      return isFacilityMatch && isAssetMatch && isDateInRange;
    }).toList();
  }

  @override
  Future<List<AssetPositionHistoryLog>> getAll() async {
    return logs;
  }

  @override
  bool add(AssetPositionHistoryLog log)  {
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
  bool update(AssetPositionHistoryLog updatedLog)  {
    final index = logs.indexWhere((log) => log.id == updatedLog.id);
    if (index != -1) {
      logs[index] = updatedLog;
      return true;
    }
    return false;
  }
}