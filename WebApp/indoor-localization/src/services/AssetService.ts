import { Asset } from "../entities/Asset";
import { Facility } from "../entities/Facility";
import { Point } from "../entities/Point";
import { Zone } from "../entities/Zone";
import { EntityService } from "./Service";

export class AssetService extends EntityService {
    static Get(id: number): Asset | null {
        return this.assetRepo.Get(id);
      }

    static GetAll(): Asset[] {
        return this.assetRepo.GetAll();
    }

    static Add(asset: Asset): boolean {
        return this.assetRepo.Add(asset);
    }

    static Delete(id: number): boolean {
        return this.assetRepo.Delete(id);
    }

    static Update(asset: Asset): boolean {
        return this.assetRepo.Update(asset);
    }

    static GetAssetParentFacility(id: number): Facility | null {
        const asset = this.assetRepo.Get(id);
        if (asset) {
        return this.facilityRepo.Get(asset.parentFacilityId);
        }
        return null;
    }

    static GetAssetPosition(id: number): Point | null {
        const asset = this.assetRepo.Get(id);
        if (asset) {
        return asset.position;
        }
        return null;
    }

    static GetAssetLastSync(id: number): Date | null {
        const asset = this.assetRepo.Get(id);
        if (asset) {
        return asset.lastSync;
        }
        return null;
    }

    static IsAssetActive(id: number): boolean {
        const asset = this.assetRepo.Get(id);
        return asset ? asset.isActive : false;
    }

    static GetAssetCurrentZones(id: number): Zone[] {
        const asset = this.assetRepo.Get(id);
        if (asset) {
        return asset.currentZonesIds.map(zoneId => this.zoneRepo.Get(zoneId)).filter(zone => zone !== null) as Zone[];
        }
        return [];
    }
}
