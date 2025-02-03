import { MockAssetPositionHistoryLogRepository } from "../data-access/mock-repositories/MockAssetPositionHistoryLogRepository";
import { AssetPositionHistoryLog } from "../entities/AssetPositionHistoryLog";


export class AssetPositionHistoryLogService {
    private static logRepo = new MockAssetPositionHistoryLogRepository();

    static async Get(id: number): Promise<AssetPositionHistoryLog | null> {
        return this.logRepo.Get(id);
      }

    static async GetAll(): Promise<AssetPositionHistoryLog[]> {
        return this.logRepo.GetAll();
    }

    static async Add(log: AssetPositionHistoryLog): Promise<boolean> {
        return this.logRepo.Add(log);
    }

    static async Delete(id: number): Promise<boolean> {
        return this.logRepo.Delete(id);
    }

    static async Update(log: AssetPositionHistoryLog): Promise<boolean> {
        return this.logRepo.Update(log);
    }

}
