import { Asset } from "../../entities/Asset";
import { IAssetRepository } from "../repository-interfaces/IAssetRepository";

export class RESTAssetRepository implements IAssetRepository {

    Get(id: number): Asset | null {
        //TODO implement
        return null;
    }

    GetAll(): Asset[] {
        //TODO implement
        return [];
    }

    Add(asset: Asset): boolean {
        //TODO implement

        return true;
    }

    Delete(id: number): boolean {
        //TODO implement

        return false;
    }

    Update(updatedAsset: Asset): boolean {
        //TODO implement
        return false;
    }
}
