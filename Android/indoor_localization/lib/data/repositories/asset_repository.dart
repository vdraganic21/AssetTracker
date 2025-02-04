import 'package:indoor_localization/domain/repository-interfaces/asset_repository.dart';
import 'package:indoor_localization/data/datasources/remote/asset_remote_datasource.dart';
import 'package:indoor_localization/domain/entities/asset.dart';


class AssetRepository implements IAssetRepository {
  final AssetRemoteDataSource remoteDataSource;

  AssetRepository(this.remoteDataSource);

  @override
  Future<Asset?> get(int id) {
    throw UnimplementedError();
  }

  @override
  Future<List<Asset>> getAll() async {
    try {
      final rawData = await remoteDataSource.fetchAssets();

      List<Asset> assets = rawData.map((json) {
        return Asset.fromJson(json);
      }).toList();

      return assets;
    } catch (e) {
      print('Error fetching assets: $e');
      return [];
    }
  }

  @override
  bool add(Asset asset) {
    throw UnimplementedError();
  }

  @override
  bool delete(int id) {
    throw UnimplementedError();
  }

  @override
  bool update(Asset updatedAsset) {
    throw UnimplementedError();
  }
}