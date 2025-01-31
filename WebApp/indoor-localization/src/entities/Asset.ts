import { AssetService } from "../services/AssetService";
import { FacilityService } from "../services/FacilityService";
import { Facility } from "./Facility";
import { Point } from "./Point";

export class Asset {
    id: number;
    name: string;
    parentFacilityId: number;
    position: Point;
    isActive: boolean;
  
    constructor(
      id: number,
      name: string,
      parentFacilityId: number,
      position: Point,
      isActive: boolean,
    ) {
      this.id = id;
      this.name = name;
      this.parentFacilityId = parentFacilityId;
      this.position = position;
      this.isActive = isActive;
    }
  
    GetCurrentFacility(): Facility | null{
      this.UpdateData();
      return FacilityService.Get(this.id);
    }
  
    GetPosition(): Point {
      this.UpdateData();
      return this.position;
    }
  
    IsActive(): boolean {
      this.UpdateData();
      return this.isActive;
    }
  
    UpdateData(): void {
      const updatedData = AssetService.Get(this.id);
      if (!updatedData) return;
      this.isActive = updatedData.isActive;
      this.name = updatedData.name;
      this.parentFacilityId = updatedData.parentFacilityId;
      this.position = updatedData.position;
    }
  }
  