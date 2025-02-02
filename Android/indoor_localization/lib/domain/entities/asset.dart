import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/domain/entities/zone.dart';
import 'package:indoor_localization/domain/services/asset_service.dart';
import 'package:indoor_localization/domain/services/facility_service.dart';
import 'package:indoor_localization/domain/services/zone_service.dart';
import 'package:flutter/material.dart';

class Asset {
  final int id;
  String name;
  int floorMapId;
  int x;
  int y;
  DateTime lastSync;
  bool isActive;
  List<int> currentZonesIds;

  Asset({
    required this.id,
    required this.name,
    required this.floorMapId,
    required this.x,
    required this.y,
    required this.lastSync,
    required this.isActive,
    required this.currentZonesIds,
  });

  factory Asset.fromJson(Map<String, dynamic> json) {
    return Asset(
      id: json['id'] ?? 0,
      name: json['name'] ?? 'Unknown',
      floorMapId: json['floorMapId'] ?? 0,
      x: json['x'] ?? 0,
      y: json['y'] ?? 0,
      lastSync: DateTime.tryParse(json['lastSync'] ?? '') ?? DateTime.now(),
      isActive: json['active'] ?? false,
      currentZonesIds: (json['currentZonesIds'] as List?)?.map((e) => e as int).toList() ?? [],
    );
  }


  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'floorMapId': floorMapId,
      'x': x,
      'y': y,
      'lastSync': lastSync.toIso8601String(),
      'active': isActive,
      'currentZonesIds': currentZonesIds,
    };
  }


  Future<Facility?> getCurrentFacility() async {
    return await FacilityService.get(floorMapId);
  }

  Future<String> getFacilityName() async {
    final facility = await FacilityService.get(floorMapId);
    return facility?.name ?? 'Unknown Facility';
  }


  Future<Asset> updateData() async {
    final updatedData = await AssetService.get(id);
    if (updatedData != null) {
      name = updatedData.name;
      floorMapId = updatedData.floorMapId;
      x = updatedData.x;
      y = updatedData.y;
      lastSync = updatedData.lastSync;
      isActive = updatedData.isActive;
      currentZonesIds = updatedData.currentZonesIds;
    }
    return this;
  }


  Future<Offset> getPosition() async {
    final updatedAsset = await updateData();
    return Offset(updatedAsset.x.toDouble(), updatedAsset.y.toDouble());
  }


  Future<DateTime> getLastSync() async {
    updateData();
    return lastSync;
  }


  Future<bool> isActiveStatus() async {
    final updatedAsset = await updateData();
    return updatedAsset.isActive;
  }


  Future<List<Zone>> getCurrentZones() async {
    final updatedAsset = await updateData();
    final updatedZones = updatedAsset.currentZonesIds
        .map((zoneId) => ZoneService.get(zoneId))
        .where((zone) => zone != null)
        .cast<Zone>()
        .toList();
    return updatedZones;
  }
}
