import { Asset } from "../entities/Asset";
import { Facility } from "../entities/Facility";
import { Zone } from "../entities/Zone";
import { AssetService } from "./AssetService";
import { EntityService } from "./Service";
import { ZoneService } from "./ZoneService";

export class FacilityService extends EntityService {

  static async Get(id: number): Promise<Facility | null> {
    return this.facilityRepo.Get(id);
  }

  static async GetAll(): Promise<Facility[]> {
    return this.facilityRepo.GetAll();
  }

  static async Add(facility: Facility): Promise<boolean> {
    return this.facilityRepo.Add(facility);
  }

  static async Delete(id: number): Promise<boolean> {
    return this.facilityRepo.Delete(id);
  }

  static async Update(facility: Facility): Promise<boolean> {
    return this.facilityRepo.Update(facility);
  }

  static async GetFacilityAssets(facility: Facility): Promise<Asset[]> {
    let assets : Asset[] = [];

    for (let assetId of facility.containedAssetsIds){
      const asset = await AssetService.Get(assetId);
      if (asset) assets.push(asset);
    }

    return assets;
  }

  static async GetFacilityZones(facility: Facility): Promise<Zone[]> {
    let zones : Zone[] = [];

    for (let zoneId of facility.containedZonesIds){
      const zone = await ZoneService.Get(zoneId);
      if (zone) zones.push(zone);
    }

    return zones;
  }
}
