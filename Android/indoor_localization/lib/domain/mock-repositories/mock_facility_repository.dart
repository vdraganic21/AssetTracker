import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/domain/repository-interfaces/facility_repository.dart';

class MockFacilityRepository implements IFacilityRepository {
  static final List<Facility> _facilities = [];

  @override
  Future<Facility?> get(int id) async {
    return _facilities.firstWhere((facility) => facility.id == id);
  }

  @override
  Future<List<Facility>> getAll() async {
    return List.unmodifiable(_facilities);
  }

  @override
  bool add(Facility facility) {
    return false;
  }

  @override
  bool delete(int id)  {
    return false;
  }

  @override
  bool update(Facility updatedFacility)  {
    return false;
  }
}