import 'package:flutter/material.dart';
import 'package:report_module_core/reports/report_module.dart';
import '../components/common/bar_chart.dart';
import '../components/common/line_chart.dart';
import '../config/app_colors.dart';

int? selectedIndex;

class AssetIdleTimeReportModule implements ReportModule {
  @override
  String getIcon() => '../../assets/floor_map.png';

  @override
  String getName() => 'Asset Idle Time';

  @override
  Widget getComponent() {
    return const AssetIdleTimeReport();
  }
}

class AssetIdleTimeReport extends StatefulWidget {
  const AssetIdleTimeReport({Key? key}) : super(key: key);

  @override
  _AssetIdleTimeReportState createState() => _AssetIdleTimeReportState();
}

class _AssetIdleTimeReportState extends State<AssetIdleTimeReport> {
  int currentPage = 1;
  PageController _pageController = PageController(initialPage: 1);

  List<Map<String, String>> items = [
    {'name': 'Asset A', 'facility': 'Facility 1', 'zone': 'Zone X'},
    {'name': 'Asset B', 'facility': 'Facility 2', 'zone': 'Zone Y'},
    {'name': 'Asset C', 'facility': 'Facility 3', 'zone': 'Zone Z'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor:AppColors.neutral0,
        title: const Text(
          'Asset Idle Time Report',
          style: TextStyle(color: AppColors.neutral1000),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.download, color: AppColors.primary500),
            onPressed: () {
              // Download functionality
            },
          ),
        ],
        iconTheme: const IconThemeData(color: AppColors.neutral1000),
      ),
      body: Column(
        children: [
          Expanded(
            child: PageView(
              controller: _pageController,
              onPageChanged: (index) {
                setState(() {
                  currentPage = index;
                });
              },
              children: [
                Column(
                  children: [
                    Expanded(
                      child: SizedBox(
                        height: double.infinity,
                        child: const LineChartWidget(),
                      ),
                    ),
                    Expanded(
                      child: SizedBox(
                        height: double.infinity,
                        child: const BarChartWidget(),
                      ),
                    ),
                  ],
                ),
                Column(
                  children: [
                    Container(
                      decoration: BoxDecoration(
                        color: AppColors.primary500,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      padding: const EdgeInsets.all(8.0),
                      margin: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 4.0),
                      child: Row(
                        children: [
                          Expanded(
                            child: Text(
                              'Name',
                              style: const TextStyle(color: AppColors.neutral0, fontWeight: FontWeight.bold),
                              textAlign: TextAlign.left,
                            ),
                          ),
                          Expanded(
                            child: Text(
                              'Facility',
                              style: const TextStyle(color: AppColors.neutral0, fontWeight: FontWeight.bold),
                              textAlign: TextAlign.left,
                            ),
                          ),
                          Expanded(
                            child: Text(
                              'Zone',
                              style: const TextStyle(color: AppColors.neutral0, fontWeight: FontWeight.bold),
                              textAlign: TextAlign.left,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Expanded(
                      child: ListView.builder(
                        itemCount: items.length,
                        itemBuilder: (context, index) {
                          bool isSelected = selectedIndex == index;
                          return GestureDetector(
                            onTap: () {
                              setState(() {
                                selectedIndex = index;
                              });
                            },
                            child: Padding(
                              padding: const EdgeInsets.symmetric(vertical: 2.0, horizontal: 8.0),
                              child: Card(
                                color: isSelected ? AppColors.primary300 : AppColors.neutral0,
                                child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Row(
                                    children: [
                                      Expanded(child: Text(items[index]['name']!)),
                                      Expanded(child: Text(items[index]['facility']!)),
                                      Expanded(child: Text(items[index]['zone']!)),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                  ],
                ),
                SingleChildScrollView(
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: List.generate(4, (index) {
                        return Padding(
                          padding: const EdgeInsets.symmetric(vertical: 15.0),
                          child: Container(
                            width: MediaQuery.of(context).size.width * 0.8,
                            height: 180,
                            child: DataComparisonReportWidget(
                              mainData: "2h 17min",
                              mainDescription: "Viljuškar idle time last 24h",
                              secondaryDataLeft: "5h 33min",
                              secondaryDescriptionLeft: "Last week",
                              secondaryDataRight: "3h 16min",
                              secondaryDescriptionRight: "Last month",
                            ),
                          ),
                        );
                      }),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 10),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(3, (index) {
                return GestureDetector(
                  onTap: () {
                    _pageController.animateToPage(
                      index,
                      duration: Duration(milliseconds: 300),
                      curve: Curves.easeInOut,
                    );
                  },
                  child: Container(
                    margin: EdgeInsets.symmetric(horizontal: 5),
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: currentPage == index ? AppColors.primary500 : AppColors.neutral300,
                    ),
                  ),
                );
              }),
            ),
          ),
        ],
      ),
    );
  }
}

class DataComparisonReportWidget extends StatelessWidget {
  final String mainData;
  final String mainDescription;
  final String secondaryDataLeft;
  final String secondaryDataRight;
  final String secondaryDescriptionLeft;
  final String secondaryDescriptionRight;

  const DataComparisonReportWidget({
    required this.mainData,
    required this.mainDescription,
    required this.secondaryDataLeft,
    required this.secondaryDataRight,
    required this.secondaryDescriptionLeft,
    required this.secondaryDescriptionRight,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        border: Border.all(color: AppColors.neutral500, width: 1),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(
            mainData,
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 6),
          Text(
            mainDescription,
            style: TextStyle(fontSize: 14, color: AppColors.neutral500),
          ),
          SizedBox(height: 10),
          Divider(color: AppColors.neutral300, thickness: 2, height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly, // Adjust spacing
            children: [
              Flexible( // Use Flexible to control spacing
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(secondaryDataLeft, style: TextStyle(fontSize: 16)),
                    Text(secondaryDescriptionLeft, style: TextStyle(fontSize: 12, color: AppColors.neutral500)),
                  ],
                ),
              ),
              Flexible( // Use Flexible to control spacing
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(secondaryDataRight, style: TextStyle(fontSize: 16)),
                    Text(secondaryDescriptionRight, style: TextStyle(fontSize: 12, color: AppColors.neutral500)),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
