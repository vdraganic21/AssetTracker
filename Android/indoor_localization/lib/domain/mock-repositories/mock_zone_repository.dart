import 'package:indoor_localization/domain/entities/zone.dart';
import 'package:indoor_localization/domain/repository-interfaces/zone_repository.dart';

class MockZoneRepository implements IZoneRepository {
  static final List<Zone> _zones = [];

  @override
  Future<Zone> get(int id) async {
    return _zones.firstWhere((zone) => zone.id == id);
  }

  @override
  Future<List<Zone>> getAll() async {
    return _zones;
  }

  @override
  bool add(Zone zone) {
    _zones.add(zone);
    return true;
  }

  @override
  bool delete(int id) {
    final index = _zones.indexWhere((zone) => zone.id == id);
    if (index != -1) {
      _zones.removeAt(index);
      return true;
    }
    return false;
  }

  @override
  bool update(Zone updatedZone) {
    final index = _zones.indexWhere((zone) => zone.id == updatedZone.id);
    if (index != -1) {
      _zones[index] = updatedZone;
      return true;
    }
    return false;
  }
}


