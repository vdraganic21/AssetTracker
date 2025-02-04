import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/services/asset_service.dart';
import 'package:indoor_localization/domain/services/facility_service.dart';

class Facility {
  int id;
  String name;
  String imageBase64;
  List<Asset> assets;
  List<Map<String, dynamic>> zones;

  Facility({
    required this.id,
    required this.name,
    required this.imageBase64,
    List<Asset>? assets,
    List<Map<String, dynamic>>? zones,
  })  : assets = assets ?? [],
        zones = zones ?? [];

  List<Asset> getAssets() {
    updateData();
    return assets;
  }

  List<Map<String, dynamic>> getZones() {
    updateData();
    return zones;
  }

  bool containsAsset(Asset asset) {
    updateData();
    return assets.contains(asset);
  }

  Future<void> updateData() async {
    final updatedData = await FacilityService.get(id);
    if (updatedData != null) {
      assets = updatedData.assets;
      zones = updatedData.zones;
      imageBase64 = updatedData.imageBase64;
      name = updatedData.name;
    }
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'imageBase64': imageBase64,
      'assets': assets.map((asset) => asset.toJson()).toList(),
      'zones': zones,
    };
  }

  factory Facility.fromJson(Map<String, dynamic> json) {
    final rawBase64 = json['imageBase64'] as String? ?? '';
    final cleanedBase64 = rawBase64.replaceFirst(RegExp(r'data:image/[^;]+;base64,'), '');
    
    return Facility(
      id: json['id'] ?? 0,
      name: json['name'] ?? 'Unknown',
      imageBase64: cleanedBase64,
      assets: (json['assets'] as List?)?.map((e) => Asset.fromJson(e)).toList() ?? [],
      zones: (json['zones'] as List?)?.map((e) => e as Map<String, dynamic>).toList() ?? [],
    );
  }
}
