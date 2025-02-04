import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/repository-interfaces/asset_repository.dart';

class MockAssetRepository implements IAssetRepository {
  final List<Asset> _assets = [];

  @override
  Future<Asset?> get(int id) async {
    return _assets.firstWhere((asset) => asset.id == id);
  }

  @override
  Future<List<Asset>> getAll() async {
    return List.unmodifiable(_assets);
  }

  @override
  bool add(Asset asset) {
    return false;
  }

  @override
  bool delete(int id) {
    return false;
  }

  @override
  bool update(Asset updatedAsset)  {
    return false;
  }
}
