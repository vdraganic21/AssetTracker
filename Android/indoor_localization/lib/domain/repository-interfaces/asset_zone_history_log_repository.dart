import 'package:indoor_localization/domain/entities/asset_zone_history_log.dart';
import 'package:indoor_localization/domain/entities/asset_zone_history_log_filter.dart';
import 'package:indoor_localization/domain/repository-interfaces/repository.dart';

abstract class IAssetZoneHistoryLogRepository extends IRepository<AssetZoneHistoryLog> {
  List<AssetZoneHistoryLog> getLogs(AssetZoneHistoryLogFilter assetZoneHistoryLogFilter);
}
