class Point {
  final double x;
  final double y;

  Point(this.x, this.y);

  factory Point.fromJson(Map<String, dynamic> json) {
    return Point(
      (json['x'] as num).toDouble(),
      (json['y'] as num).toDouble(),
    );
  }
}