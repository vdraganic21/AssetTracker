import 'dart:math';
import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/domain/entities/zone.dart';
import 'package:indoor_localization/domain/entities/asset_position_history_log.dart';
import 'package:indoor_localization/domain/services/asset_service.dart';
import 'package:indoor_localization/domain/services/facility_service.dart';
import 'package:indoor_localization/domain/entities/point.dart';
import 'package:indoor_localization/domain/services/zone_service.dart';
import 'package:indoor_localization/domain/services/asset_position_log_history_service.dart';

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
          containedAssetsIds: [1, 2],
          containedZonesIds: [5],
        ));
    FacilityService.add(
        Facility(
          id: 2,
          name: "Warehouse 35",
          imageBase64: floorMapDemo,
          containedAssetsIds: [1, 3],
          containedZonesIds: [2],
        )
    );
    FacilityService.add(
        Facility(
          id: 3,
          name: "Production Line",
          imageBase64: floorMapDemo,
          containedAssetsIds: [],
          containedZonesIds: [4],
        )
    );

    ZoneService.add(
        Zone(
          id: 1,
          name: "Storage Area NW",
          x: 1,
          y: 1,
          parentFacilityId: 1,
          containedAssetsIds: [],
        )
    );
    ZoneService.add(
        Zone(
          id: 2,
          name: "Outbound area",
          x: 1,
          y: 1,
          parentFacilityId: 2,
          containedAssetsIds: [],
        )
    );
    ZoneService.add(
        Zone(
          id: 3,
          name: "Zone 3",
          x: 1,
          y: 1,
          parentFacilityId: 3,
          containedAssetsIds: [],
        )
    );

    AssetService.add(
        Asset(
          id: 1,
          name: "Forklift",
          floorMapId: 1,
          x: 10,
          y: 10,
          lastSync: DateTime.now(),
          isActive: true,
          currentZonesIds: [1, 2],
        )
    );
    AssetService.add(
        Asset(
          id: 2,
          name: "Crate 47",
          floorMapId: 2,
          x: 10,
          y: 10,
          lastSync: DateTime.now(),
          isActive: true,
          currentZonesIds: [1],
        )
    );
    AssetService.add(
        Asset(
          id: 3,
          name: "Robot Dog",
          floorMapId: 1,
          x: 10,
          y: 10,
          lastSync: DateTime.now(),
          isActive: true,
          currentZonesIds: [1],
        )
    );
    AssetService.add(
        Asset(
          id: 4,
          name: "Pallet 2x5",
          floorMapId: 1,
          x: 10,
          y: 10,
          lastSync: DateTime.now(),
          isActive: true,
          currentZonesIds: [3],
        )
    );
    List<DateTime> customDates = [
      DateTime(2025, 1, 5),
      DateTime(2025, 1, 10),
      DateTime(2025, 1, 15),
      DateTime(2025, 1, 20),
      DateTime(2025, 1, 25),
      DateTime(2025, 1, 30),
      DateTime(2025, 2, 3),
    ];

    Random random = Random();

    for (int assetId = 1; assetId <= 4; assetId++) {
      for (int i = 0; i < customDates.length; i++) {
        DateTime baseTime = customDates[i];

        int facilityId = ((i % 3) + 1);

        for (int j = 0; j < 3; j++) {
          DateTime logTime = baseTime.add(Duration(hours: j * 4));

          int idleHours = random.nextInt(6) + 1;

          bool isIdle = (assetId == 1 && (j == 1 || j == 2));
          Point position = isIdle
              ? Point((5 + j).toDouble(), (4 + j).toDouble())
              : Point(((assetId * 5) + (i % 2 == 0 ? 0 : i * 2)).toDouble(),
              ((assetId * 4) + (i % 3 == 0 ? 0 : i * 3)).toDouble());

          AssetPositionHistoryLogService.add(
              AssetPositionHistoryLog(
                id: assetId * 100 + i * 10 + j,
                assetId: assetId,
                facilityId: facilityId,
                position: position,
                dateTime: logTime,
              )
          );

          if (assetId == 1 && (j == 1 || j == 2)) {
            AssetPositionHistoryLogService.add(
                AssetPositionHistoryLog(
                  id: assetId * 100 + i * 10 + j + 1000,
                  assetId: assetId,
                  facilityId: facilityId,
                  position: position,
                  dateTime: logTime.add(Duration(hours: idleHours)),
                )
            );
          }
        }
      }
    }
    _isDataInitialized = true;
  }
}