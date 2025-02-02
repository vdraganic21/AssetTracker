import { Asset } from "../entities/Asset";
import { Facility } from "../entities/Facility";
import { Zone } from "../entities/Zone";
import { FacilityService } from "./FacilityService";
import { EntityService } from "./Service";
import { ZoneService } from "./ZoneService";

export class AssetService extends EntityService {
    static async Get(id: number): Promise<Asset | null> {
        return this.assetRepo.Get(id);
      }

    static async GetAll(): Promise<Asset[]> {
        return this.assetRepo.GetAll();
    }

    static async Add(asset: Asset): Promise<boolean> {
        return this.assetRepo.Add(asset);
    }

    static async Delete(id: number): Promise<boolean> {
        return this.assetRepo.Delete(id);
    }

    static async Update(asset: Asset): Promise<boolean> {
        return this.assetRepo.Update(asset);
    }

    static async GetAssetParentFacility(asset: Asset): Promise<Facility | null> {
        return await FacilityService.Get(asset.parentFacilityId);
    }

    static async GetAssetCurrentZones(asset: Asset): Promise<Zone[]> {
        let zones : Zone[] = [] ;
        for (const zoneId of asset.currentZonesIds){
            let zone = await ZoneService.Get(zoneId);
            if (zone != null){
                zones.push(zone);
            }
        }    
        return zones;
    }
}
