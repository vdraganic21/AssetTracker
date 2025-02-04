import { Zone } from "../../entities/Zone";
import { IZoneRepository } from "../repository-interfaces/IZoneRepository";

export class MockZoneRepository implements IZoneRepository {
    private static zones: Zone[] = [];

    async Get(id: number): Promise<Zone | null> {
        return MockZoneRepository.zones.find(zone => zone.id === id) || null;
    }

    async GetAll(): Promise<Zone[]> {
        return MockZoneRepository.zones;
    }

    async Add(zone: Zone): Promise<boolean> {
        MockZoneRepository.zones.push(zone);
        return true;
    }

    async Delete(id: number): Promise<boolean> {
        const index = MockZoneRepository.zones.findIndex(zone => zone.id === id);
        if (index !== -1) {
            MockZoneRepository.zones.splice(index, 1);
            return true;
        }
        return false;
    }

    async Update(updatedZone: Zone): Promise<boolean> {
        const index = MockZoneRepository.zones.findIndex(zone => zone.id === updatedZone.id);
        if (index !== -1) {
            MockZoneRepository.zones[index] = updatedZone;
            return true;
        }
        return false;
    }
}