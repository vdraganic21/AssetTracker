import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/domain/entities/zone.dart';
import 'package:indoor_localization/domain/services/entity_service.dart';

class FacilityService extends EntityService {

  static Future<Facility?> get(int id) async {
    return await EntityService.facilityRepo.get(id);
  }

  static Future<List<Facility>> getAll() {
    return EntityService.facilityRepo.getAll();
  }

  static bool add(Facility facility) {
    return EntityService.facilityRepo.add(facility);
  }

  static bool delete(int id) {
    return EntityService.facilityRepo.delete(id);
  }

  static bool update(Facility facility) {
    return EntityService.facilityRepo.update(facility);
  }
}