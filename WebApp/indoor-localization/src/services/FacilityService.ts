import { Zone } from "../entities/Zone";
import { Asset } from "../entities/Asset";
import { Facility } from "../entities/Facility";
import { EntityService } from "./Service";

export class ZoneService extends EntityService {

  static Get(id: number): Zone | null {
    return this.zoneRepo.Get(id);
  }

  static GetAll(): Zone[] {
    return this.zoneRepo.GetAll();
  }

  static Add(zone: Zone): boolean {
    return this.zoneRepo.Add(zone);
  }

  static Delete(id: number): boolean {
    return this.zoneRepo.Delete(id);
  }

  static Update(zone: Zone): boolean {
    return this.zoneRepo.Update(zone);
  }

  static GetZoneParentFacility(id: number): Facility | null {
    const zone = this.zoneRepo.Get(id);
    if (zone) {
      return this.facilityRepo.Get(zone.parentFacilityId);
    }
    return null;
  }

  static GetAssetsInZone(id: number): Asset[] {
    const zone = this.zoneRepo.Get(id);
    if (zone) {
      return zone.containedAssetsIds.map(assetId => this.assetRepo.Get(assetId)).filter(asset => asset !== null) as Asset[];
    }
    return [];
  }

  static ZoneContainsAsset(zoneId: number, assetId: number): boolean {
    const zone = this.zoneRepo.Get(zoneId);
    if (zone) {
      return zone.containedAssetsIds.includes(assetId);
    }
    return false;
  }
}
