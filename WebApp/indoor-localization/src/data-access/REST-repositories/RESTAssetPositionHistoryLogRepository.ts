import { AssetPositionHistoryLog } from "../../entities/AssetPositionHistoryLog";
import { AssetPositionHistoryLogFilter } from "../../entities/AssetPositionHistoryLogFilter";
import { Point } from "../../entities/Point";
import axiosInstance from "../axios/axiosConfig";
import { IAssetPositionHistoryLogRepository } from "../repository-interfaces/IAssetPositionHistoryLogRepository";

export class RESTAssetPositionHistoryLogRepository implements IAssetPositionHistoryLogRepository {
  private ParseDataToLog(data: any): AssetPositionHistoryLog {
    return new AssetPositionHistoryLog(
      data.id,
      data.assetId,
      data.floorMapId,
      new Point(data.x, data.y),
      new Date(data.timestamp)
    )
  }

  async Get(id: number): Promise<AssetPositionHistoryLog | null> {
    return null;
  }

  async GetLogs(assetPositionHistoryLogFilter: AssetPositionHistoryLogFilter): Promise<AssetPositionHistoryLog[]> {
    try {
        const params: any = {};

        if (assetPositionHistoryLogFilter.facilityId != null) {
            params.floorMapId = assetPositionHistoryLogFilter.facilityId;
        }
        if (assetPositionHistoryLogFilter.assetId != null) {
            params.assetId = assetPositionHistoryLogFilter.assetId;
        }
        if (assetPositionHistoryLogFilter.startDate instanceof Date) {
            params.startDate = assetPositionHistoryLogFilter.startDate.toISOString();
        }
        if (assetPositionHistoryLogFilter.endDate instanceof Date) {
            params.endDate = assetPositionHistoryLogFilter.endDate.toISOString();
        }

        const response = await axiosInstance.get(`/assetPositionHistory`, {
            params
        });

        let logs: AssetPositionHistoryLog[] = [];
        for (let log of response.data) logs.push(this.ParseDataToLog(log));

        console.log(logs);
        console.log(params);
        return logs;
    } catch (error) {
        console.error("Failed to fetch asset position history logs:", error);
        return [];
    }
}


  async GetAll(): Promise<AssetPositionHistoryLog[]> {
    try {
      const response = await axiosInstance.get(`/assetPositionHistory`);
      let logs: AssetPositionHistoryLog[] = [];

      for (let log of response.data) logs.push(this.ParseDataToLog(log));

      return logs;
    } catch (error) {
      console.error("Failed to fetch all asset position history logs:", error);
      return [];
    }
  }

  async Add(log: AssetPositionHistoryLog): Promise<boolean> {
    return false;
  }

  async Delete(id: number): Promise<boolean> {
    return false;
  }

  async Update(updatedLog: AssetPositionHistoryLog): Promise<boolean> {
    return false;
  }
}
