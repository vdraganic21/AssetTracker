import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/domain/entities/point.dart';
import 'package:indoor_localization/domain/entities/zone.dart';
import 'package:indoor_localization/domain/services/asset_service.dart';
import 'package:indoor_localization/domain/services/facility_service.dart';
import 'package:indoor_localization/domain/services/zone_service.dart';

class MockDataInitializer {
  static bool _isDataInitialized = false;

  static void initializeData() {
    if (_isDataInitialized) return;
    const String floorMapDemo = "/floor_map.png";

    FacilityService.add(
      Facility(
        id: 1,
        name: "Warehouse 1",
        imageBase64: floorMapDemo,
      )
    );
    FacilityService.add(
      Facility(
        id: 2,
        name: "Warehouse 35",
        imageBase64: floorMapDemo,
      )
    );
    FacilityService.add(
      Facility(
        id: 3,
        name: "Production Line",
        imageBase64: floorMapDemo,
      )
    );

    ZoneService.add(
      Zone(
        id: 1,
        name: "Zone 1",
        points: [],
        parentFacilityId: 1,
        containedAssetsIds: [],
      )
    );
    ZoneService.add(
      Zone(
        id: 2,
        name: "Zone 2",
        points: [],
        parentFacilityId: 2,
        containedAssetsIds: [],
      )
    );
    ZoneService.add(
      Zone(
        id: 3,
        name: "Zone 3",
        points: [],
        parentFacilityId: 3,
        containedAssetsIds: [],
      )
    );

    AssetService.add(
      Asset(
        id: 1,
        name: "Forklift",
        parentFacilityId: 1,
        position: Point(x: 10, y: 10),
        lastSync: DateTime.now(),
        isActive: true,
        currentZonesIds: [1],
      )
    );
    AssetService.add(
      Asset(
        id: 2,
        name: "Crate 47",
        parentFacilityId: 2,
        position: Point(x: 10, y: 10),
        lastSync: DateTime.now(),
        isActive: true,
        currentZonesIds: [1],
      )
    );
    AssetService.add(
      Asset(
        id: 3,
        name: "Robot Dog",
        parentFacilityId: 1,
        position: Point(x: 10, y: 10),
        lastSync: DateTime.now(),
        isActive: true,
        currentZonesIds: [1],
      )
    );
    AssetService.add(
        Asset(
          id: 4,
          name: "Pallet 2x5",
          parentFacilityId: 1,
          position: Point(x: 10, y: 10),
          lastSync: DateTime.now(),
          isActive: true,
          currentZonesIds: [3],
        )
    );

    _isDataInitialized = true;
  }
}