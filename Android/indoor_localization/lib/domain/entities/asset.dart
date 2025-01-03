import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/domain/entities/point.dart';
import 'package:indoor_localization/domain/entities/zone.dart';
import 'package:indoor_localization/domain/services/asset_service.dart';
import 'package:indoor_localization/domain/services/facility_service.dart';
import 'package:indoor_localization/domain/services/zone_service.dart';

class Asset {
  int id;
  String name;
  int parentFacilityId;
  Point position;
  DateTime lastSync;
  bool isActive;
  List<int> currentZonesIds;

  Asset({
    required this.id,
    required this.name,
    required this.parentFacilityId,
    required this.position,
    required this.lastSync,
    required this.isActive,
    required this.currentZonesIds,
  });

  Facility? getCurrentFacility() {
    final facility = FacilityService.get(parentFacilityId);
    return facility;
  }

  Point getPosition() {
    updateData();
    return position;
  }

  DateTime getLastSync() {
    updateData();
    return lastSync;
  }

  bool isActiveStatus() {
    updateData();
    return isActive;
  }

  List<Zone> getCurrentZones() {
    updateData();
    return currentZonesIds
        .map((zoneId) => ZoneService.get(zoneId))
        .where((zone) => zone != null)
        .cast<Zone>()
        .toList();
  }

  void updateData() {
    final updatedData = AssetService.get(id);
    if (updatedData == null) return;
    currentZonesIds = updatedData.currentZonesIds;
    isActive = updatedData.isActive;
    lastSync = updatedData.lastSync;
    name = updatedData.name;
    parentFacilityId = updatedData.parentFacilityId;
    position = updatedData.position;
  }
}
