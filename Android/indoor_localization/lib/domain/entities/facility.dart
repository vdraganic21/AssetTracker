import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/entities/zone.dart';
import 'package:indoor_localization/domain/services/asset_service.dart';
import 'package:indoor_localization/domain/services/zone_service.dart';
import 'package:indoor_localization/domain/services/facility_service.dart';

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
    List<int>? containedAssetsIds,
    List<int>? containedZonesIds,
  })  : containedAssetsIds = containedAssetsIds ?? [],
        containedZonesIds = containedZonesIds ?? [];

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

  Future<void> updateData() async {
    final updatedData = await FacilityService.get(id);
    if (updatedData != null) {
      containedAssetsIds = updatedData.containedAssetsIds;
      containedZonesIds = updatedData.containedZonesIds;
      imageBase64 = updatedData.imageBase64;
      name = updatedData.name;
    }
  }



  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'imageBase64': imageBase64,
      'containedAssetsIds': containedAssetsIds,
      'containedZonesIds': containedZonesIds,
    };
  }

  factory Facility.fromJson(Map<String, dynamic> json) {
    return Facility(
      id: json['id'] ?? 0,
      name: json['name'] ?? 'Unknown',
      imageBase64: json['imageBase64'] ?? '',
      containedAssetsIds: (json['containedAssetsIds'] as List?)?.map((e) => e as int).toList() ?? [],
      containedZonesIds: (json['containedZonesIds'] as List?)?.map((e) => e as int).toList() ?? [],
    );
  }
}
