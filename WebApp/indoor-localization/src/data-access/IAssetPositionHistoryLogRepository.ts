import { AssetPositionHistoryLog } from "../entities/AssetPositionHistoryLog";
import { IRepository } from "./IRepository";

export interface IAssetPositionHistoryLogRepository extends IRepository<AssetPositionHistoryLog>{
    GetLogs(assetPositionHistoryLog: AssetPositionHistoryLog): AssetPositionHistoryLog[]
}