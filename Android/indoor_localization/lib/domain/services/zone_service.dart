import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/domain/entities/zone.dart';
import 'package:indoor_localization/domain/services/entity_service.dart';

class ZoneService extends EntityService {

  static Future<Zone?> get(int id) {
    return EntityService.zoneRepo.get(id);
  }

  static List<Zone> getAll() {
    return [];
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


  static Future<Facility?> getZoneParentFacility(int id) async {
    final zone = await EntityService.zoneRepo.get(id);
    if (zone != null) {
      return await EntityService.facilityRepo.get(zone.parentFacilityId);
    }
    return null;
  }

  static Future<List<Asset>> getAssetsInZone(int id) async {
    final zone = await EntityService.zoneRepo.get(id);
    if (zone != null) {
      final assets = await Future.wait(
        zone.containedAssetsIds.map((assetId) async => await EntityService.assetRepo.get(assetId)),
      );
      return assets.whereType<Asset>().toList();
    }
    return [];
  }

  static Future<bool> zoneContainsAsset(int zoneId, int assetId) async {
    final zone = await EntityService.zoneRepo.get(zoneId);
    if (zone != null) {
      return zone.containedAssetsIds.contains(assetId);
    }
    return false;
  }
}

