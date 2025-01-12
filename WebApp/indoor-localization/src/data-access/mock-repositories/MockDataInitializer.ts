import { Asset } from "../../entities/Asset";
import { Facility } from "../../entities/Facility";
import { Point } from "../../entities/Point";
import { Zone } from "../../entities/Zone";
import { AssetService } from "../../services/AssetService";
import { FacilityService } from "../../services/FacilityService";
import { ZoneService } from "../../services/ZoneService";

export class MockDataInitializer {
    static initializeData(): void {
        const floorMapDemo = "/floorMapDemo.png";

        FacilityService.Add(new Facility(1, "Warehouse 1", floorMapDemo, [1,2], [1]));
        FacilityService.Add(new Facility(2, "Warehouse 35", floorMapDemo, [3], [2]));
        FacilityService.Add(new Facility(3, "Production Line", floorMapDemo, [4], [3]));

        ZoneService.Add(new Zone(1, "Zone 1", [new Point(100,100), new Point(100,200), new Point(200,200), new Point(200,100)], 1, []));
        ZoneService.Add(new Zone(2, "Zone 2", [new Point(100,100), new Point(100,200), new Point(200,200), new Point(200,100)], 2, []));
        ZoneService.Add(new Zone(3, "Zone 3", [new Point(100,100), new Point(100,200), new Point(200,200), new Point(200,100)], 3, []));

        AssetService.Add(new Asset(1, "Forklift", 1, new Point(100,100), new Date(), true, []));
        AssetService.Add(new Asset(2, "Crate 47", 1, new Point(400,500), new Date(), true, []));
        AssetService.Add(new Asset(3, "Robot Dog", 2, new Point(200,300), new Date(), true, []));
        AssetService.Add(new Asset(4, "Pallet 2x5", 3, new Point(500,50), new Date(), true, []));
            }
}
