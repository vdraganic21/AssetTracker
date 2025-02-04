import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:indoor_localization/config/api.dart';

class AssetPositionHistoryLogDataSource {
  final http.Client client;

  AssetPositionHistoryLogDataSource(this.client);

  Future<List<Map<String, dynamic>>> fetchAssetPositionHistory(String assetId) async {
    final response = await client.get(
      Uri.https('${api.apiUrl}/assetPositionHistory'),
    );

    if (response.statusCode == 200) {
      final List<dynamic> jsonData = json.decode(response.body);
      return jsonData.map((json) => json as Map<String, dynamic>).toList();
    } else {
      throw Exception("Failed to load asset position history");
    }
  }
}
