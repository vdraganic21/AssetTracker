import 'package:flutter/widgets.dart';

abstract class ReportModule {
  String getIcon();
  String getName();
  Widget getComponent();
}