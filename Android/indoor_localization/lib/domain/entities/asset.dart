class Asset {
  final int id;
  final String name;
  int x;
  int y;
  DateTime lastSync;
  bool active;
  String floorMap; // TODO: Replace with actual FloorMap class
  String zone; // TODO: Replace with actual Zone class

  Asset({
    required this.id,
    required this.name,
    required this.x,
    required this.y,
    required this.lastSync,
    required this.active,
    required this.floorMap,
    required this.zone,
  });
}
