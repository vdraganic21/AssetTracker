import 'package:indoor_localization/entities/asset_position_history_log.dart';
import 'package:indoor_localization/entities/asset_position_history_log_filter.dart';
import 'package:indoor_localization/repository-interfaces/repository.dart';

abstract class IAssetPositionHistoryLogRepository extends IRepository<AssetPositionHistoryLog> {
  List<AssetPositionHistoryLog> getLogs(AssetPositionHistoryLogFilter filter);
}
