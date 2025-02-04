import 'package:indoor_localization/data/datasources/remote/asset_position_history_log_datasource.dart';
import 'package:indoor_localization/domain/entities/asset_position_history_log.dart';

class AssetPositionHistoryLogRepository  {
  final AssetPositionHistoryLogDataSource dataSource;

  AssetPositionHistoryLogRepository(this.dataSource);

  @override
  Future<AssetPositionHistoryLog?> get(int id) async {
    try {
      final historyData = await dataSource.fetchAssetPositionHistory(id.toString());
      if (historyData.isEmpty) return null;
      return AssetPositionHistoryLog.fromJson(historyData.first);
    } catch (e) {
      throw Exception('Failed to get asset position history: $e');
    }
  }

  @override
  Future<List<AssetPositionHistoryLog>> getAll() async {
    try {
      final historyData = await dataSource.fetchAssetPositionHistory('all');
      return historyData.map((data) => AssetPositionHistoryLog.fromJson(data)).toList();
    } catch (e) {
      throw Exception('Failed to get all asset position history: $e');
    }
  }


  @override
  Future<List<AssetPositionHistoryLog>> getAssetPositionHistory(String assetId) async {
    try {
      final historyData = await dataSource.fetchAssetPositionHistory(assetId);
      return historyData.map((data) => AssetPositionHistoryLog.fromJson(data)).toList();
    } catch (e) {
      throw Exception('Failed to get asset position history: $e');
    }
  }
}