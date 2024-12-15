import { Asset } from "../../entities/Asset";
import { Facility } from "../../entities/Facility";
import { Point } from "../../entities/Point";
import { Zone } from "../../entities/Zone";
import { AssetService } from "../../services/AssetService";
import { FacilityService } from "../../services/FacilityService";
import { ZoneService } from "../../services/ZoneService";

export class MockDataInitializer {
    static initializeData(): void {
        const floorMapDemo = "/logo192.png";

        FacilityService.Add(new Facility(1, "Warehouse 1", floorMapDemo));
        FacilityService.Add(new Facility(2, "Warehouse 35", floorMapDemo));
        FacilityService.Add(new Facility(3, "Production Line", floorMapDemo));

        ZoneService.Add(new Zone(1, "Zone 1", [], 1, []));
        ZoneService.Add(new Zone(2, "Zone 2", [], 2, []));
        ZoneService.Add(new Zone(3, "Zone 3", [], 3, []));

        AssetService.Add(new Asset(1, "Forklift", 1, new Point(10,10), new Date(), true, []));
        AssetService.Add(new Asset(2, "Crate 47", 1, new Point(10,10), new Date(), true, []));
        AssetService.Add(new Asset(3, "Robot Dog", 1, new Point(10,10), new Date(), true, []));
        AssetService.Add(new Asset(4, "Pallet 2x5", 1, new Point(10,10), new Date(), true, []));
            }
}
