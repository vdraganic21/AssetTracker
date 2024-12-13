import 'package:indoor_localization/domain/entities/Asset.dart';
import 'package:indoor_localization/domain/entities/zone.dart';
import 'package:indoor_localization/domain/services/asset_service.dart';
import 'package:indoor_localization/domain/services/facility_service.dart';
import 'package:indoor_localization/domain/services/zone_service.dart';

class Facility {
  int id;
  String name;
  String imageBase64;
  List<int> containedAssetsIds;
  List<int> containedZonesIds;

  Facility({
    required this.id,
    required this.name,
    required this.imageBase64,
  })  : containedAssetsIds = [],
        containedZonesIds = [];

  List<Asset> getAssets() {
    updateData();
    return containedAssetsIds
        .map((assetId) => AssetService.get(assetId))
        .where((asset) => asset != null)
        .cast<Asset>()
        .toList();
  }

  List<Zone> getZones() {
    updateData();
    return containedZonesIds
        .map((zoneId) => ZoneService.get(zoneId))
        .where((zone) => zone != null)
        .cast<Zone>()
        .toList();
  }

  bool containsAsset(Asset asset) {
    updateData();
    return containedAssetsIds.contains(asset.id);
  }

  void updateData() {
    final updatedData = FacilityService.get(id);
    if (updatedData != null) {
      containedAssetsIds = updatedData.containedAssetsIds;
      containedZonesIds = updatedData.containedZonesIds;
      imageBase64 = updatedData.imageBase64;
      name = updatedData.name;
    }
  }
}
