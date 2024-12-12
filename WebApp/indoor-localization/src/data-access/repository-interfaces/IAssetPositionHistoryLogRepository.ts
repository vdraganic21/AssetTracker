import { AssetPositionHistoryLog } from "../../entities/AssetPositionHistoryLog";
import { AssetPositionHistoryLogFilter } from "../../entities/AssetPositionHistoryLogFilter";
import { IRepository } from "./IRepository";

export interface IAssetPositionHistoryLogRepository extends IRepository<AssetPositionHistoryLog>{
    GetLogs(assetPositionHistoryLogFilter: AssetPositionHistoryLogFilter): AssetPositionHistoryLog[]
}