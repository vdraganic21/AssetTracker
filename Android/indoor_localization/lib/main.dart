import 'package:flutter/material.dart';
import 'presentation/dashboard_page/dashboard_page.dart';
import 'config/app_colors.dart';
import 'domain/mock-repositories/mock_data_initializer.dart';
import 'domain/services/asset_service.dart';
import 'domain/entities/asset.dart';

void main() {
  // Initialize the data at the application load
  MockDataInitializer.initializeData();
  List<Asset> assets = AssetService.getAll();

  runApp(MyApp(assets: assets));
}

class MyApp extends StatelessWidget {
  final List<Asset> assets;

  const MyApp({Key? key, required this.assets}) : super(key: key);

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
      home: DashboardPage(assets: assets),
    );
  }
}
