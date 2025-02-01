import { AssetService } from "../services/AssetService";
import { FacilityService } from "../services/FacilityService";
import { ZoneService } from "../services/ZoneService";
import { Asset } from "./Asset";
import { Zone } from "./Zone";

export class Facility {
    id: number;
    name: string;
    imageBase64: string;
    containedAssetsIds: number[];
    containedZonesIds: number[];

    constructor(id: number, name: string, imageBase64: string, containedAssetsIds: number[] = [], containedZonesIds: number[] = []) {
        this.id = id;
        this.name = name;
        this.imageBase64 = imageBase64;
        this.containedAssetsIds = containedAssetsIds;
        this.containedZonesIds = containedZonesIds;
    }

    async GetAssets(): Promise<Asset[]> {
        await this.UpdateData();
        const assets = await Promise.all(
            this.containedAssetsIds.map(async (assetId) => AssetService.Get(assetId))
        );
        return assets.filter((asset): asset is Asset => asset !== null);
    }

    async GetZones(): Promise<Zone[]> {
        await this.UpdateData(); 
        const zones = await Promise.all(
            this.containedZonesIds.map(async (zoneId) => ZoneService.Get(zoneId))
        );
        return zones.filter((zone): zone is Zone => zone !== null); 
    }

    async ContainsAsset(asset: Asset): Promise<boolean> {
        await this.UpdateData();
        return this.containedAssetsIds.includes(asset.id);
    }

    async UpdateData(): Promise<void> {
        const updatedData = await FacilityService.Get(this.id);
        if (!updatedData) return;
        this.containedAssetsIds = updatedData.containedAssetsIds;
        this.containedZonesIds = updatedData.containedZonesIds;
        this.imageBase64 = updatedData.imageBase64;
        this.name = updatedData.name;
    }
}