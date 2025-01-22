import 'package:flutter/material.dart';
import 'domain/services/report_modules_service.dart';
import 'presentation/dashboard_page/dashboard_page.dart';
import 'config/app_colors.dart';
import 'domain/mock-repositories/mock_data_initializer.dart';
import 'domain/services/asset_service.dart';
import 'domain/services/facility_service.dart';
import 'domain/entities/asset.dart';
import 'package:custom_report_module/reports/asset_idle_time_report.dart';

import 'domain/entities/facility.dart';

void main() {
  // Initialize the data at the application load
  MockDataInitializer.initializeData();
  List<Asset> assets = AssetService.getAll();
  ReportModulesService.registerModules([
    AssetIdleTimeReportModule(),
    // more modules here
  ]);

  List<Facility> facilities = FacilityService.getAll();

  runApp(MyApp(assets: assets, facilities: facilities));

}

class MyApp extends StatelessWidget {
  final List<Asset> assets;
  final List<Facility> facilities;

  const MyApp({Key? key, required this.assets, required this.facilities}) : super(key: key);

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
      home: DashboardPage(assets: assets, facilities:facilities),
    );
  }
}
