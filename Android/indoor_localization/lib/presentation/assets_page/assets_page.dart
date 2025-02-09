import 'dart:async';
import 'package:flutter/material.dart';
import 'package:indoor_localization/domain/entities/asset.dart';
import '../../presentation/common_components/dropdown_menu.dart';
import 'asset_list_item.dart';
import 'package:indoor_localization/presentation/widgets/data_error_widget.dart';

class AssetsPage extends StatefulWidget {
  final List<Asset> assets;

  const AssetsPage({Key? key, required this.assets}) : super(key: key);

  @override
  _AssetsPageState createState() => _AssetsPageState();
}

class _AssetsPageState extends State<AssetsPage> {
  late List<Asset> sortedAssets;
  late List<Asset> displayedAssets;
  final TextEditingController _searchController = TextEditingController();

  String sortBy = 'Name Ascending';

  @override
  void initState() {
    super.initState();
    sortedAssets = List.from(widget.assets);
    displayedAssets = List.from(sortedAssets);
    _sortAssets();
  }

  void _sortAssets() {
    setState(() {
      if (sortBy == 'Name Ascending') {
        sortedAssets.sort((a, b) => a.name.compareTo(b.name));
      } else if (sortBy == 'Name Descending') {
        sortedAssets.sort((a, b) => b.name.compareTo(a.name));
      } else if (sortBy == 'Facility Ascending') {
        sortedAssets.sort((a, b) => a.floorMapId.compareTo(b.floorMapId));
      } else if (sortBy == 'Facility Descending') {
        sortedAssets.sort((a, b) => b.floorMapId.compareTo(a.floorMapId));
      }
      _filterAssets();
    });
  }

  void _filterAssets() {
    setState(() {
      final query = _searchController.text.toLowerCase();
      if (query.isEmpty) {
        displayedAssets = List.from(sortedAssets);
      } else {
        displayedAssets = sortedAssets
            .where((asset) => asset.name.toLowerCase().startsWith(query))
            .toList();
      }
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return widget.assets.isEmpty 
      ? const DataErrorWidget(message: 'Unable to load assets.\nPlease try again later.')
      : Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  TextField(
                    controller: _searchController,
                    onChanged: (value) => _filterAssets(),
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
                  CustomDropdown(
                    selectedValue: sortBy,
                    items: [
                      'Name Ascending',
                      'Name Descending',
                      'Facility Ascending',
                      'Facility Descending',
                    ],
                    onChanged: (value) {
                      setState(() {
                        sortBy = value;
                        _sortAssets();
                      });
                    },
                  ),
                ],
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: AssetList(assets: displayedAssets), // Use AssetList here
              ),
            ),
          ],
        );
  }
}
