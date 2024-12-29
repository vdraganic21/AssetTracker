import 'package:flutter/material.dart';
import 'package:indoor_localization/domain/entities/asset.dart';
import '../../config/app_colors.dart';
import 'asset_list_item.dart';


class AssetsPage extends StatelessWidget {
  final List<Asset> assets;

  const AssetsPage({Key? key, required this.assets}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextField(
                decoration: InputDecoration(
                  contentPadding: const EdgeInsets.symmetric(vertical: 12),
                  hintText: 'Search...',
                  prefixIcon: const Icon(Icons.search),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  ElevatedButton.icon(
                    onPressed: () {
                      // Filter logic here
                    },
                    icon: const Icon(Icons.filter_list),
                    label: const Text('Filter'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.primary500,
                      foregroundColor: AppColors.neutral0,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () {
                        // Sorting logic here
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary500,
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                      ),
                      child: Row(
                        children: [
                          const Text(
                            'Sort by:',
                            style: TextStyle(color: Colors.white),
                          ),
                          const SizedBox(width: 8),
                          const Text(
                            'Name-ascending',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        Expanded(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: ListView.builder(
              itemCount: assets.length,
              itemBuilder: (context, index) {
                Asset asset = assets[index];
                return AssetListItem(asset: asset);
              },
            ),
          ),
        ),
      ],
    );
  }
}