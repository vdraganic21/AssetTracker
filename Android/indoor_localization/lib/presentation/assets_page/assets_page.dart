import 'package:flutter/material.dart';
import 'package:indoor_localization/domain/entities/asset.dart';
import '../../config/app_colors.dart';
import 'asset_list_item.dart';

class AssetsPage extends StatefulWidget {
  @override
  _AssetsPageState createState() => _AssetsPageState();
}

class _AssetsPageState extends State<AssetsPage> {
  bool _isAscending = true; // Track ascending/descending state
  List<Asset> assets = [
    Asset(
      id: 1,
      name: 'Forklift',
      x: 10,
      y: 20,
      lastSync: DateTime.now(),
      active: true,
      floorMap: 'Warehouse37',
      zone: 'Danger zone',
    ),
    Asset(
      id: 2,
      name: 'Pallet',
      x: 30,
      y: 40,
      lastSync: DateTime.now(),
      active: true,
      floorMap: 'Production line',
      zone: '-',
    ),
    Asset(
      id: 3,
      name: 'Box',
      x: 50,
      y: 60,
      lastSync: DateTime.now(),
      active: true,
      floorMap: 'Warehouse2',
      zone: '-',
    ),Asset(
      id: 1,
      name: 'Forklift',
      x: 10,
      y: 20,
      lastSync: DateTime.now(),
      active: true,
      floorMap: 'Warehouse37',
      zone: 'Danger zone',
    ),
    Asset(
      id: 2,
      name: 'Pallet',
      x: 30,
      y: 40,
      lastSync: DateTime.now(),
      active: true,
      floorMap: 'Production line',
      zone: '-',
    ),
    Asset(
      id: 3,
      name: 'Box',
      x: 50,
      y: 60,
      lastSync: DateTime.now(),
      active: true,
      floorMap: 'Warehouse2',
      zone: '-',
    ),
  ];

  void _toggleSortOrder() {
    setState(() {
      _isAscending = !_isAscending; // Toggle sorting order
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16,16,16,8),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Search Bar
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
              // Filter and Sorting Widgets
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
                      onPressed: _toggleSortOrder, // Toggle sort order on click
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
                          Text(
                            _isAscending
                                ? 'Name-ascending'
                                : 'Name-descending', // Display current sorting
                            style: const TextStyle(
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
              itemCount: assets.length + 1,
              itemBuilder: (context, index) {
                if (index < assets.length) {
                  return AssetListItem(asset: assets[index]);
                } else {
                  return const SizedBox(height: 8);
                }
              },
            ),
          ),
        ),

      ],
    );
  }
}
