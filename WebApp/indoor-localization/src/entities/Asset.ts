import { AssetService } from "../services/AssetService";
import { FacilityService } from "../services/FacilityService";
import { ZoneService } from "../services/ZoneService";
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
  
    GetCurrentFacility(): Facility | null{
      this.UpdateData();
      return FacilityService.Get(this.id);
    }
  
    GetPosition(): Point {
      this.UpdateData();
      return this.position;
    }
  
    GetLastSync(): Date {
      this.UpdateData();
      return this.lastSync;
    }
  
    IsActive(): boolean {
      this.UpdateData();
      return this.isActive;
    }
  
    GetCurrentZones(): Zone[] {
      this.UpdateData();
      return this.currentZonesIds
        .map(zoneId => ZoneService.Get(zoneId)) 
        .filter(zone => zone !== null) as Zone[];
    }
  
    UpdateData(): void {
      const updatedData = AssetService.Get(this.id);
      if (!updatedData) return;
      this.currentZonesIds = updatedData.currentZonesIds;
      this.isActive = updatedData.isActive;
      this.lastSync = updatedData.lastSync;
      this.name = updatedData.name;
      this.parentFacilityId = updatedData.parentFacilityId;
      this.position = updatedData.position;
    }
  }
  