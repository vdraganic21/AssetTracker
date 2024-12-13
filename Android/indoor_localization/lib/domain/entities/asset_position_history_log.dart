import 'package:indoor_localization/domain/entities/Point.dart';
import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/entities/facility.dart';

class AssetPositionHistoryLog {
  final int id;
  final Asset asset;
  final Facility facility;
  final Point position;
  final DateTime dateTime;

  AssetPositionHistoryLog({
    required this.id,
    required this.asset,
    required this.facility,
    required this.position,
    required this.dateTime,
  });
}
