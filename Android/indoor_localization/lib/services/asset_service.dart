import 'package:indoor_localization/entities/asset.dart';
import 'package:indoor_localization/entities/facility.dart';
import 'package:indoor_localization/entities/point.dart';
import 'package:indoor_localization/entities/zone.dart';
import 'package:indoor_localization/services/entity_service.dart';

class AssetService extends EntityService {
  static Asset? get(int id) {
    return EntityService.assetRepo.get(id);
  }

  static List<Asset> getAll() {
    return EntityService.assetRepo.getAll();
  }

  static bool add(Asset asset) {
    return EntityService.assetRepo.add(asset);
  }

  static bool delete(int id) {
    return EntityService.assetRepo.delete(id);
  }

  static bool update(Asset asset) {
    return EntityService.assetRepo.update(asset);
  }

  static Facility? getAssetParentFacility(int id) {
    final asset = EntityService.assetRepo.get(id);
    if (asset != null) {
      return EntityService.facilityRepo.get(asset.parentFacilityId);
    }
    return null;
  }

  static Point? getAssetPosition(int id) {
    final asset = EntityService.assetRepo.get(id);
    if (asset != null) {
      return asset.position;
    }
    return null;
  }

  static DateTime? getAssetLastSync(int id) {
    final asset = EntityService.assetRepo.get(id);
    if (asset != null) {
      return asset.lastSync;
    }
    return null;
  }

  static bool isAssetActive(int id) {
    final asset = EntityService.assetRepo.get(id);
    return asset != null ? asset.isActive : false;
  }

  static List<Zone> getAssetCurrentZones(int id) {
    final asset = EntityService.assetRepo.get(id);
    if (asset != null) {
      return asset.currentZonesIds
          .map((zoneId) => EntityService.zoneRepo.get(zoneId))
          .where((zone) => zone != null)
          .cast<Zone>()
          .toList();
    }
    return [];
  }
}
