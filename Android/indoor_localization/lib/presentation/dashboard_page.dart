// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import '../config/app_colors.dart';
import 'facilities_page.dart';
import 'assets_page.dart';
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
        backgroundColor: AppColors.primaryColor,
        elevation: 0,
        title: Column(
          children: [
            Text(
              'Indoor Localization',
              style: TextStyle(color: AppColors.textColor, fontSize: 20),
            ),
            Text(
              'SICK | Mobilisis',
              style: TextStyle(color: AppColors.subtitleTextColor, fontSize: 16),
            ),
          ],
        ),
        centerTitle: true,
      ),
      body: _pages[_selectedIndex], // Display the content of the selected page
      bottomNavigationBar: Container(
        color: AppColors.primaryColor,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
          child: GNav(
            backgroundColor: AppColors.primaryColor,
            color: AppColors.textColor,
            activeColor: AppColors.textColor,
            tabBackgroundColor: AppColors.primaryDarker,
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
