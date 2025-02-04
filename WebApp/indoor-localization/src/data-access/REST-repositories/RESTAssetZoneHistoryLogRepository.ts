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
        const params: Record<string, any> = {};

        if (assetZoneHistoryLogFilter.zoneId != null) {
            params.zoneId = assetZoneHistoryLogFilter.zoneId;
        }
        if (assetZoneHistoryLogFilter.assetId != null) {
            params.assetId = assetZoneHistoryLogFilter.assetId;
        }
        if (assetZoneHistoryLogFilter.enterStartDate != null) {
            params.enterStartTime = assetZoneHistoryLogFilter.enterStartDate.toISOString();
        }
        if (assetZoneHistoryLogFilter.enterEndDate != null) {
            params.enterEndTime = assetZoneHistoryLogFilter.enterEndDate.toISOString();
        }
        if (assetZoneHistoryLogFilter.exitStartDate != null) {
            params.exitStartTime = assetZoneHistoryLogFilter.exitStartDate.toISOString();
        }
        if (assetZoneHistoryLogFilter.exitEndDate != null) {
            params.exitEndTime = assetZoneHistoryLogFilter.exitEndDate.toISOString();
        }
        if (assetZoneHistoryLogFilter.minRetentionTime != null) {
            params.minRetentionTime = assetZoneHistoryLogFilter.minRetentionTime;
        }
        if (assetZoneHistoryLogFilter.maxRetentionTime != null) {
            params.maxRetentionTime = assetZoneHistoryLogFilter.maxRetentionTime;
        }

        const response = await axiosInstance.get(`/assetZoneHistory`, {
            params: params,
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
      const response = await axiosInstance.get(`/assetZoneHistory`);
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
