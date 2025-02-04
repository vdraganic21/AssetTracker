import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:indoor_localization/domain/entities/asset_position_history_log.dart';
import 'package:indoor_localization/domain/services/asset_position_log_history_service.dart';
import '../../managers/asset_idle_time_stats_manager.dart';
import '../../config/app_colors.dart';

class LineChartWidget extends StatefulWidget {
  const LineChartWidget({super.key});

  @override
  State<LineChartWidget> createState() => _LineChartWidgetState();
}

class _LineChartWidgetState extends State<LineChartWidget> {
  List<Color> gradientColors = [
    AppColors.primary500,
    AppColors.primary500,
  ];

  List<FlSpot> idleTimeData = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadChartData();
  }

  Future<void> _loadChartData() async {
    List<AssetPositionHistoryLog> dataset = await AssetPositionHistoryLogService.getAll();

    List<AssetPositionHistoryLog> filteredDataset =
    dataset.where((log) => log.assetId == 1).toList();

    DateTime now = DateTime.now();
    List<FlSpot> spots = [];

    for (int i = 0; i < 30; i++) {
      DateTime targetDate = now.subtract(Duration(days: 30 - i));
      double idleTime = await _calculateIdleTimeForDate(filteredDataset, targetDate);

      idleTime = idleTime.clamp(0, 6);

      spots.add(FlSpot(i.toDouble(), idleTime));
    }

    setState(() {
      idleTimeData = spots;
      isLoading = false;
    });
  }

  Future<double> _calculateIdleTimeForDate(
      List<AssetPositionHistoryLog> dataset, DateTime date) async {
    DateTime startOfDay = DateTime(date.year, date.month, date.day);
    DateTime endOfDay = startOfDay.add(const Duration(days: 1));

    List<AssetPositionHistoryLog> logsForDate = dataset
        .where((log) => log.dateTime.isAfter(startOfDay) && log.dateTime.isBefore(endOfDay))
        .toList();

    if (logsForDate.isEmpty) return 0;

    AssetIdleTimeStatsManager statsManager = AssetIdleTimeStatsManager(logsForDate);
    double idleTime = statsManager.getAvgIdleTime();

    return idleTime / 3600;
  }

  @override
  Widget build(BuildContext context) {
    return isLoading
        ? const Center(child: CircularProgressIndicator())
        : Stack(
      children: <Widget>[
        AspectRatio(
          aspectRatio: 1.70,
          child: Padding(
            padding: const EdgeInsets.only(
              right: 18,
              left: 12,
              top: 24,
              bottom: 12,
            ),
            child: LineChart(mainData()),
          ),
        ),
      ],
    );
  }

  LineChartData mainData() {
    return LineChartData(
      gridData: FlGridData(
        show: true,
        drawVerticalLine: true,
        horizontalInterval: 1,
        verticalInterval: 1,
        getDrawingHorizontalLine: (_) => const FlLine(color: AppColors.neutral400, strokeWidth: 1),
        getDrawingVerticalLine: (_) => const FlLine(color: AppColors.neutral400, strokeWidth: 1),
      ),
      titlesData: FlTitlesData(
        show: true,
        rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
        topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
        bottomTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            reservedSize: 30,
            interval: 5,
            getTitlesWidget: bottomTitleWidgets,
          ),
        ),
        leftTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            interval: 1,
            getTitlesWidget: leftTitleWidgets,
            reservedSize: 42,
          ),
        ),
      ),
      borderData: FlBorderData(
        show: true,
        border: Border.all(color: const Color(0xFF101213)),
      ),
      minX: 0,
      maxX: 29,
      minY: 0,
      maxY: 6,
      lineBarsData: [
        LineChartBarData(
          spots: idleTimeData,
          isCurved: false,
          gradient: LinearGradient(colors: gradientColors),
          barWidth: 5,
          isStrokeCapRound: true,
          belowBarData: BarAreaData(
            show: true,
            gradient: LinearGradient(
              colors: gradientColors.map((color) => color.withOpacity(0.3)).toList(),
            ),
          ),
          dotData: const FlDotData(show: false),
        ),
      ],
    );
  }

  Widget bottomTitleWidgets(double value, TitleMeta meta) {
    const style = TextStyle(fontWeight: FontWeight.bold, fontSize: 12);
    DateTime now = DateTime.now();
    DateTime date = now.subtract(Duration(days: 30 - value.toInt()));

    return SideTitleWidget(
      meta: meta,
      child: Text("${date.day}/${date.month}", style: style),
    );
  }

  Widget leftTitleWidgets(double value, TitleMeta meta) {
    const style = TextStyle(fontWeight: FontWeight.bold, fontSize: 12);
    return SideTitleWidget(
      meta: meta,
      space: 8,
      child: Text("${value.toInt()}h", style: style, textAlign: TextAlign.left),
    );
  }
}