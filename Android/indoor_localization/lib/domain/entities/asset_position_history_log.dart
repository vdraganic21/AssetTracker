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

  factory AssetPositionHistoryLog.fromJson(Map<String, dynamic> json) {
    return AssetPositionHistoryLog(
      id: json['id'] as int,
      assetId: json['assetId'] as int,
      facilityId: json['facilityId'] as int,
      position: Point.fromJson(json['position'] as Map<String, dynamic>),
      dateTime: DateTime.parse(json['dateTime'] as String),
    );
  }
}
