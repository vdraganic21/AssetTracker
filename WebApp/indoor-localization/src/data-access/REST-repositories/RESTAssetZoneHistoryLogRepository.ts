import { AssetZoneHistoryLog } from "../../entities/AssetZoneHistoryLog";
import { AssetZoneHistoryLogFilter } from "../../entities/AssetZoneHistoryLogFilter";
import { IAssetZoneHistoryLogRepository } from "../repository-interfaces/IAssetZoneHistoryLogRepository";

export class RESTAssetZoneHistoryLogRepository implements IAssetZoneHistoryLogRepository {

    Get(id: number): AssetZoneHistoryLog | null {
        return null;
    }

    GetLogs(assetZoneHistoryLogFilter: AssetZoneHistoryLogFilter): AssetZoneHistoryLog[] {
        //TODO Implement
        return [];
    }

    GetAll(): AssetZoneHistoryLog[] {
        //TODO Implement
        return [];
    }

    Add(log: AssetZoneHistoryLog): boolean {
        return false;
    }

    Delete(id: number): boolean {
        return false;
    }

    Update(updatedLog: AssetZoneHistoryLog): boolean {
        return false;
    }
}
