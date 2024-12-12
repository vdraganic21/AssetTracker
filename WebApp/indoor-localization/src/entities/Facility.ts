import { Asset } from "./Asset";
import { Zone } from "./Zone";

export class Facility {
    id: number;
    name: string;
    imageBase64: string;
    containedAssetsIds: number[];
    containedZonesIds: number[];
  
    constructor(id: number, name: string, imageBase64: string) {
      this.id = id;
      this.name = name;
      this.imageBase64 = imageBase64;
      this.containedAssetsIds = [];
      this.containedZonesIds = [];
    }
  
    GetAssets(): Asset[] {
      throw new Error("Method not implemented.");
    }
  
    GetZones(): Zone[] {
      throw new Error("Method not implemented.");
    }
  
    ContainsAsset(asset: Asset): boolean {
      throw new Error("Method not implemented.");
    }
  
    UpdateData(): void {
      throw new Error("Method not implemented.");
    }
  }
  