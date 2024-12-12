import { Facility } from "../entities/Facility";
import { Asset } from "../entities/Asset";
import { Zone } from "../entities/Zone";
import { EntityService } from "./Service";

export class FacilityService extends EntityService {

  static Get(id: number): Facility | null {
    return this.facilityRepo.Get(id);
  }

  static GetAll(): Facility[] {
    return this.facilityRepo.GetAll();
  }

  static Add(facility: Facility): boolean {
    return this.facilityRepo.Add(facility);
  }

  static Delete(id: number): boolean {
    return this.facilityRepo.Delete(id);
  }

  static Update(facility: Facility): boolean {
    return this.facilityRepo.Update(facility);
  }

  static GetAssetsInFacility(id: number): Asset[] {
    const facility = this.facilityRepo.Get(id);
    if (facility) {
      return facility.containedAssetsIds.map(assetId => this.assetRepo.Get(assetId)).filter(asset => asset !== null) as Asset[];
    }
    return [];
  }

  static GetZonesInFacility(id: number): Zone[] {
    const facility = this.facilityRepo.Get(id);
    if (facility) {
      return facility.containedZonesIds.map(zoneId => this.zoneRepo.Get(zoneId)).filter(zone => zone !== null) as Zone[];
    }
    return [];
  }

  static FacilityContainsAsset(facilityId: number, assetId: number): boolean {
    const facility = this.facilityRepo.Get(facilityId);
    if (facility) {
      return facility.containedAssetsIds.includes(assetId);
    }
    return false;
  }

  static FacilityContainsZone(facilityId: number, zoneId: number): boolean {
    const facility = this.facilityRepo.Get(facilityId);
    if (facility) {
      return facility.containedZonesIds.includes(zoneId);
    }
    return false;
  }
}
