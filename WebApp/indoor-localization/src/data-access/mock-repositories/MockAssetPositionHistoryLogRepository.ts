import { AssetPositionHistoryLog } from "../../entities/AssetPositionHistoryLog";
import { AssetPositionHistoryLogFilter } from "../../entities/AssetPositionHistoryLogFilter";
import { IAssetPositionHistoryLogRepository } from "../repository-interfaces/IAssetPositionHistoryLogRepository";

export class MockAssetPositionHistoryLogRepository implements IAssetPositionHistoryLogRepository {
    private static logs: AssetPositionHistoryLog[] = [];
  
    Get(id: number): AssetPositionHistoryLog | null {
      return MockAssetPositionHistoryLogRepository.logs.find(log => log.id === id) || null;
    }

    GetLogs(assetPositionHistoryLogFilter: AssetPositionHistoryLogFilter): AssetPositionHistoryLog[] {
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
  
    GetAll(): AssetPositionHistoryLog[] {
      return MockAssetPositionHistoryLogRepository.logs;
    }
  
    Add(log: AssetPositionHistoryLog): boolean {
      MockAssetPositionHistoryLogRepository.logs.push(log);
      return true;
    }
  
    Delete(id: number): boolean {
      const index = MockAssetPositionHistoryLogRepository.logs.findIndex(log => log.id === id);
      if (index !== -1) {
        MockAssetPositionHistoryLogRepository.logs.splice(index, 1);
        return true;
      }
      return false;
    }
  
    Update(updatedLog: AssetPositionHistoryLog): boolean {
      const index = MockAssetPositionHistoryLogRepository.logs.findIndex(log => log.id === updatedLog.id);
      if (index !== -1) {
        MockAssetPositionHistoryLogRepository.logs[index] = updatedLog;
        return true;
      }
      return false;
    }
  }
  