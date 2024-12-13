import 'package:indoor_localization/domain/mock-repositories/mock_asset_repository.dart';
import 'package:indoor_localization/domain/mock-repositories/mock_facility_repository.dart';
import 'package:indoor_localization/domain/mock-repositories/mock_zone_repository.dart';
import 'package:indoor_localization/domain/repository-interfaces/asset_repository.dart';
import 'package:indoor_localization/domain/repository-interfaces/facility_repository.dart';
import 'package:indoor_localization/domain/repository-interfaces/zone_repository.dart';

abstract class EntityService {
  static final IAssetRepository assetRepo = MockAssetRepository();
  static final IZoneRepository zoneRepo = MockZoneRepository();
  static final IFacilityRepository facilityRepo = MockFacilityRepository();
}
