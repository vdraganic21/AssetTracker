import { MockAssetPositionHistoryLogRepository } from "../data-access/mock-repositories/MockAssetPositionHistoryLogRepository";
import { RESTAssetPositionHistoryLogRepository } from "../data-access/REST-repositories/RESTAssetPositionHistoryLogRepository";
import { AssetPositionHistoryLog } from "../entities/AssetPositionHistoryLog";
import { AssetPositionHistoryLogFilter } from "../entities/AssetPositionHistoryLogFilter";

export class AssetPositionHistoryLogService {
  private static logRepo = new RESTAssetPositionHistoryLogRepository();

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

  static async GetLogs(
    filter: AssetPositionHistoryLogFilter
  ): Promise<AssetPositionHistoryLog[]> {
    return this.logRepo.GetLogs(filter);
  }
}
