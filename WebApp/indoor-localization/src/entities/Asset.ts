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
    isActive: boolean;
    currentZonesIds: number[] = [];
  
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
  
    async GetCurrentFacility(): Promise<Facility | null>{
      await this.UpdateData();
      return await FacilityService.Get(this.id);
    }
  
    async GetPosition(): Promise<Point> {
      await this.UpdateData();
      return this.position;
    }
  
    async IsActive(): Promise<boolean> {
      await this.UpdateData();
      return this.isActive;
    }

    async GetCurrentZones(): Promise<Zone[]> {
      await this.UpdateData();
      const zones = await Promise.all(this.currentZonesIds.map(zoneId => ZoneService.Get(zoneId)));
      return zones.filter(zone => zone !== null) as Zone[];
    }
  
    async UpdateData(): Promise<void> {
      const updatedData = await AssetService.Get(this.id);
      if (!updatedData) return;
      this.isActive = updatedData.isActive;
      this.name = updatedData.name;
      this.parentFacilityId = updatedData.parentFacilityId;
      this.position = updatedData.position;
    }
  }
  