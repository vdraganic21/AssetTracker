import 'package:flutter/material.dart';
import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/presentation/common_components/dropdown_menu.dart';
import 'facilities_card.dart';
import 'package:indoor_localization/presentation/widgets/data_error_widget.dart'; // Assuming DataErrorWidget is defined in this file

class FacilitiesPage extends StatefulWidget {
  final List<Facility> facilities;
  const FacilitiesPage({Key? key, required this.facilities}) : super(key: key);

  @override
  _FacilitiesPageState createState() => _FacilitiesPageState();
}

class _FacilitiesPageState extends State<FacilitiesPage> {
  late List<Facility> sortedFacilites;
  late List<Facility> displayedFacilities;
  final TextEditingController _searchController = TextEditingController();

  String sortBy = 'Name Ascending';

  @override
  void initState() {
    super.initState();
    _initializeFacilities();
  }

  @override
  void didUpdateWidget(FacilitiesPage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.facilities != oldWidget.facilities) {
      _initializeFacilities();
    }
  }

  void _initializeFacilities() {
    sortedFacilites = List.from(widget.facilities);
    displayedFacilities = List.from(sortedFacilites);
    _sortAssets();
  }

  void _sortAssets() {
    setState(() {
      if (sortBy == 'Name Ascending') {
        sortedFacilites.sort((a, b) => a.name.compareTo(b.name));
      } else if (sortBy == 'Name Descending') {
        sortedFacilites.sort((a, b) => b.name.compareTo(a.name));
      }
      _filterAssets();
    });
  }

  void _filterAssets() {
    setState(() {
      final query = _searchController.text.toLowerCase();
      if (query.isEmpty) {
        displayedFacilities = List.from(sortedFacilites);
      } else {
        displayedFacilities = sortedFacilites
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
    return widget.facilities.isEmpty
      ? const DataErrorWidget(message: 'Unable to load facilities.\nPlease try again later.')
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
                      'Name Descending'
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
              child: ListView.builder(
                itemCount: displayedFacilities.length,
                itemBuilder: (context, index) {
                  Facility facility = displayedFacilities[index];
                  return FacilityCard(facility: facility);
                }
              ),
            ),
          ],
        );
  }
}
