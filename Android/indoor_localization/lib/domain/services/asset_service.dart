import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/domain/entities/zone.dart';
import 'package:indoor_localization/domain/services/entity_service.dart';

class AssetService extends EntityService {
  static Future<Asset?> get(int id) async {
    return await EntityService.assetRepo.get(id);
  }

  static Future<List<Asset>> getAll() async {
    return await EntityService.assetRepo.getAll();
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

  static Future<Facility?> getAssetParentFacility(int id) async {
    final asset = await EntityService.assetRepo.get(id);
    if (asset != null) {
      return await EntityService.facilityRepo.get(asset.floorMapId);
    }
    return null;
  }
  /*
  static Point? getAssetPosition(int id) {
    final asset = EntityService.assetRepo.get(id);
    if (asset != null) {
      return asset.position;
    }
    return null;
  }
  */
  static Future<DateTime?> getAssetLastSync(int id) async {
    final asset = await EntityService.assetRepo.get(id);
    if (asset != null) {
      return asset.lastSync;
    }
    return null;
  }

  static Future<bool> isAssetActive(int id) async {
    final asset = await EntityService.assetRepo.get(id);
    return asset != null ? asset.isActive : false;
  }

  static Future<List<Zone>> getAssetCurrentZones(int id) async {
    final asset = await EntityService.assetRepo.get(id);
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
