import { Facility } from "../entities/Facility";
import { EntityService } from "./Service";

export class FacilityService extends EntityService {

  static async Get(id: number): Promise<Facility | null> {
    return this.facilityRepo.Get(id);
  }

  static async GetAll(): Promise<Facility[]> {
    return this.facilityRepo.GetAll();
  }

  static async Add(facility: Facility): Promise<boolean> {
    return this.facilityRepo.Add(facility);
  }

  static async Delete(id: number): Promise<boolean> {
    return this.facilityRepo.Delete(id);
  }

  static async Update(facility: Facility): Promise<boolean> {
    return this.facilityRepo.Update(facility);
  }
}
