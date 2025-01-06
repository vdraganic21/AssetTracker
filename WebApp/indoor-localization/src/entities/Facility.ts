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
  
    GetAssets(): Asset[] {
      this.UpdateData();
      return this.containedAssetsIds.map(assetId => AssetService.Get(assetId)).filter(asset => asset !== null) as Asset[];
    }
    
    GetZones(): Zone[] {
      this.UpdateData();
      return this.containedZonesIds.map(zoneId => ZoneService.Get(zoneId)).filter(zone => zone !== null) as Zone[];
    }    
  
    ContainsAsset(asset: Asset): boolean {
      this.UpdateData();
      return this.containedAssetsIds.includes(asset.id);
    }
  
    UpdateData(): void {
      const updatedData = FacilityService.Get(this.id);
      if (!updatedData) return;
      this.containedAssetsIds = updatedData.containedAssetsIds;
      this.containedZonesIds = updatedData.containedZonesIds;
      this.imageBase64 = updatedData.imageBase64;
      this.name = updatedData.name;  
    }
  }
  