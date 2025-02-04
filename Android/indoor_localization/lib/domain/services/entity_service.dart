import 'package:indoor_localization/data/datasources/remote/facility_remote_datasource.dart';
import 'package:indoor_localization/data/repositories/facility_repository.dart';
import 'package:indoor_localization/domain/mock-repositories/mock_zone_repository.dart';
import 'package:indoor_localization/domain/repository-interfaces/asset_repository.dart';
import 'package:indoor_localization/domain/repository-interfaces/facility_repository.dart';
import 'package:indoor_localization/domain/repository-interfaces/zone_repository.dart';
import 'package:http/http.dart' as http;
import 'package:indoor_localization/data/datasources/remote/asset_remote_datasource.dart';
import 'package:indoor_localization/data/repositories/asset_repository.dart';


abstract class EntityService {
  static final IAssetRepository assetRepo = AssetRepository(AssetRemoteDataSource(http.Client()));
  static final IFacilityRepository facilityRepo = FacilityRepository(FacilityRemoteDataSource(client: http.Client()));
  static final IZoneRepository zoneRepo = MockZoneRepository();
}

