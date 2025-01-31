import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/entities/facility.dart';

class AssetPositionHistoryLog {
  final int id;
  final Asset asset;
  final Facility facility;
  int x;
  int y;
  final DateTime dateTime;

  AssetPositionHistoryLog({
    required this.id,
    required this.asset,
    required this.facility,
    required this.x,
    required this.y,
    required this.dateTime,
  });
}
