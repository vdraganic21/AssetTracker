import 'package:indoor_localization/entities/asset_zone_history_log.dart';
import 'package:indoor_localization/entities/asset_zone_history_log_filter.dart';
import 'package:indoor_localization/repository-interfaces/repository.dart';

abstract class IAssetZoneHistoryLogRepository extends IRepository<AssetZoneHistoryLog> {
  List<AssetZoneHistoryLog> getLogs(AssetZoneHistoryLogFilter assetZoneHistoryLogFilter);
}
