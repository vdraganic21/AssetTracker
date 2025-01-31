import { Facility } from "../../entities/Facility";
import { IFacilityRepository } from "../repository-interfaces/IFacilityRepository";

export class MockFacilityRepository implements IFacilityRepository {
      private static facilities: Facility[] = [];
    
      Get(id: number): Facility | null {
        //TODO implement

        return null;
      }
    
      GetAll(): Facility[] {
        //TODO implement
        return [];
      }
    
      Add(facility: Facility): boolean {
        //TODO implement

        return false;
      }
    
      Delete(id: number): boolean {
        //TODO implement

        return false;
      }
    
      Update(updatedFacility: Facility): boolean {
        //TODO implement

        return false;
      }
}
  