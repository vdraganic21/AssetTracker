import '../../domain/modules/report-modules/report_module.dart';

class Report {
  final int type;
  final String name;
  final String iconPath;

  Report({
    required this.type,
    required this.name,
    required this.iconPath,
  });

  factory Report.fromModule(ReportModule module, int type) {
    return Report(
      type: type,
      name: module.getName(),
      iconPath: module.getIcon(),
    );
  }

  String getName() {
    return name;
  }
}