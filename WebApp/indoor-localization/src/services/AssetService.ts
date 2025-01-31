import { Asset } from "../entities/Asset";
import { EntityService } from "./Service";

export class AssetService extends EntityService {
    static async Get(id: number): Promise<Asset | null> {
        return this.assetRepo.Get(id);
      }

    static async GetAll(): Promise<Asset[]> {
        return this.assetRepo.GetAll();
    }

    static async Add(asset: Asset): Promise<boolean> {
        return this.assetRepo.Add(asset);
    }

    static async Delete(id: number): Promise<boolean> {
        return this.assetRepo.Delete(id);
    }

    static async Update(asset: Asset): Promise<boolean> {
        return this.assetRepo.Update(asset);
    }
}
