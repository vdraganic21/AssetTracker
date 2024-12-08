import 'package:flutter/material.dart';
import 'package:indoor_localization/config/app_colors.dart';
import 'package:indoor_localization/entities/asset.dart';

class AssetListItem extends StatelessWidget {
  final Asset asset;

  const AssetListItem({super.key, required this.asset});

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
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Text(
              asset.floorMap,
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
