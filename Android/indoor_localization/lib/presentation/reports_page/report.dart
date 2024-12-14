import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/domain/entities/point.dart';
import 'package:indoor_localization/domain/entities/zone.dart';
import 'package:indoor_localization/domain/services/asset_service.dart';
import 'package:indoor_localization/domain/services/facility_service.dart';
import 'package:indoor_localization/domain/services/zone_service.dart';

class Report {
  int id;
  String name;

  Report({
    required this.id,
    required this.name,
  });

  String getName() {
    return name;
  }
}
