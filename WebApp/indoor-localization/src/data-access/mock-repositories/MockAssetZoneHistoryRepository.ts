import { AssetZoneHistoryLog } from "../../entities/AssetZoneHistoryLog";
import { AssetZoneHistoryLogFilter } from "../../entities/AssetZoneHistoryLogFilter";
import { IAssetZoneHistoryLogRepository } from "../repository-interfaces/IAssetZoneHistoryLogRepository";

export class MockAssetZoneHistoryLogRepository
  implements IAssetZoneHistoryLogRepository
{
  private static logs: AssetZoneHistoryLog[] = [];

  async Get(id: number): Promise<AssetZoneHistoryLog | null> {
    return (
      MockAssetZoneHistoryLogRepository.logs.find((log) => log.id === id) ||
      null
    );
  }

  async GetLogs(
    assetZoneHistoryLogFilter: AssetZoneHistoryLogFilter
  ): Promise<AssetZoneHistoryLog[]> {
    return MockAssetZoneHistoryLogRepository.logs.filter((log) => {
      const isZoneMatch = assetZoneHistoryLogFilter.zoneId
        ? log.zoneId === assetZoneHistoryLogFilter.zoneId
        : true;
      const isAssetMatch = assetZoneHistoryLogFilter.assetId
        ? log.assetId === assetZoneHistoryLogFilter.assetId
        : true;
      const isEnterDateInRange =
        (!assetZoneHistoryLogFilter.enterStartDate ||
          log.enterDateTime >= assetZoneHistoryLogFilter.enterStartDate) &&
        (!assetZoneHistoryLogFilter.enterEndDate ||
          log.enterDateTime <= assetZoneHistoryLogFilter.enterEndDate);
      const isExitDateInRange =
        (!assetZoneHistoryLogFilter.exitStartDate ||
          log.exitDateTime >= assetZoneHistoryLogFilter.exitStartDate) &&
        (!assetZoneHistoryLogFilter.exitEndDate ||
          log.exitDateTime <= assetZoneHistoryLogFilter.exitEndDate);

      return (
        isZoneMatch && isAssetMatch && isEnterDateInRange && isExitDateInRange
      );
    });
  }

  async GetAll(): Promise<AssetZoneHistoryLog[]> {
    return MockAssetZoneHistoryLogRepository.logs;
  }

  async Add(log: AssetZoneHistoryLog): Promise<boolean> {
    MockAssetZoneHistoryLogRepository.logs.push(log);
    return true;
  }

  async Delete(id: number): Promise<boolean> {
    const index = MockAssetZoneHistoryLogRepository.logs.findIndex(
      (log) => log.id === id
    );
    if (index !== -1) {
      MockAssetZoneHistoryLogRepository.logs.splice(index, 1);
      return true;
    }
    return false;
  }

  async Update(updatedLog: AssetZoneHistoryLog): Promise<boolean> {
    const index = MockAssetZoneHistoryLogRepository.logs.findIndex(
      (log) => log.id === updatedLog.id
    );
    if (index !== -1) {
      MockAssetZoneHistoryLogRepository.logs[index] = updatedLog;
      return true;
    }
    return false;
  }
}
