import { Asset } from "../../entities/Asset";
import { IAssetRepository } from "../repository-interfaces/IAssetRepository";

export class MockAssetRepository implements IAssetRepository {
    private assets: Asset[] = [];

    async Get(id: number): Promise<Asset | null> {
        return this.assets.find(asset => asset.id === id) || null;
    }

    async GetAll(): Promise<Asset[]> {
        return this.assets;
    }

    async Add(asset: Asset): Promise<boolean> {
        this.assets.push(asset);
        return true;
    }

    async Delete(id: number): Promise<boolean> {
        const index = this.assets.findIndex(asset => asset.id === id);
        if (index !== -1) {
            this.assets.splice(index, 1);
            return true;
        }
        return false;
    }

    async Update(updatedAsset: Asset): Promise<boolean> {
        const index = this.assets.findIndex(asset => asset.id === updatedAsset.id);
        if (index !== -1) {
            this.assets[index] = updatedAsset;
            return true;
        }
        return false;
    }
}