import { AssetZoneHistoryLog } from "../entities/AssetZoneHistoryLog";
import { IRepository } from "./IRepository";

export interface IAssetZoneHistoryLogRepository extends IRepository<AssetZoneHistoryLog>{
    GetLogs(assetZoneHistoryLog: AssetZoneHistoryLog): AssetZoneHistoryLog[]
}