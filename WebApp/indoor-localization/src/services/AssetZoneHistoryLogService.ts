import { MockAssetZoneHistoryLogRepository } from "../data-access/mock-repositories/MockAssetZoneHistoryRepository";
import { AssetZoneHistoryLog } from "../entities/AssetZoneHistoryLog";


export class AssetZoneHistoryLogService {
    private static logRepo = new MockAssetZoneHistoryLogRepository();

    static async Get(id: number): Promise<AssetZoneHistoryLog | null> {
        return this.logRepo.Get(id);
      }

    static async GetAll(): Promise<AssetZoneHistoryLog[]> {
        return this.logRepo.GetAll();
    }

    static async Add(log: AssetZoneHistoryLog): Promise<boolean> {
        return this.logRepo.Add(log);
    }

    static async Delete(id: number): Promise<boolean> {
        return this.logRepo.Delete(id);
    }

    static async Update(log: AssetZoneHistoryLog): Promise<boolean> {
        return this.logRepo.Update(log);
    }

}
