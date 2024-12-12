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
  
    GetParentFacility(): Facility {
      throw new Error("Method not implemented.");
    }
  
    GetAssets(): Asset[] {
      throw new Error("Method not implemented.");
    }
  
    ContainsAsset(asset: Asset): boolean {
      throw new Error("Method not implemented.");
    }
  
    UpdateData(): void {
      throw new Error("Method not implemented.");
    }
  }
  