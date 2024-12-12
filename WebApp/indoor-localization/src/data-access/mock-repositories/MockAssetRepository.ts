import { Asset } from "../../entities/Asset";
import { IAssetRepository } from "../repository-interfaces/IAssetRepository";

export class MockAssetRepository implements IAssetRepository {
    private assets: Asset[] = [];

    Get(id: number): Asset | null {
        return this.assets.find(asset => asset.id === id) || null;
    }

    GetAll(): Asset[] {
        return this.assets;
    }

    Add(asset: Asset): boolean {
        this.assets.push(asset);
        return true;
    }

    Delete(id: number): boolean {
        const index = this.assets.findIndex(asset => asset.id === id);
        if (index !== -1) {
        this.assets.splice(index, 1);
        return true;
        }
        return false;
    }

    Update(updatedAsset: Asset): boolean {
        const index = this.assets.findIndex(asset => asset.id === updatedAsset.id);
        if (index !== -1) {
        this.assets[index] = updatedAsset;
        return true;
        }
        return false;
    }
}
