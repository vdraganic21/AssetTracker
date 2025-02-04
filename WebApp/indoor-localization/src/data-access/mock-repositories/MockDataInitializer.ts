import { Asset } from "../../entities/Asset";
import { AssetZoneHistoryLog } from "../../entities/AssetZoneHistoryLog";
import { Facility } from "../../entities/Facility";
import { Point } from "../../entities/Point";
import { Zone } from "../../entities/Zone";
import { AssetService } from "../../services/AssetService";
import { AssetZoneHistoryLogService } from "../../services/AssetZoneHistoryLogService";
import { FacilityService } from "../../services/FacilityService";
import { ZoneService } from "../../services/ZoneService";

export class MockDataInitializer {
  static initializeData(): void {
    const floorMapDemo = "/floorMapDemo.png";

    FacilityService.Add(
      new Facility(
        1,
        "Warehouse 1",
        floorMapDemo,
        [
          new Asset(1, "Forklift", 1, new Point(100, 100), true),
          new Asset(2, "Crate 47", 1, new Point(400, 500), true),
        ],
        [
          new Zone(
            5,
            "Office entrances",
            [
              new Point(560, 150),
              new Point(740, 150),
              new Point(740, 300),
              new Point(560, 300),
            ],
            2
          ),
        ]
      )
    );
    FacilityService.Add(
      new Facility(
        2,
        "Warehouse 35",
        floorMapDemo,
        [new Asset(3, "Robot Dog", 2, new Point(200, 300), true)],
        [
          new Zone(
            2,
            "Storage Area NW",
            [
              new Point(25, 750),
              new Point(525, 750),
              new Point(525, 1275),
              new Point(25, 1275),
            ],
            2
          ),
        ]
      )
    );
    FacilityService.Add(
      new Facility(
        3,
        "Production Line",
        floorMapDemo,
        [],
        [
          new Zone(
            4,
            "Outbound area",
            [
              new Point(1200, 400),
              new Point(1500, 400),
              new Point(1500, 550),
              new Point(1200, 550),
            ],
            2
          ),
        ]
      )
    );

    ZoneService.Add(
      new Zone(
        2,
        "Storage Area NW",
        [
          new Point(25, 750),
          new Point(525, 750),
          new Point(525, 1275),
          new Point(25, 1275),
        ],
        2
      )
    );
    ZoneService.Add(
      new Zone(
        4,
        "Outbound area",
        [
          new Point(1200, 400),
          new Point(1500, 400),
          new Point(1500, 550),
          new Point(1200, 550),
        ],
        2
      )
    );
    ZoneService.Add(
      new Zone(
        5,
        "Office entrances",
        [
          new Point(560, 150),
          new Point(740, 150),
          new Point(740, 300),
          new Point(560, 300),
        ],
        2
      )
    );

    AssetService.Add(new Asset(1, "Forklift", 1, new Point(100, 100), true));
    AssetService.Add(new Asset(2, "Crate 47", 1, new Point(400, 500), true));
    AssetService.Add(new Asset(3, "Robot Dog", 2, new Point(200, 300), true));
    AssetService.Add(new Asset(4, "Pallet 2x5", 3, new Point(500, 50), true));

    AssetZoneHistoryLogService.Add(
      new AssetZoneHistoryLog(2, 2, 2, new Date(), new Date(), 135)
    );
    AssetZoneHistoryLogService.Add(
      new AssetZoneHistoryLog(3, 1, 4, new Date(), new Date(), 20000)
    );

    AssetZoneHistoryLogService.Add(
      new AssetZoneHistoryLog(4, 3, 5, new Date(), new Date(), 1505)
    );

    AssetZoneHistoryLogService.Add(
      new AssetZoneHistoryLog(5, 2, 4, new Date(), new Date(), 3690)
    );
  }
}
