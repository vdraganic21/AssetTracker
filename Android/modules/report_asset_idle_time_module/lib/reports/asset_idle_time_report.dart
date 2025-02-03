import 'package:flutter/material.dart';
import 'package:report_module_core/reports/report_module.dart';

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
  int? selectedIndex;
  PageController _pageController = PageController(initialPage: 1);

  List<Map<String, String>> items = [
    {'name': 'Asset A', 'facility': 'Facility 1', 'zone': 'Zone X'},
    {'name': 'Asset B', 'facility': 'Facility 2', 'zone': 'Zone Y'},
    {'name': 'Asset C', 'facility': 'Facility 3', 'zone': 'Zone Z'},
  ];

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double cardWidth = screenWidth * 0.6;

    return Scaffold(
      body: PageView(
        controller: _pageController,
        children: [
          const Center(
            child: Text(
              'Empty Screen',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
          ),
          Column(
            children: [
              AppBar(
                backgroundColor: Colors.white,
                title: const Text(
                  'Asset Idle Time Report',
                  style: TextStyle(color: Colors.black),
                ),
                actions: [
                  IconButton(
                    icon: const Icon(Icons.download, color: Colors.blue),
                    onPressed: () {
                      // Download
                    },
                  ),
                ],
                iconTheme: const IconThemeData(color: Colors.black),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.blue,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  padding: const EdgeInsets.all(8.0),
                  child: Row(
                    children: [
                      Expanded(
                        child: Text(
                          'Name',
                          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                          textAlign: TextAlign.left,
                        ),
                      ),
                      Expanded(
                        child: Text(
                          'Facility',
                          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                          textAlign: TextAlign.left,
                        ),
                      ),
                      Expanded(
                        child: Text(
                          'Zone',
                          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                          textAlign: TextAlign.left,
                        ),
                      ),
                    ],
                  ),
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
                          color: isSelected ? Colors.lightBlue[100] : Colors.white,
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
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: MediaQuery.of(context).size.width * 0.5,
                  child: DataComparisonReportWidget(
                    mainData: "17min",
                    mainDescription: "Viljuškar idle time last 24h",
                    secondaryDataLeft: "15min",
                    secondaryDescriptionLeft: "Last week",
                    secondaryDataRight: "16min",
                    secondaryDescriptionRight: "Last month",
                  ),
                ),
                SizedBox(height: 25),
                Container(
                  width: MediaQuery.of(context).size.width * 0.5,
                  child: DataComparisonReportWidget(
                    mainData: "12h 15min",
                    mainDescription: "Viljuškar idle time last 24h",
                    secondaryDataLeft: "15min",
                    secondaryDescriptionLeft: "Last week",
                    secondaryDataRight: "16min",
                    secondaryDescriptionRight: "Last month",
                  ),
                ),
                SizedBox(height: 25),
                Container(
                  width: MediaQuery.of(context).size.width * 0.5,
                  child: DataComparisonReportWidget(
                    mainData: "17min",
                    mainDescription: "Viljuškar idle time last 24h",
                    secondaryDataLeft: "12h 15min",
                    secondaryDescriptionLeft: "Last week",
                    secondaryDataRight: "16min",
                    secondaryDescriptionRight: "Last month",
                  ),
                ),
                SizedBox(height: 25),
                Container(
                  width: MediaQuery.of(context).size.width * 0.5,
                  child: DataComparisonReportWidget(
                    mainData: "17min",
                    mainDescription: "Viljuškar idle time last 24h",
                    secondaryDataLeft: "15min",
                    secondaryDescriptionLeft: "Last week",
                    secondaryDataRight: "16min",
                    secondaryDescriptionRight: "Last month",
                  ),
                ),
              ],
            ),
          )
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
      padding: EdgeInsets.all(8),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey, width: 1),
        borderRadius: BorderRadius.circular(6),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                mainData,
                style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 4),
              Text(
                mainDescription,
                style: TextStyle(fontSize: 12, color: Colors.grey),
              ),
            ],
          ),
          SizedBox(height: 5),
          Divider(
            color: Colors.black,
            thickness: 1,
            height: 16,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    secondaryDataLeft,
                    style: TextStyle(fontSize: 14),
                  ),
                  Text(
                    secondaryDescriptionLeft,
                    style: TextStyle(fontSize: 10, color: Colors.grey),
                  ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    secondaryDataRight,
                    style: TextStyle(fontSize: 14),
                  ),
                  Text(
                    secondaryDescriptionRight,
                    style: TextStyle(fontSize: 10, color: Colors.grey),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}