import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/domain/entities/zone.dart';
import 'package:indoor_localization/domain/services/entity_service.dart';

class FacilityService extends EntityService {

  static Facility? get(int id) {
    return EntityService.facilityRepo.get(id);
  }

  static List<Facility> getAll() {
    return EntityService.facilityRepo.getAll();
  }

  static bool add(Facility facility) {
    return EntityService.facilityRepo.add(facility);
  }

  static bool delete(int id) {
    return EntityService.facilityRepo.delete(id);
  }

  static bool update(Facility facility) {
    return EntityService.facilityRepo.update(facility);
  }

  static List<Asset> getAssetsInFacility(int id) {
    final facility = EntityService.facilityRepo.get(id);
    if (facility != null) {
      return facility.containedAssetsIds
          .map((assetId) => EntityService.assetRepo.get(assetId))
          .where((asset) => asset != null)
          .cast<Asset>()
          .toList();
    }
    return [];
  }

  static List<Zone> getZonesInFacility(int id) {
    final facility = EntityService.facilityRepo.get(id);
    if (facility != null) {
      return facility.containedZonesIds
          .map((zoneId) => EntityService.zoneRepo.get(zoneId))
          .where((zone) => zone != null)
          .cast<Zone>()
          .toList();
    }
    return [];
  }

  static bool facilityContainsAsset(int facilityId, int assetId) {
    final facility = EntityService.facilityRepo.get(facilityId);
    if (facility != null) {
      return facility.containedAssetsIds.contains(assetId);
    }
    return false;
  }

  static bool facilityContainsZone(int facilityId, int zoneId) {
    final facility = EntityService.facilityRepo.get(facilityId);
    if (facility != null) {
      return facility.containedZonesIds.contains(zoneId);
    }
    return false;
  }
}
