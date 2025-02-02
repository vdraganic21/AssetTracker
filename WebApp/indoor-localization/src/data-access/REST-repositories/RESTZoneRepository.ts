import { Zone } from "../../entities/Zone";
import { Point } from "../../entities/Point";
import axiosInstance from "../axios/axiosConfig";
import { IZoneRepository } from "../repository-interfaces/IZoneRepository";

export class RESTZoneRepository implements IZoneRepository {
    
    private getZoneFromResponse(response: any): Zone {
        const id = response.data.id;
        const name = response.data.name;
        const parentFacilityId = response.data.floorMapId;
        const points = response.data.points.map((p: any) => new Point(p.x, p.y));
        
        return new Zone(id, name, points, parentFacilityId);
    }

    async Get(id: number): Promise<Zone | null> {
        try {
            const response = await axiosInstance.get(`/zones/${id}`);
            return this.getZoneFromResponse(response);
        } catch (error) {
            console.error("Failed to fetch zone:", error);
            return null;
        }
    }

    async GetAll(): Promise<Zone[]> {
        try {
            const response = await axiosInstance.get(`/zones`);
            return response.data.map(this.getZoneFromResponse);       
        } catch (error) {
            console.error("Failed to fetch zones:", error);
            return [];
        }
    }

    async Add(zone: Zone): Promise<boolean> {
      return false;
    }

    async Delete(id: number): Promise<boolean> {
        return false;
    }

    async Update(updatedZone: Zone): Promise<boolean> {
        return false;
    }
}
