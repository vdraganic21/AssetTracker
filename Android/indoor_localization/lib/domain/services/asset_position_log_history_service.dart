import '../mock-repositories/mock_asset_position_history_repository.dart';
import '../entities/asset_position_history_log.dart';

class AssetPositionHistoryLogService {
  static final _logRepo = MockAssetPositionHistoryLogRepository();

  static Future<AssetPositionHistoryLog?> get(int id) async {
    return _logRepo.get(id);
  }

  static Future<List<AssetPositionHistoryLog>> getAll() async {
    return _logRepo.getAll();
  }

  static Future<bool> add(AssetPositionHistoryLog log) async {
    return _logRepo.add(log);
  }

  static Future<bool> delete(int id) async {
    return _logRepo.delete(id);
  }

  static Future<bool> update(AssetPositionHistoryLog log) async {
    return _logRepo.update(log);
  }
}