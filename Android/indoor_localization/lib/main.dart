import 'package:flutter/material.dart';
import 'domain/services/report_modules_service.dart';
import 'presentation/dashboard_page/dashboard_page.dart';
import 'config/app_colors.dart';
import 'domain/services/asset_service.dart';
import 'domain/services/facility_service.dart';
import 'domain/entities/asset.dart';
import 'package:custom_report_module/reports/asset_idle_time_report.dart';

import 'domain/entities/facility.dart';

void main() {
  Future<List<Asset>> assets = AssetService.getAll();
  ReportModulesService.registerModules([
    AssetIdleTimeReportModule(),
    // more modules here
  ]);

  //MockDataInitializer.initializeData();

  runApp(MyApp());
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
      home: FutureBuilder<List<Asset>>(
        future: AssetService.getAll(), // Fetch assets
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Scaffold(
              body: Center(child: CircularProgressIndicator()),
            );
          }

          if (snapshot.hasError) {
            return Scaffold(
              body: Center(child: Text('Error: ${snapshot.error}')),
            );
          }

          if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Scaffold(
              body: Center(child: Text('No assets available')),
            );
          }

          return FutureBuilder<List<Facility>>(
            future: FacilityService.getAll(), // Fetch facilities
            builder: (context, facilitySnapshot) {
              if (facilitySnapshot.connectionState == ConnectionState.waiting) {
                return Scaffold(
                  body: Center(child: CircularProgressIndicator()),
                );
              }

              if (facilitySnapshot.hasError) {
                return Scaffold(
                  body: Center(child: Text('Error: ${facilitySnapshot.error}')),
                );
              }

              if (!facilitySnapshot.hasData || facilitySnapshot.data!.isEmpty) {
                return Scaffold(
                  body: Center(child: Text('No facilities available')),
                );
              }

              return DashboardPage(
                assets: snapshot.data!,
                facilities: facilitySnapshot.data!,
              );
            },
          );
        },
      ),
    );
  }
}
