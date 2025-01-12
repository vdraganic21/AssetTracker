import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/domain/entities/zone.dart';
import 'package:indoor_localization/domain/services/asset_service.dart';
import 'package:indoor_localization/domain/services/facility_service.dart';
import 'package:indoor_localization/domain/services/zone_service.dart';

class Report {
  int type;
  String name;

  Report({
    required this.type,
    required this.name,
  });

  String getName() {
    return name;
  }
}
