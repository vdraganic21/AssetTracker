import 'package:report_module_core/reports/report_module.dart';

class ReportModulesService {
  static final List<ReportModule> _modules = [];

  static void registerModules(List<ReportModule> modules) {
    _modules.clear();
    _modules.addAll(modules);
  }

  static List<ReportModule> getAllModules() {
    return List.unmodifiable(_modules);
  }
}