import { AssetZoneHistoryLog } from "../../entities/AssetZoneHistoryLog";
import { AssetZoneHistoryLogFilter } from "../../entities/AssetZoneHistoryLogFilter";
import axiosInstance from "../axios/axiosConfig";
import { IAssetZoneHistoryLogRepository } from "../repository-interfaces/IAssetZoneHistoryLogRepository";

export class RESTAssetZoneHistoryLogRepository implements IAssetZoneHistoryLogRepository {
  private ParseDataToLog(data: any): AssetZoneHistoryLog {
    return new AssetZoneHistoryLog(
      data.id,
      data.assetId,
      data.zoneId,
      new Date(data.enterDateTime),
      new Date(data.exitDateTime),
      data.retentionTime
    )
  }

  async Get(id: number): Promise<AssetZoneHistoryLog | null> {
    return null;
  }

  async GetLogs(assetZoneHistoryLogFilter: AssetZoneHistoryLogFilter): Promise<AssetZoneHistoryLog[]> {
    try {
      const response = await axiosInstance.get(`/assetPositionHistory`, {
        params: {
            zoneId: assetZoneHistoryLogFilter.zoneId,
            assetId: assetZoneHistoryLogFilter.assetId,
            enterStartDate: assetZoneHistoryLogFilter.enterStartDate.toISOString(),
            enterEndDate: assetZoneHistoryLogFilter.enterEndDate.toISOString(),
            exitStartDate: assetZoneHistoryLogFilter.exitStartDate.toISOString(),
            exitEndDate: assetZoneHistoryLogFilter.exitEndDate.toISOString(),
            minRetentionTime: assetZoneHistoryLogFilter.minRetentionTime,
            maxRetentionTime: assetZoneHistoryLogFilter.maxRetentionTime,
        },
      });
      let logs: AssetZoneHistoryLog[] = [];

      for (let log of response.data) logs.push(this.ParseDataToLog(log));

      return logs;
    } catch (error) {
      console.error("Failed to fetch asset position history logs:", error);
      return [];
    }
  }

  async GetAll(): Promise<AssetZoneHistoryLog[]> {
    try {
      const response = await axiosInstance.get(`/assetPositionHistory`);
      let logs: AssetZoneHistoryLog[] = [];

      for (let log of response.data) logs.push(this.ParseDataToLog(log));

      return logs;
    } catch (error) {
      console.error("Failed to fetch all asset position history logs:", error);
      return [];
    }
  }

  async Add(log: AssetZoneHistoryLog): Promise<boolean> {
    return false;
  }

  async Delete(id: number): Promise<boolean> {
    return false;
  }

  async Update(updatedLog: AssetZoneHistoryLog): Promise<boolean> {
    return false;
  }
}
