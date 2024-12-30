import 'package:flutter/material.dart';
import 'package:indoor_localization/domain/entities/asset.dart';
import '../../config/app_colors.dart';
import 'asset_list_item.dart';

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
    _sortAssets();
    displayedAssets = List.from(sortedAssets);
  }

  void _sortAssets() {
    setState(() {
      if (sortBy == 'Name Ascending') {
        sortedAssets.sort((a, b) => a.name.compareTo(b.name));
      } else if (sortBy == 'Name Descending') {
        sortedAssets.sort((a, b) => b.name.compareTo(a.name));
      } else if (sortBy == 'Facility Ascending') {
        sortedAssets.sort((a, b) => a.parentFacilityId.compareTo(b.parentFacilityId));
      } else if (sortBy == 'Facility Descending') {
        sortedAssets.sort((a, b) => b.parentFacilityId.compareTo(a.parentFacilityId));
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
    return Column(
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
              Material(
                child: Container(
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: AppColors.primary500,
                    border: Border.all(color: AppColors.neutral400),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: DropdownButtonHideUnderline(
                    child: ButtonTheme(
                      alignedDropdown: true,
                      child: DropdownButton<String>(
                        value: sortBy,
                        isExpanded: true,
                      dropdownColor: Colors.white,
                      items: [
                        DropdownMenuItem(
                          value: 'Name Ascending',
                          child: Container(
                            width: double.infinity,
                            color: sortBy == 'Name Ascending' ? AppColors.primary500 : Colors.transparent,
                            padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                            child: Align(
                            alignment: Alignment.centerLeft,
                              child: Text(
                                'Name Ascending',
                                style: TextStyle(
                                  color: sortBy == 'Name Ascending' ? Colors.white : Colors.black,
                                ),
                              ),
                            ),
                          ),
                        ),
                        DropdownMenuItem(
                          value: 'Name Descending',
                          child: Align(
                            alignment: Alignment.centerLeft,
                            child: Container(
                              width: double.infinity,
                              color: sortBy == 'Name Descending' ? AppColors.primary500 : Colors.transparent,
                              padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                              child: Text(
                                'Name Descending',
                                style: TextStyle(
                                  color: sortBy == 'Name Descending' ? Colors.white : Colors.black,
                                ),
                              ),
                            ),
                          ),
                        ),
                        DropdownMenuItem(
                          value: 'Facility Ascending',
                          child: Align(
                            alignment: Alignment.centerLeft,
                            child: Container(
                              width: double.infinity,
                              color: sortBy == 'Facility Ascending' ? AppColors.primary500 : Colors.transparent,
                              padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                              child: Text(
                                'Facility Ascending',
                                style: TextStyle(
                                  color: sortBy == 'Facility Ascending' ? Colors.white : Colors.black,
                                ),
                              ),
                            ),
                          ),
                        ),
                        DropdownMenuItem(
                          value: 'Facility Descending',
                          child: Align(
                            alignment: Alignment.centerLeft,
                            child: Container(
                              width: double.infinity,
                              color: sortBy == 'Facility Descending' ? AppColors.primary500 : Colors.transparent,
                              padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                              child: Text(
                                'Facility Descending',
                                style: TextStyle(
                                  color: sortBy == 'Facility Descending' ? Colors.white : Colors.black,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                      onChanged: (value) {
                        if (value != null) {
                          setState(() {
                            sortBy = value;
                            _sortAssets();
                          });
                        }
                      },
                      selectedItemBuilder: (BuildContext context) {
                        return [
                          'Name Ascending',
                          'Name Descending',
                          'Facility Ascending',
                          'Facility Descending'
                        ].map((String value) {
                          return Row(
                            children: [
                              Text(
                                'Sort by: $value',
                                style: TextStyle(color: Colors.white),
                              ),
                            ],
                          );
                        }).toList();
                      },
                    ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        Expanded(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: ListView.builder(
              itemCount: displayedAssets.length,
              itemBuilder: (context, index) {
                Asset asset = displayedAssets[index];
                return AssetListItem(asset: asset);
              },
            ),
          ),
        ),
      ],
    );
  }
}