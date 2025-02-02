import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:indoor_localization/presentation/dashboard_page/grid_button.dart';
import 'package:indoor_localization/config/app_colors.dart';
import 'package:indoor_localization/presentation/facilities_page/facilities_page.dart';
import 'package:indoor_localization/presentation/assets_page/assets_page.dart';
import 'package:indoor_localization/presentation/reports_page/reports_page.dart';
import 'package:indoor_localization/presentation/dashboard_page/floor_map_widget.dart';
import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/presentation/dashboard_page/refresh_button.dart';
import 'package:indoor_localization/presentation/dashboard_page/facility_selector_button.dart';
import 'package:indoor_localization/presentation/widgets/data_error_widget.dart';

class DashboardPage extends StatefulWidget {
  final List<Asset> assets;
  final List<Facility> facilities;
  final Function()? onPageChange;

  const DashboardPage({
    Key? key,
    required this.assets,
    required this.facilities,
    this.onPageChange,
  }) : super(key: key);

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  int _selectedIndex = 0;
  late List<Widget> _pages;

  @override
  void initState() {
    super.initState();
    _initializePages();
  }

  @override
  void didUpdateWidget(DashboardPage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.assets != oldWidget.assets || widget.facilities != oldWidget.facilities) {
      _initializePages();
    }
  }

  void _initializePages() {
    _pages = [
      DashboardContent(key: UniqueKey()),
      FacilitiesPage(key: UniqueKey(), facilities: widget.facilities),
      AssetsPage(key: UniqueKey(), assets: widget.assets),
      const ReportsPage(),
    ];
  }

  void _navigateBottomBar(int index) {
    setState(() {
      _selectedIndex = index;
    });
    widget.onPageChange?.call();
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
              style: TextStyle(color: AppColors.neutral0, fontSize: 20),
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
            color: AppColors.neutral0,
            activeColor: AppColors.neutral0,
            tabBackgroundColor: AppColors.primary600,
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

class DashboardContent extends StatefulWidget {
  const DashboardContent({Key? key}) : super(key: key);

  @override
  State<DashboardContent> createState() => _DashboardContentState();
}

class _DashboardContentState extends State<DashboardContent> {
  Facility? _selectedFacility;
  final GlobalKey<FloorMapWidgetState> _floorMapKey = GlobalKey();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final dashboardPage = context.findAncestorWidgetOfExactType<DashboardPage>();
      final facilities = dashboardPage?.facilities ?? [];
      if (facilities.isNotEmpty && _selectedFacility == null) {
        setState(() {
          _selectedFacility = facilities.first;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final dashboardPage = context.findAncestorWidgetOfExactType<DashboardPage>();
    if (dashboardPage == null || dashboardPage.facilities.isEmpty) {
      return const DataErrorWidget(message: 'Unable to load floor map.\nPlease try again later.');
    }
    final facilities = dashboardPage.facilities;
    final assets = dashboardPage.assets ?? [];

    return Stack(
      children: [
        if (_selectedFacility != null)
          FloorMapWidget(
            key: _floorMapKey,
            facility: _selectedFacility!,
            assets: assets.where((asset) => asset.floorMapId == _selectedFacility!.id).toList(),
          ),
        Positioned(
          top: 16,
          right: 16,
          child: GridButton(
            onPressed: () {
              _floorMapKey.currentState?.toggleGrid();
            },
          ),
        ),
        Positioned(
          bottom: 16,
          left: 16,
          child: RefreshButton(
            onPressed: () {
              _floorMapKey.currentState?.resetScale();
            },
          ),
        ),
        Positioned(
          bottom: 16,
          right: 16,
          child: FacilitySelectorButton(
            selectedFacility: _selectedFacility,
            facilities: facilities,
            onFacilityChanged: (facility) {
              setState(() {
                _selectedFacility = facility;
              });
            },
          ),
        ),
      ],
    );
  }
}
