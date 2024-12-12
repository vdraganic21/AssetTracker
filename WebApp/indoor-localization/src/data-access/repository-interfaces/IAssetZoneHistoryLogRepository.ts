import { AssetZoneHistoryLog } from "../../entities/AssetZoneHistoryLog";
import { AssetZoneHistoryLogFilter } from "../../entities/AssetZoneHistoryLogFilter";
import { IRepository } from "./IRepository";

export interface IAssetZoneHistoryLogRepository extends IRepository<AssetZoneHistoryLog>{
    GetLogs(assetZoneHistoryLogFilter: AssetZoneHistoryLogFilter): AssetZoneHistoryLog[]
}