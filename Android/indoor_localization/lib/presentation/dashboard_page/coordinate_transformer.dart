import 'dart:ui';

class CoordinateTransformer {
  final Size imageSize;
  final Size renderedSize;
  final Size containerSize;

  CoordinateTransformer({
    required this.imageSize,
    required this.renderedSize,
    required this.containerSize,
  });

  Offset transform(int x, int y) {
    double scale = renderedSize.width / imageSize.width;
    
    double actualHeight = imageSize.height * scale;
    
    double offsetX = (containerSize.width - renderedSize.width) / 2;
    double offsetY = (containerSize.height - actualHeight) / 2;
    
    return Offset(
      (x * scale) + offsetX,
      (y * scale) + offsetY,
    );
  }

  double get scale => renderedSize.width / imageSize.width;
}
