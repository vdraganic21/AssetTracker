import 'package:indoor_localization/services/asset_service.dart';
import 'package:indoor_localization/services/facility_service.dart';
import 'package:indoor_localization/services/zone_service.dart';

import 'asset.dart';
import 'facility.dart';
import 'point.dart';

class Zone {
  int id;
  String name;
  List<Point> points;
  int parentFacilityId;
  List<int> containedAssetsIds;

  Zone({
    required this.id,
    required this.name,
    required this.points,
    required this.parentFacilityId,
    required this.containedAssetsIds,
  });

  Facility? getParentFacility() {
    updateData();
    return FacilityService.get(parentFacilityId);
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

  void updateData() {
    final updatedData = ZoneService.get(id);
    if (updatedData != null) {
      containedAssetsIds = updatedData.containedAssetsIds;
      name = updatedData.name;
      parentFacilityId = updatedData.parentFacilityId;
      points = updatedData.points;
    }
  }
}
