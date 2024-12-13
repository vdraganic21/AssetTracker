import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/domain/entities/zone.dart';
import 'package:indoor_localization/domain/services/entity_service.dart';

class ZoneService extends EntityService {

  static Zone? get(int id) {
    return EntityService.zoneRepo.get(id);
  }

  static List<Zone> getAll() {
    return EntityService.zoneRepo.getAll();
  }

  static bool add(Zone zone) {
    return EntityService.zoneRepo.add(zone);
  }

  static bool delete(int id) {
    return EntityService.zoneRepo.delete(id);
  }

  static bool update(Zone zone) {
    return EntityService.zoneRepo.update(zone);
  }

  static Facility? getZoneParentFacility(int id) {
    final zone = EntityService.zoneRepo.get(id);
    if (zone != null) {
      return EntityService.facilityRepo.get(zone.parentFacilityId);
    }
    return null;
  }

  static List<Asset> getAssetsInZone(int id) {
    final zone = EntityService.zoneRepo.get(id);
    if (zone != null) {
      return zone.containedAssetsIds
          .map((assetId) => EntityService.assetRepo.get(assetId))
          .where((asset) => asset != null)
          .cast<Asset>()
          .toList();
    }
    return [];
  }

  static bool zoneContainsAsset(int zoneId, int assetId) {
    final zone = EntityService.zoneRepo.get(zoneId);
    if (zone != null) {
      return zone.containedAssetsIds.contains(assetId);
    }
    return false;
  }
}
