import 'package:flutter/material.dart';
import '../../config/app_colors.dart';
import 'facilities_card.dart';

class FacilitiesPage extends StatefulWidget {
  const FacilitiesPage({super.key});

  @override
  _FacilitiesPageState createState() => _FacilitiesPageState();
}

class _FacilitiesPageState extends State<FacilitiesPage> {
  bool _isAscending = true; // Track ascending/descending state

  void _toggleSortOrder() {
    setState(() {
      _isAscending = !_isAscending; // Toggle sorting order
    });
  }
// mock data
  final List<Map<String, String>> facilities = [
    {
      'title': 'Warehouse12 - Sesvete Ludbreške',
      'imageUrl': 'assets/floor_map.png',
    },
    {
      'title': 'Factory - Ivanec',
      'imageUrl': 'assets/floor_map.png',
    },
    {
      'title': 'Warehouse78 - Banfica',
      'imageUrl': 'assets/floor_map.png',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(16),
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
          child: ListView.builder(
            itemCount: facilities.length,
            itemBuilder: (context, index) {
              final facility = facilities[index];
              return FacilityCard(
                title: facility['title']!,
                imageUrl: facility['imageUrl']!,
              );
            },
          ),
        ),
      ],
    );
  }
}
