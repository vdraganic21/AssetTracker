import { AssetService } from "../services/AssetService";
import { FacilityService } from "../services/FacilityService";
import { ZoneService } from "../services/ZoneService";
import { Asset } from "./Asset";
import { Facility } from "./Facility";
import { Point } from "./Point";

export class Zone {
    id: number;
    name: string;
    points: Point[];
    parentFacilityId: number;
    containedAssetsIds: number[];
  
    constructor(
      id: number,
      name: string,
      points: Point[],
      parentFacilityId: number,
      containedAssetsIds: number[]
    ) {
      this.id = id;
      this.name = name;
      this.points = points;
      this.parentFacilityId = parentFacilityId;
      this.containedAssetsIds = containedAssetsIds;
    }
  
    GetParentFacility(): Facility | null{
      this.UpdateData();
      return FacilityService.Get(this.parentFacilityId);
    }
  
    GetAssets(): Asset[] {
      this.UpdateData();
      return this.containedAssetsIds.map(assetId => AssetService.Get(assetId)).filter(asset => asset !== null) as Asset[];
    }
  
    ContainsAsset(asset: Asset): boolean {
      this.UpdateData();
      return this.containedAssetsIds.includes(asset.id);
    }
  
    UpdateData(): void {
      const updatedData = ZoneService.Get(this.id);
      if (!updatedData) return;
      this.containedAssetsIds = updatedData.containedAssetsIds;
      this.name = updatedData.name;
      this.parentFacilityId = updatedData.parentFacilityId;
      this.points = updatedData.points;
    }
  }
  