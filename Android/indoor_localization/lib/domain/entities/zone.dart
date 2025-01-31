import 'package:indoor_localization/domain/services/asset_service.dart';
import 'package:indoor_localization/domain/services/facility_service.dart';
import 'package:indoor_localization/domain/services/zone_service.dart';

import 'asset.dart';
import 'facility.dart';
class Zone {
  int id;
  String name;
  int x;
  int y;
  int parentFacilityId;
  List<int> containedAssetsIds;

  Zone({
    required this.id,
    required this.name,
    required this.x,
    required this.y,
    required this.parentFacilityId,
    required this.containedAssetsIds,
  });

  Future<Facility?> getParentFacility() async {
    await updateData();
    return await FacilityService.get(parentFacilityId);
  }

  List<Asset> getAssets() {
    updateData();
    return containedAssetsIds
        .map((assetId) => AssetService.get(assetId))
        .where((asset) => asset != null)
        .cast<Asset>()
        .toList();
  }

  bool containsAsset(Asset asset) {
    updateData();
    return containedAssetsIds.contains(asset.id);
  }

  Future<void> updateData() async {
    final updatedData = await ZoneService.get(id);
    if (updatedData != null) {
      containedAssetsIds = updatedData.containedAssetsIds;
      name = updatedData.name;
      parentFacilityId = updatedData.parentFacilityId;
      x = updatedData.x;
      y = updatedData.y;
    }
  }
}
