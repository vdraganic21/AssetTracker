import { Asset } from "../../entities/Asset";
import { Point } from "../../entities/Point";
import axiosInstance from "../axios/axiosConfig";
import { IAssetRepository } from "../repository-interfaces/IAssetRepository";
export class RESTAssetRepository implements IAssetRepository {
    private getAssetFromResponse(data: any): Asset{
        const asset = new Asset(data.id, data.name, data.floorMapId, new Point(data.x, data.y), data.active)
        return asset;
    }

    async Get(id: number): Promise<Asset | null> {
        try {
            const response = await axiosInstance.get(`/assets/${id}`);

            return this.getAssetFromResponse(response.data);
        } catch (error) {
            console.error("Failed to fetch asset:", error);
            return null;
        }
    }

    async GetAll(): Promise<Asset[]> {
        try {
            const response = await axiosInstance.get<Asset[]>(`/assets`);
            if (response.data == null || response.data.length === 0) {
                return [];
            }

            let assets = [];
            for (const assetData of response.data){
                assets.push(this.getAssetFromResponse(assetData));
            }

            return assets;

        } catch (error) {
            console.error("Failed to fetch assets:", error);
            return [];
        }
    }

    async Add(asset: Asset): Promise<boolean> {
        try {
            const response = await axiosInstance.post<Asset>(`/assets`, asset);
            return response.status === 201;
        } catch (error) {
            console.error("Failed to add asset:", error);
            return false;
        }
    }

    async Delete(id: number): Promise<boolean> {
        try {
            const response = await axiosInstance.delete(`/assets/${id}`);
            return response.status === 204;
        } catch (error) {
            console.error("Failed to delete asset:", error);
            return false;
        }
    }

    async Update(updatedAsset: Asset): Promise<boolean> {
        try {
            console.log(updatedAsset);
            const response = await axiosInstance.put(`/assets/${updatedAsset.id}`, {id: updatedAsset.id, name: updatedAsset.name});
            return response.status === 200;
        } catch (error) {
            console.error("Failed to update asset:", error);
            return false;
        }
    }
}