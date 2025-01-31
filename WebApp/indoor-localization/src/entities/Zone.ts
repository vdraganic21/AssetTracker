import { FacilityService } from "../services/FacilityService";
import { ZoneService } from "../services/ZoneService";
import { Facility } from "./Facility";
import { Point } from "./Point";

export class Zone {
    id: number;
    name: string;
    points: Point[];
    parentFacilityId: number;
  
    constructor(
      id: number,
      name: string,
      points: Point[],
      parentFacilityId: number,
    ) {
      this.id = id;
      this.name = name;
      this.points = points;
      this.parentFacilityId = parentFacilityId;
    }
  
    GetParentFacility(): Facility | null{
      this.UpdateData();
      return FacilityService.Get(this.parentFacilityId);
    }
  
    UpdateData(): void {
      const updatedData = ZoneService.Get(this.id);
      if (!updatedData) return;
      this.name = updatedData.name;
      this.parentFacilityId = updatedData.parentFacilityId;
      this.points = updatedData.points;
    }
  }
  