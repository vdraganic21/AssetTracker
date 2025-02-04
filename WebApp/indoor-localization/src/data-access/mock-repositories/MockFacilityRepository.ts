import { Facility } from "../../entities/Facility";
import { IFacilityRepository } from "../repository-interfaces/IFacilityRepository";

export class MockFacilityRepository implements IFacilityRepository {
  private static facilities: Facility[] = [];

  async Get(id: number): Promise<Facility | null> {
      return MockFacilityRepository.facilities.find(facility => facility.id === id) || null;
  }

  async GetAll(): Promise<Facility[]> {
      return MockFacilityRepository.facilities;
  }

  async Add(facility: Facility): Promise<boolean> {
      MockFacilityRepository.facilities.push(facility);
      return true;
  }

  async Delete(id: number): Promise<boolean> {
      const index = MockFacilityRepository.facilities.findIndex(facility => facility.id === id);
      if (index !== -1) {
          MockFacilityRepository.facilities.splice(index, 1);
          return true;
      }
      return false;
  }

  async Update(updatedFacility: Facility): Promise<boolean> {
      const index = MockFacilityRepository.facilities.findIndex(facility => facility.id === updatedFacility.id);
      if (index !== -1) {
          MockFacilityRepository.facilities[index] = updatedFacility;
          return true;
      }
      return false;
  }
}
  