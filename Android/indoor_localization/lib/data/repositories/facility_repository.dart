import 'package:indoor_localization/domain/repository-interfaces/facility_repository.dart';
import 'package:indoor_localization/data/datasources/remote/facility_remote_datasource.dart';
import 'package:indoor_localization/domain/entities/facility.dart';

class FacilityRepository implements IFacilityRepository {
  final FacilityRemoteDataSource remoteDataSource;

  FacilityRepository(this.remoteDataSource);

  @override
  Future<List<Facility>> getAll() async {
    final facilities = await remoteDataSource.fetchFacilities();
    return facilities;
  }

  @override
  Future<Facility?> get(int id) async {
    try {
      return await remoteDataSource.fetchFacilityById(id);
    } catch (e) {
      print('Error fetching facility by id: $e');
      throw Exception('Something went wrong while fetching facility');
    }
  }

  @override
  bool add(Facility facility) {
    throw UnimplementedError();
  }

  @override
  bool delete(int id) {
    throw UnimplementedError();
  }

  @override
  bool update(Facility updatedFacility) {
    throw UnimplementedError();
  }
}
