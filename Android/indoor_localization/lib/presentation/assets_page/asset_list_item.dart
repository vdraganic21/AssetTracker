import 'package:flutter/material.dart';
import 'package:indoor_localization/config/app_colors.dart';
import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/services/facility_service.dart';


class AssetList extends StatelessWidget {
  final List<Asset> assets;

  const AssetList({Key? key, required this.assets}) : super(key: key);

  Future<List<_AssetWithFacilityName>> _fetchAssetFacilityNames() async {
    final assetFacilityPairs = await Future.wait(assets.map((asset) async {
      final facility = await FacilityService.get(asset.floorMapId);
      return _AssetWithFacilityName(
        asset: asset,
        facilityName: facility?.name ?? 'Unknown Facility',
      );
    }));
    return assetFacilityPairs;
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<_AssetWithFacilityName>>(
      future: _fetchAssetFacilityNames(),
      builder: (context, snapshot) {
        // Show loading indicator while fetching asset-facility data
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }

        // Handle errors
        if (snapshot.hasError) {
          return Center(
            child: Text(
              'Error: ${snapshot.error}',
              style: const TextStyle(color: Colors.red),
            ),
          );
        }

        // Render list of assets with facility names
        final assetFacilityList = snapshot.data ?? [];
        return ListView.builder(
          itemCount: assetFacilityList.length,
          itemBuilder: (context, index) {
            final item = assetFacilityList[index];
            return AssetListItem(
              asset: item.asset,
              facilityName: item.facilityName,
            );
          },
        );
      },
    );
  }
}

class AssetListItem extends StatelessWidget {
  final Asset asset;
  final String facilityName;

  const AssetListItem({Key? key, required this.asset, required this.facilityName}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(8.0),
      margin: const EdgeInsets.symmetric(vertical: 4.0),
      decoration: BoxDecoration(
        border: Border.all(color: AppColors.neutral400, width: 1.0),
        borderRadius: BorderRadius.circular(5.0),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Asset name
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Text(
              asset.name,
              style: const TextStyle(
                fontSize: 16.0,
                color: AppColors.neutral1000,
                fontWeight: FontWeight.normal,
              ),
            ),
          ),
          // Facility name
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Text(
              facilityName,
              style: const TextStyle(
                fontSize: 16.0,
                color: AppColors.primary500,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// Helper class to pair an asset with its resolved facility name
class _AssetWithFacilityName {
  final Asset asset;
  final String facilityName;

  _AssetWithFacilityName({required this.asset, required this.facilityName});
}
