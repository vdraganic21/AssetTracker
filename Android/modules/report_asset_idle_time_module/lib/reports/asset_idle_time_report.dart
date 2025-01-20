import 'package:flutter/material.dart';
import 'package:report_module_core/reports/report_module.dart';

class AssetIdleTimeReportModule implements ReportModule {
  @override
  String getIcon() => '../../../../assets/floor_map.png';

  @override
  String getName() => 'Asset Idle Time';

  @override
  Widget getComponent() {
    return const AssetIdleTimeReport();
  }
}

class AssetIdleTimeReport extends StatelessWidget {
  const AssetIdleTimeReport({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Asset Idle Time Report')),
      body: const Center(
        child: Text('Asset Idle Time Report'),
      ),
    );
  }
}
