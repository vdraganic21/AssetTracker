import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/domain/entities/point.dart';
import 'package:indoor_localization/domain/entities/zone.dart';
import 'package:indoor_localization/domain/services/asset_service.dart';
import 'package:indoor_localization/domain/services/facility_service.dart';
import 'package:indoor_localization/domain/services/zone_service.dart';

class MockDataInitializer {
  static void initializeData() {
    const String floorMapDemo = "/logo192.png";

    FacilityService.add(
      Facility(
        id: 1,
        name: "Warehouse 1",
        imageBase64: floorMapDemo,
      ),
    );
    FacilityService.add(
      Facility(
        id: 2,
        name: "Warehouse 35",
        imageBase64: floorMapDemo,
      ),
    );
    FacilityService.add(
      Facility(
        id: 3,
        name: "Production Line",
        imageBase64: floorMapDemo,
      ),
    );

    ZoneService.add(
      Zone(
        id: 1,
        name: "Zone 1",
        points: [],
        parentFacilityId: 1,
        containedAssetsIds: [],
      ),
    );
    ZoneService.add(
      Zone(
        id: 1,
        name: "Zone 2",
        points: [],
        parentFacilityId: 2,
        containedAssetsIds: [],
      ),
    );
    ZoneService.add(
      Zone(
        id: 1,
        name: "Zone 3",
        points: [],
        parentFacilityId: 3,
        containedAssetsIds: [],
      ),
    );

    AssetService.add(
      Asset(
        id: 1,
        name: "Forklift",
        parentFacilityId: 1,
        position: Point(x: 10, y: 10),
        lastSync: DateTime.now(),
        isActive: true,
        currentZonesIds: [],
      ),
    );
    AssetService.add(
      Asset(
        id: 1,
        name: "Crate 47",
        parentFacilityId: 1,
        position: Point(x: 10, y: 10),
        lastSync: DateTime.now(),
        isActive: true,
        currentZonesIds: [],
      ),
    );
    AssetService.add(
      Asset(
        id: 1,
        name: "Robot Dog",
        parentFacilityId: 1,
        position: Point(x: 10, y: 10),
        lastSync: DateTime.now(),
        isActive: true,
        currentZonesIds: [],
      ),
    );
    AssetService.add(
      Asset(
        id: 1,
        name: "Pallet 2x5",
        parentFacilityId: 1,
        position: Point(x: 10, y: 10),
        lastSync: DateTime.now(),
        isActive: true,
        currentZonesIds: [],
      ),
    );
  }
}