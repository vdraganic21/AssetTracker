// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import '../config/app_colors.dart';
import 'facilities_page.dart';
import 'assets_page/assets_page.dart';
import 'reports_page.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  int _selectedIndex = 0;

  // List of pages for navigation
  final List<Widget> _pages = [
    DashboardContent(),
    FacilitiesPage(),
    AssetsPage(),
    ReportsPage(),
  ];

  void _navigateBottomBar(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.primary500,
        elevation: 0,
        title: Column(
          children: [
            Text(
              'Indoor Localization',
              style: TextStyle(color: AppColors.neutral1000, fontSize: 20),
            ),
            Text(
              'SICK | Mobilisis',
              style: TextStyle(color: AppColors.neutral200, fontSize: 16),
            ),
          ],
        ),
        centerTitle: true,
      ),
      body: _pages[_selectedIndex], // Display the content of the selected page
      bottomNavigationBar: Container(
        color: AppColors.primary500,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
          child: GNav(
            backgroundColor: AppColors.primary500,
            color: AppColors.neutral1000,
            activeColor: AppColors.neutral1000,
            tabBackgroundColor: AppColors.primary300,
            padding: EdgeInsets.all(16),
            gap: 8,
            selectedIndex: _selectedIndex,
            onTabChange: _navigateBottomBar,
            tabs: [
              GButton(
                icon: Icons.dashboard,
                text: 'Dashboard',
              ),
              GButton(
                icon: Icons.location_city,
                text: 'Facilities',
              ),
              GButton(
                icon: Icons.inventory,
                text: 'Assets',
              ),
              GButton(
                icon: Icons.bar_chart,
                text: 'Reports',
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// Dashboard content (no search bar)
class DashboardContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        'Dashboard Content',
      ),
    );
  }
}
