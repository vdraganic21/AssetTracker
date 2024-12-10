import 'package:flutter/material.dart';

class FloorMapWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return InteractiveViewer(
      boundaryMargin: EdgeInsets.all(20),
      minScale: 0.5,
      maxScale: 5.0,
      child: Center(
        child: Image.asset(
          'assets/floor_map.png', // Correct path to your asset
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
