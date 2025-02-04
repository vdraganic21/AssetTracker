import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import '../../config/app_colors.dart';
import 'package:indoor_localization/domain/entities/asset_position_history_log.dart';
import 'package:indoor_localization/domain/services/asset_position_log_history_service.dart';
import '../../managers/asset_idle_time_counter.dart';

class BarChartWidget extends StatefulWidget {
  const BarChartWidget();

  @override
  _BarChartState createState() => _BarChartState();
}

class _BarChartState extends State<BarChartWidget> {
  Map<int, double> idleTimes = {};
  List<BarChartGroupData> barGroups = [];
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

    final counter = AssetIdleTimeCounter(filteredDataset);
    final facilityIds = counter.getFacilityIdsInDataset();

    idleTimes.clear();
    for (var facilityId in facilityIds) {
      double idleTimeInSeconds = counter.getIdleTimeInFacility(facilityId);
      idleTimes[facilityId] = idleTimeInSeconds / 3600;
    }

    setState(() {
      barGroups = _createBarGroups(idleTimes);
      isLoading = false;
    });
  }

  List<BarChartGroupData> _createBarGroups(Map<int, double> idleTimes) {
    return idleTimes.entries.map((entry) {
      return BarChartGroupData(
        x: entry.key,
        barRods: [
          BarChartRodData(
            toY: entry.value,
            gradient: _barsGradient,
            width: 12,
            borderRadius: BorderRadius.zero,
          )
        ],
        showingTooltipIndicators: [0],
      );
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return isLoading
        ? Center(child: CircularProgressIndicator())
        : Padding(
      padding: const EdgeInsets.only(
        right: 18,
        left: 12,
        top: 24,
        bottom: 12,
      ),
      child: BarChart(
        BarChartData(
          barTouchData: barTouchData,
          titlesData: titlesData,
          borderData: borderData,
          barGroups: barGroups,
          gridData: FlGridData(
            show: true,
            drawVerticalLine: true,
            horizontalInterval: 1,
            verticalInterval: 1,
            getDrawingHorizontalLine: (value) {
              return const FlLine(
                color: AppColors.neutral400,
                strokeWidth: 1,
              );
            },
            getDrawingVerticalLine: (value) {
              return const FlLine(
                color: AppColors.neutral400,
                strokeWidth: 1,
              );
            },
          ),
          alignment: BarChartAlignment.spaceAround,
          maxY: idleTimes.isNotEmpty ? idleTimes.values.reduce((a, b) => a > b ? a : b) + 1 : 5,
        ),
      ),
    );
  }

  BarTouchData get barTouchData => BarTouchData(
    enabled: true,
    touchTooltipData: BarTouchTooltipData(
      getTooltipColor: (group) => Colors.transparent,
      tooltipPadding: EdgeInsets.zero,
      tooltipMargin: 8,
      getTooltipItem: (
          BarChartGroupData group,
          int groupIndex,
          BarChartRodData rod,
          int rodIndex,
          ) {
        return BarTooltipItem(
          '${rod.toY.toStringAsFixed(2)} h',
          const TextStyle(
            color: AppColors.primary300,
            fontWeight: FontWeight.bold,
          ),
        );
      },
    ),
  );

  FlTitlesData get titlesData => FlTitlesData(
    show: true,
    bottomTitles: AxisTitles(
      sideTitles: SideTitles(
        showTitles: true,
        reservedSize: 30,
        getTitlesWidget: (double value, TitleMeta meta) {
          return SideTitleWidget(
            meta: meta,
            space: 4,
            child: Text('Facility $value',
                style: TextStyle(
                  color: AppColors.primary300,
                  fontWeight: FontWeight.bold,
                  fontSize: 12,
                )),
          );
        },
      ),
    ),
    leftTitles: AxisTitles(
      sideTitles: SideTitles(
        showTitles: true,
        reservedSize: 42,
        getTitlesWidget: (double value, TitleMeta meta) {
          return SideTitleWidget(
            meta: meta,
            space: 8,
            child: Text(value.toStringAsFixed(1),
                style: TextStyle(
                  color: AppColors.neutral1000,
                  fontWeight: FontWeight.bold,
                  fontSize: 12,
                )),
          );
        },
      ),
    ),
    topTitles: const AxisTitles(
      sideTitles: SideTitles(showTitles: false),
    ),
    rightTitles: const AxisTitles(
      sideTitles: SideTitles(showTitles: false),
    ),
  );

  FlBorderData get borderData => FlBorderData(
    show: true,
  );

  LinearGradient get _barsGradient => LinearGradient(
    colors: [
      AppColors.primary500,
      AppColors.primary500,
    ],
    begin: Alignment.bottomCenter,
    end: Alignment.topCenter,
  );
}