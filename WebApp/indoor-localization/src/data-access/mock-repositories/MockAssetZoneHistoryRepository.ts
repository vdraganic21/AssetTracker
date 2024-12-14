import { AssetZoneHistoryLog } from "../../entities/AssetZoneHistoryLog";
import { AssetZoneHistoryLogFilter } from "../../entities/AssetZoneHistoryLogFilter";
import { IAssetZoneHistoryLogRepository } from "../repository-interfaces/IAssetZoneHistoryLogRepository";

export class MockAssetZoneHistoryLogRepository implements IAssetZoneHistoryLogRepository {
  private static logs: AssetZoneHistoryLog[] = [];

  Get(id: number): AssetZoneHistoryLog | null {
    return MockAssetZoneHistoryLogRepository.logs.find(log => log.id === id) || null;
  }

  GetLogs(assetZoneHistoryLogFilter: AssetZoneHistoryLogFilter): AssetZoneHistoryLog[] {
    return MockAssetZoneHistoryLogRepository.logs.filter(log => {
      const isZoneMatch = assetZoneHistoryLogFilter.zoneId
        ? log.zone.id === assetZoneHistoryLogFilter.zoneId
        : true;
      const isAssetMatch = assetZoneHistoryLogFilter.assetId
        ? log.asset.id === assetZoneHistoryLogFilter.assetId
        : true;
      const isEnterDateInRange = log.enterDateTime >= assetZoneHistoryLogFilter.enterStartDate &&
        log.enterDateTime <= assetZoneHistoryLogFilter.enterEndDate;
      const isExitDateInRange = log.exitDateTime >= assetZoneHistoryLogFilter.exitStartDate &&
        log.exitDateTime <= assetZoneHistoryLogFilter.exitEndDate;

      return isZoneMatch && isAssetMatch && isEnterDateInRange && isExitDateInRange;
    });
  }

  GetAll(): AssetZoneHistoryLog[] {
    return MockAssetZoneHistoryLogRepository.logs;
  }

  Add(log: AssetZoneHistoryLog): boolean {
    MockAssetZoneHistoryLogRepository.logs.push(log);
    return true;
  }

  Delete(id: number): boolean {
    const index = MockAssetZoneHistoryLogRepository.logs.findIndex(log => log.id === id);
    if (index !== -1) {
      MockAssetZoneHistoryLogRepository.logs.splice(index, 1);
      return true;
    }
    return false;
  }

  Update(updatedLog: AssetZoneHistoryLog): boolean {
    const index = MockAssetZoneHistoryLogRepository.logs.findIndex(log => log.id === updatedLog.id);
    if (index !== -1) {
      MockAssetZoneHistoryLogRepository.logs[index] = updatedLog;
      return true;
    }
    return false;
  }
}
