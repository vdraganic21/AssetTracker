import { Zone } from "../entities/Zone";
import { EntityService } from "./Service";

export class ZoneService extends EntityService {
  static async Get(id: number): Promise<Zone | null> {
      return await this.zoneRepo.Get(id);
  }

  static async GetAll(): Promise<Zone[]> {
      return await this.zoneRepo.GetAll();
  }

  static async Add(zone: Zone): Promise<boolean> {
      return await this.zoneRepo.Add(zone);
  }

  static async Delete(id: number): Promise<boolean> {
      return await this.zoneRepo.Delete(id);
  }

  static async Update(zone: Zone): Promise<boolean> {
      return await this.zoneRepo.Update(zone);
  }
}
