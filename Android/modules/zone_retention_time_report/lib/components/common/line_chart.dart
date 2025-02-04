import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
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

  List<FlSpot> retentionTimeData = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadChartData();
  }

  void _loadChartData() {
    List<int> retentionTimes = [120, 180, 150, 200, 170];

    List<FlSpot> spots = List.generate(retentionTimes.length, (index) {
      return FlSpot(index.toDouble(), retentionTimes[index].toDouble());
    });

    setState(() {
      retentionTimeData = spots;
      isLoading = false;
    });
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
        horizontalInterval: 50,
        verticalInterval: 1,
        getDrawingHorizontalLine: (_) =>
        const FlLine(color: AppColors.neutral400, strokeWidth: 1),
        getDrawingVerticalLine: (_) =>
        const FlLine(color: AppColors.neutral400, strokeWidth: 1),
      ),
      titlesData: FlTitlesData(
        show: true,
        rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
        topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
        bottomTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            reservedSize: 30,
            interval: 1,
            getTitlesWidget: bottomTitleWidgets,
          ),
        ),
        leftTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            interval: 50,
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
      maxX: 4,
      minY: 0,
      maxY: 250,
      lineBarsData: [
        LineChartBarData(
          spots: retentionTimeData,
          isCurved: true,
          gradient: LinearGradient(colors: gradientColors),
          barWidth: 5,
          isStrokeCapRound: true,
          belowBarData: BarAreaData(
            show: true,
            gradient: LinearGradient(
              colors: gradientColors.map((color) {
                return color.withValues();
              }).toList(),

            ),
          ),
          dotData: const FlDotData(show: false),
        ),
      ],
    );
  }

  Widget bottomTitleWidgets(double value, TitleMeta meta) {
    const style = TextStyle(fontWeight: FontWeight.bold, fontSize: 12);
    List<String> days = [
      "Jan 05", "Jan 12", "Jan 19", "Jan 26", "Feb 03"
    ];

    if (value.toInt() >= 0 && value.toInt() < days.length) {
      return SideTitleWidget(
        meta: meta,
        child: Text(days[value.toInt()], style: style),
      );
    }
    return const SizedBox();
  }

  Widget leftTitleWidgets(double value, TitleMeta meta) {
    const style = TextStyle(fontWeight: FontWeight.bold, fontSize: 12);
    return SideTitleWidget(
      meta: meta,
      space: 8,
      child: Text("${value.toInt()}", style: style, textAlign: TextAlign.left),
    );
  }
}
