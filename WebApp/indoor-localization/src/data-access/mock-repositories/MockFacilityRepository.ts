import { Facility } from "../../entities/Facility";
import { IFacilityRepository } from "../repository-interfaces/IFacilityRepository";

export class MockFacilityRepository implements IFacilityRepository {
      private static facilities: Facility[] = [];
    
      Get(id: number): Facility | null {
        return MockFacilityRepository.facilities.find(facility => facility.id === id) || null;
      }
    
      GetAll(): Facility[] {
        return MockFacilityRepository.facilities;
      }
    
      Add(facility: Facility): boolean {
        MockFacilityRepository.facilities.push(facility);
        return true;
      }
    
      Delete(id: number): boolean {
        const index = MockFacilityRepository.facilities.findIndex(facility => facility.id === id);
        if (index !== -1) {
          MockFacilityRepository.facilities.splice(index, 1);
          return true;
        }
        return false;
      }
    
      Update(updatedFacility: Facility): boolean {
        const index = MockFacilityRepository.facilities.findIndex(facility => facility.id === updatedFacility.id);
        if (index !== -1) {
          MockFacilityRepository.facilities[index] = updatedFacility;
          return true;
        }
        return false;
      }
}
  