import '../entities/asset_position_history_log.dart';
import '../../data/repositories/asset_position_history_log_repository.dart';
import '../../data/datasources/remote/asset_position_history_log_datasource.dart';
import 'package:http/http.dart' as http;

class AssetPositionHistoryLogService {
  static final _repository = AssetPositionHistoryLogRepository(
    AssetPositionHistoryLogDataSource(http.Client())
  );

  static Future<AssetPositionHistoryLog?> get(int id) async {
    return _repository.get(id);
  }

  static Future<List<AssetPositionHistoryLog>> getAll() async {
    return _repository.getAll();
  }

  static Future<List<AssetPositionHistoryLog>> getAssetPositionHistory(String assetId) async {
    return _repository.getAssetPositionHistory(assetId);
  }
}