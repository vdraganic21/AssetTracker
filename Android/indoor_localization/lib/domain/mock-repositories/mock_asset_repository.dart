import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/repository-interfaces/asset_repository.dart';

class MockAssetRepository implements IAssetRepository {
  final List<Asset> _assets = [];

  @override
  Asset? get(int id) {
    return _assets.firstWhere((asset) => asset.id == id);
  }

  @override
  List<Asset> getAll() {
    return _assets;
  }

  @override
  bool add(Asset asset) {
    _assets.add(asset);
    return true;
  }

  @override
  bool delete(int id) {
    final index = _assets.indexWhere((asset) => asset.id == id);
    if (index != -1) {
      _assets.removeAt(index);
      return true;
    }
    return false;
  }

  @override
  bool update(Asset updatedAsset) {
    final index = _assets.indexWhere((asset) => asset.id == updatedAsset.id);
    if (index != -1) {
      _assets[index] = updatedAsset;
      return true;
    }
    return false;
  }
}
