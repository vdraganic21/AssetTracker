import { Point } from "./Point";

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
  }
  