import { Zone } from "../../entities/Zone";
import { IZoneRepository } from "../repository-interfaces/IZoneRepository";

export class RESTZoneRepository implements IZoneRepository {
  
    Get(id: number): Zone | null {
        //TODO Implement
        return null;
    }
  
    GetAll(): Zone[] {
      return [];
    }
  
    Add(zone: Zone): boolean {
      return false;
    }
  
    Delete(id: number): boolean {
      return false;
    }
  
    Update(updatedZone: Zone): boolean {
      return false;
    }
  }
  