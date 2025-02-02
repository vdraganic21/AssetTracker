import { Asset } from "../../entities/Asset";
import { Facility } from "../../entities/Facility";
import { Point } from "../../entities/Point";
import { Zone } from "../../entities/Zone";
import axiosInstance from "../axios/axiosConfig";
import { IFacilityRepository } from "../repository-interfaces/IFacilityRepository";

export class RESTFacilityRepository implements IFacilityRepository {
    
    private getFacilityFromResponse(data: any): Facility {
        const id = data.id;
        const name = data.name;
        const imageBase64 = data.imageBase64;

        const containedAssets : Asset[]= [];

        for (let asset of data.assets) {
            containedAssets.push(new Asset(asset.id, asset.name, asset.floorMapId, new Point(asset.x, asset.y), asset.active)
            );
        }
        const containedZones : Zone[] = [];

        for (let zone of data.zones) {
            console.log(zone);
            console.log(zone.points);
            let points: Point[] = [];
                for (let point of JSON.parse(zone.points)) {
                    console.log(point);
                    points.push(new Point(point.x, point.y));
                }
            console.log(points);
            containedZones.push(new Zone(zone.id, zone.name, points, zone.floorMapId)
            );
        }
    
        return new Facility(id, name, imageBase64, containedAssets, containedZones);
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
            const response = await axiosInstance.post(`/floormaps`, {id: facility.id, name: facility.name, imageBase64: facility.imageBase64, assets: [], zones: []});
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
            const response = await axiosInstance.put(`/floormaps/${updatedFacility.id}`, {id: updatedFacility.id, name: updatedFacility.name, imageBase64: updatedFacility.imageBase64, assets: [], zones: []});
            return response.status === 200;
        } catch (error) {
            console.error("Failed to update facility:", error);
            return false;
        }
    }
}
