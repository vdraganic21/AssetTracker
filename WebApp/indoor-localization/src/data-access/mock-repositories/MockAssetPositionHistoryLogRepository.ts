import { AssetPositionHistoryLog } from "../../entities/AssetPositionHistoryLog";
import { AssetPositionHistoryLogFilter } from "../../entities/AssetPositionHistoryLogFilter";
import { IAssetPositionHistoryLogRepository } from "../repository-interfaces/IAssetPositionHistoryLogRepository";

export class MockAssetPositionHistoryLogRepository implements IAssetPositionHistoryLogRepository {
    private static logs: AssetPositionHistoryLog[] = [];
  
    async Get(id: number): Promise<AssetPositionHistoryLog | null> {
      return MockAssetPositionHistoryLogRepository.logs.find(log => log.id === id) || null;
    }

    async GetLogs(assetPositionHistoryLogFilter: AssetPositionHistoryLogFilter): Promise<AssetPositionHistoryLog[]> {
        return MockAssetPositionHistoryLogRepository.logs.filter(log => {
          const isFacilityMatch = assetPositionHistoryLogFilter.facilityId
            ? log.facility.id === assetPositionHistoryLogFilter.facilityId
            : true;
          const isAssetMatch = assetPositionHistoryLogFilter.assetId
            ? log.asset.id === assetPositionHistoryLogFilter.assetId
            : true;
          const isDateInRange = log.dateTime >= assetPositionHistoryLogFilter.startDate && log.dateTime <= assetPositionHistoryLogFilter.endDate;
    
          return isFacilityMatch && isAssetMatch && isDateInRange;
        });
      }
  
    async GetAll(): Promise<AssetPositionHistoryLog[]> {
      return MockAssetPositionHistoryLogRepository.logs;
    }
  
    async Add(log: AssetPositionHistoryLog): Promise<boolean> {
      MockAssetPositionHistoryLogRepository.logs.push(log);
      return true;
    }
  
    async Delete(id: number): Promise<boolean> {
      const index = MockAssetPositionHistoryLogRepository.logs.findIndex(log => log.id === id);
      if (index !== -1) {
        MockAssetPositionHistoryLogRepository.logs.splice(index, 1);
        return true;
      }
      return false;
    }
  
    async Update(updatedLog: AssetPositionHistoryLog): Promise<boolean> {
      const index = MockAssetPositionHistoryLogRepository.logs.findIndex(log => log.id === updatedLog.id);
      if (index !== -1) {
        MockAssetPositionHistoryLogRepository.logs[index] = updatedLog;
        return true;
      }
      return false;
    }
  }
  