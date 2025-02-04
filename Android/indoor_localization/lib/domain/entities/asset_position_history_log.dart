import 'point.dart';

class AssetPositionHistoryLog {
  int id;
  int assetId;
  int facilityId;
  Point position;
  DateTime dateTime;

  AssetPositionHistoryLog({
    required this.id,
    required this.assetId,
    required this.facilityId,
    required this.position,
    required this.dateTime,
  });
}
