import 'package:indoor_localization/domain/entities/zone.dart';
import 'Asset.dart';

class AssetZoneHistoryLog {
  final int id;
  final Asset asset;
  final Zone zone;
  final DateTime enterDateTime;
  final DateTime exitDateTime;
  final int retentionTime;

  AssetZoneHistoryLog({
    required this.id,
    required this.asset,
    required this.zone,
    required this.enterDateTime,
    required this.exitDateTime,
    required this.retentionTime,
  });
}
