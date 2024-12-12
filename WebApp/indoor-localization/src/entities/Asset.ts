import { Facility } from "./Facility";
import { Point } from "./Point";
import { Zone } from "./Zone";

export class Asset {
    id: number;
    name: string;
    parentFacilityId: number;
    position: Point;
    lastSync: Date;
    isActive: boolean;
    currentZonesIds: number[];
  
    constructor(
      id: number,
      name: string,
      parentFacilityId: number,
      position: Point,
      lastSync: Date,
      isActive: boolean,
      currentZonesIds: number[]
    ) {
      this.id = id;
      this.name = name;
      this.parentFacilityId = parentFacilityId;
      this.position = position;
      this.lastSync = lastSync;
      this.isActive = isActive;
      this.currentZonesIds = currentZonesIds;
    }
  
    GetCurrentFacility(): Facility {
      throw new Error("Method not implemented.");
    }
  
    GetPosition(): Point {
      throw new Error("Method not implemented.");
    }
  
    GetLastSync(): Date {
      throw new Error("Method not implemented.");
    }
  
    IsActive(): boolean {
      throw new Error("Method not implemented.");
    }
  
    GetCurrentZones(): Zone[] {
      throw new Error("Method not implemented.");
    }
  
    UpdateData(): void {
      throw new Error("Method not implemented.");
    }
  }
  