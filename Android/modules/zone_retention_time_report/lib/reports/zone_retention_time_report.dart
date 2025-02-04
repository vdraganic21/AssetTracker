import 'package:flutter/material.dart';
import 'package:report_module_core/reports/report_module.dart';
import '../components/common/bar_chart.dart';
import '../components/common/line_chart.dart';
import '../config/app_colors.dart';

int? selectedIndex;
String? selectedFacility;

class ZoneRetentionTimeReport implements ReportModule {
  @override
  String getIcon() => '../../assets/floor_map.png';

  @override
  String getName() => 'Zone Retention';

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
    {'name': 'Zone 1', 'facility': 'Facility 1'},
    {'name': 'Zone 2', 'facility': 'Facility 2'},
    {'name': 'Zone 3', 'facility': 'Facility 3'},
  ];

  List<String> facilities = ['Facility 1', 'Facility 2', 'Facility 3'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.neutral0,
        title: const Text(
          'Zone Retention Time Report',
          style: TextStyle(color: AppColors.neutral1000),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.download, color: AppColors.primary500),
            onPressed: () {},
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
                    Expanded(child: const LineChartWidget()),
                    Expanded(child: const BarChartWidget()),
                  ],
                ),
                Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: DropdownButton<String>(
                        hint: Text("Select Facility"),
                        value: selectedFacility,
                        isExpanded: true,
                        items: facilities.map((String facility) {
                          return DropdownMenuItem<String>(
                            value: facility,
                            child: Text(facility),
                          );
                        }).toList(),
                        onChanged: (String? newValue) {
                          setState(() {
                            selectedFacility = newValue;
                          });
                        },
                      ),
                    ),
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
                            child: Text('Name',
                                style: TextStyle(color: AppColors.neutral0, fontWeight: FontWeight.bold)),
                          ),
                          Expanded(
                            child: Text('Facility',
                                style: TextStyle(color: AppColors.neutral0, fontWeight: FontWeight.bold)),
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
                      children: List.generate(dataComparisonItems.length, (index) {
                        return Padding(
                          padding: const EdgeInsets.symmetric(vertical: 15.0),
                          child: Container(
                            width: MediaQuery.of(context).size.width * 0.8,
                            height: 180,
                            child: DataComparisonReportWidget(
                              mainData: dataComparisonItems[index]["mainData"]!,
                              mainDescription: dataComparisonItems[index]["mainDescription"]!,
                              secondaryDataLeft: dataComparisonItems[index]["secondaryDataLeft"]!,
                              secondaryDescriptionLeft: dataComparisonItems[index]["secondaryDescriptionLeft"]!,
                              secondaryDataRight: dataComparisonItems[index]["secondaryDataRight"]!,
                              secondaryDescriptionRight: dataComparisonItems[index]["secondaryDescriptionRight"]!,
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

List<Map<String, String>> dataComparisonItems = [
  {
    "mainData": "1h",
    "mainDescription": "Average retention time last 24h",
    "secondaryDataLeft": "1h",
    "secondaryDescriptionLeft": "Last week",
    "secondaryDataRight": "1h",
    "secondaryDescriptionRight": "Last month",
  },
  {
    "mainData": "1h",
    "mainDescription": "Maximum retention time last 24h",
    "secondaryDataLeft": "1h",
    "secondaryDescriptionLeft": "Last week",
    "secondaryDataRight": "6h",
    "secondaryDescriptionRight": "Last month",
  },
  {
    "mainData": "1h",
    "mainDescription": "Minimum retention time last 24h",
    "secondaryDataLeft": "1h",
    "secondaryDescriptionLeft": "Last week",
    "secondaryDataRight": "1h",
    "secondaryDescriptionRight": "Last month",
  },
];

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
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Flexible(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(secondaryDataLeft, style: TextStyle(fontSize: 16)),
                    Text(secondaryDescriptionLeft, style: TextStyle(fontSize: 12, color: AppColors.neutral500)),
                  ],
                ),
              ),
              Flexible(
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