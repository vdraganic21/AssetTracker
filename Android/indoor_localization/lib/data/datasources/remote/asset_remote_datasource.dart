import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:indoor_localization/config/api.dart';

class AssetRemoteDataSource {
  final http.Client client;

  AssetRemoteDataSource(this.client);

  Future<List<Map<String, dynamic>>> fetchAssets() async {
    final response = await client.get(Uri.parse('${api.apiUrl}/assets'));

    if (response.statusCode == 200) {
      final List<dynamic> jsonData = json.decode(response.body);
      return jsonData.map((json) => json as Map<String, dynamic>).toList();
    } else {
      throw Exception("Failed to load assets");
    }
  }
}
