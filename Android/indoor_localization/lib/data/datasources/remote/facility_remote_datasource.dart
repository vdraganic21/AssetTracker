import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/data/connections/api.dart';


class FacilityRemoteDataSource {
  final http.Client client;

  FacilityRemoteDataSource({required this.client});

  Future<List<Facility>> fetchFacilities() async {
    final response = await http.get(Uri.parse('${api.apiUrl}/floorMaps'));

    if (response.statusCode == 200) {
      final List<dynamic> jsonData = json.decode(response.body);
      return jsonData.map((json) => Facility.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load facilities');
    }
  }
}
