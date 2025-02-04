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
  
  }
  