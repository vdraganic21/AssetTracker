import 'dart:async';

import 'package:flutter/material.dart';
import 'domain/services/report_modules_service.dart';
import 'presentation/dashboard_page/dashboard_page.dart';
import 'config/app_colors.dart';
import 'domain/services/asset_service.dart';
import 'domain/services/facility_service.dart';
import 'domain/entities/asset.dart';
import 'package:custom_report_module/reports/asset_idle_time_report.dart';
import 'domain/entities/facility.dart';
import 'presentation/widgets/data_error_widget.dart';

void main() {
  ReportModulesService.registerModules([
    AssetIdleTimeReportModule(),
    // more modules here
  ]);

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Indoor Localization',
      theme: ThemeData(
        primaryColor: AppColors.primary500,
        scaffoldBackgroundColor: AppColors.neutral0,
        fontFamily: 'OpenSans',
      ),
      home: const AppDataProvider(),
    );
  }
}

class AppDataProvider extends StatefulWidget {
  const AppDataProvider({Key? key}) : super(key: key);

  @override
  State<AppDataProvider> createState() => _AppDataProviderState();
}

class _AppDataProviderState extends State<AppDataProvider> {
  List<Asset> _assets = [];
  List<Facility> _facilities = [];
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    if (_isLoading) return;  // Prevent multiple simultaneous loads
    
    _isLoading = true;
    try {
      final assets = await AssetService.getAll();
      final facilities = await FacilityService.getAll();
      
      if (mounted) {
        setState(() {
          _assets = assets;
          _facilities = facilities;
        });
      }
    } catch (e) {
      // If there's an error, keep using the last known good data
    } finally {
      _isLoading = false;
    }
  }

  @override
  Widget build(BuildContext context) {
    return DashboardPage(
      assets: _assets,
      facilities: _facilities,
      onPageChange: _loadData,
    );
  }
}
