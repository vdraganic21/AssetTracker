import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:indoor_localization/presentation/dashboard_page/grid_button.dart';
import '../../config/app_colors.dart';
import '../facilities_page/facilities_page.dart';
import '../assets_page/assets_page.dart';
import '../reports_page/reports_page.dart';
import 'floor_map_widget.dart';
import '../../domain/entities/asset.dart';
import '../../domain/entities/facility.dart';
import 'package:indoor_localization/presentation/dashboard_page/refresh_button.dart';

class DashboardPage extends StatefulWidget {
  final List<Asset> assets;
  final List<Facility> facilities;
  const DashboardPage({Key? key, required this.assets, required this.facilities}) : super(key: key);

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  int _selectedIndex = 0;

  late List<Widget> _pages;

  @override
  void initState() {
    super.initState();

    _pages = [
      DashboardContent(),
      FacilitiesPage(facilities: widget.facilities),
      AssetsPage(assets: widget.assets),
      ReportsPage(),
    ];
  }
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
      body: _pages[_selectedIndex],
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

class DashboardContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        FloorMapWidget(), // Main content
        RefreshButton(),
        GridButton()
      ],
    );
  }
}


