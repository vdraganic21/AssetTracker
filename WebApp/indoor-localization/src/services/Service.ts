import { MockAssetRepository } from "../data-access/mock-repositories/MockAssetRepository";
import { MockFacilityRepository } from "../data-access/mock-repositories/MockFacilityRepository";
import { MockZoneRepository } from "../data-access/mock-repositories/MockZoneRepository";
import { IAssetRepository } from "../data-access/repository-interfaces/IAssetRepository";
import { IFacilityRepository } from "../data-access/repository-interfaces/IFacilityRepository";
import { IZoneRepository } from "../data-access/repository-interfaces/IZoneRepository";

export abstract class EntityService {
  protected static assetRepo: IAssetRepository = new MockAssetRepository();
  protected static zoneRepo: IZoneRepository = new MockZoneRepository();
  protected static facilityRepo: IFacilityRepository = new MockFacilityRepository();

  //connect to REST API
//  protected static assetRepo: IAssetRepository = new RESTAssetRepository();
//  protected static zoneRepo: IZoneRepository = new RESTZoneRepository();
//  protected static facilityRepo: IFacilityRepository = new RESTFacilityRepository();
}
