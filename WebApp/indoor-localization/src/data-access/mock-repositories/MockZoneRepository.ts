import { Zone } from "../../entities/Zone";
import { IZoneRepository } from "../repository-interfaces/IZoneRepository";

export class MockZoneRepository implements IZoneRepository {
    private static zones: Zone[] = [];
  
    Get(id: number): Zone | null {
      return MockZoneRepository.zones.find(zone => zone.id === id) || null;
    }
  
    GetAll(): Zone[] {
      return MockZoneRepository.zones;
    }
  
    Add(zone: Zone): boolean {
      MockZoneRepository.zones.push(zone);
      return true;
    }
  
    Delete(id: number): boolean {
      const index = MockZoneRepository.zones.findIndex(zone => zone.id === id);
      if (index !== -1) {
        MockZoneRepository.zones.splice(index, 1);
        return true;
      }
      return false;
    }
  
    Update(updatedZone: Zone): boolean {
      const index = MockZoneRepository.zones.findIndex(zone => zone.id === updatedZone.id);
      if (index !== -1) {
        MockZoneRepository.zones[index] = updatedZone;
        return true;
      }
      return false;
    }
  }
  