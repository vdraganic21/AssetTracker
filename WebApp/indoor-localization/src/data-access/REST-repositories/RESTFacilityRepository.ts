import { Facility } from "../../entities/Facility";
import axiosInstance from "../axios/axiosConfig";
import { IFacilityRepository } from "../repository-interfaces/IFacilityRepository";

export class RESTFacilityRepository implements IFacilityRepository {
    
    private getFacilityFromResponse(data: any): Facility {
        const id = data.id;
        const name = data.name;
        const imageBase64 = data.imageBase64;
        const containedAssetsIds = data.assets || [];
        const containedZonesIds = data.zones || [];
        
        return new Facility(id, name, imageBase64, containedAssetsIds, containedZonesIds);
    }

    async Get(id: number): Promise<Facility | null> {
        try {
            const response = await axiosInstance.get(`/floormaps/${id}`);
            return this.getFacilityFromResponse(response.data);
        } catch (error) {
            console.error("Failed to fetch facility:", error);
            return null;
        }
    }

    async GetAll(): Promise<Facility[]> {
        try {
            const response = await axiosInstance.get(`/floormaps`);
            return response.data.map(this.getFacilityFromResponse);
        } catch (error) {
            console.error("Failed to fetch facilities:", error);
            return [];
        }
    }

    async Add(facility: Facility): Promise<boolean> {
        try {
            const response = await axiosInstance.post(`/floormaps`, {id: facility.id, name: facility.name, imageBase64: facility.imageBase64, assets: facility.containedAssetsIds, zones: facility.containedZonesIds});
            return response.status === 201;
        } catch (error) {
            console.error("Failed to add facility:", error);
            return false;
        }
    }

    async Delete(id: number): Promise<boolean> {
        try {
            const response = await axiosInstance.delete(`/floormaps/${id}`);
            return response.status === 204;
        } catch (error) {
            console.error("Failed to delete facility:", error);
            return false;
        }
    }

    async Update(updatedFacility: Facility): Promise<boolean> {
        try {
            const response = await axiosInstance.put(`/floormaps/${updatedFacility.id}`, {id: updatedFacility.id, name: updatedFacility.name, imageBase64: updatedFacility.imageBase64, assets: updatedFacility.containedAssetsIds, zones: updatedFacility.containedZonesIds});
            return response.status === 200;
        } catch (error) {
            console.error("Failed to update facility:", error);
            return false;
        }
    }
}
