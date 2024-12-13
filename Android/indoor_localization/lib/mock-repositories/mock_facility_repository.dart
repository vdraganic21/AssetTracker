import 'package:indoor_localization/entities/facility.dart';
import 'package:indoor_localization/repository-interfaces/facility_repository.dart';

class MockFacilityRepository implements IFacilityRepository {
  static final List<Facility> _facilities = [];

  @override
  Facility? get(int id) {
    return _facilities.firstWhere((facility) => facility.id == id);
  }

  @override
  List<Facility> getAll() {
    return _facilities;
  }

  @override
  bool add(Facility facility) {
    _facilities.add(facility);
    return true;
  }

  @override
  bool delete(int id) {
    final index = _facilities.indexWhere((facility) => facility.id == id);
    if (index != -1) {
      _facilities.removeAt(index);
      return true;
    }
    return false;
  }

  @override
  bool update(Facility updatedFacility) {
    final index = _facilities.indexWhere((facility) => facility.id == updatedFacility.id);
    if (index != -1) {
      _facilities[index] = updatedFacility;
      return true;
    }
    return false;
  }
}
