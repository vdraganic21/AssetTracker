import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:indoor_localization/domain/entities/asset.dart';
import 'package:indoor_localization/config/app_colors.dart';

class FloorMapPainter extends CustomPainter {
  final ui.Image floorMap;
  final List<Asset> assets;
  final double scale;
  final bool showGrid;

  FloorMapPainter({
    required this.floorMap,
    required this.assets,
    this.scale = 1.0,
    this.showGrid = false,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final imageSize = Size(floorMap.width.toDouble(), floorMap.height.toDouble());
    final fittedSize = applyBoxFit(BoxFit.contain, imageSize, size).destination;
    
    final offsetX = (size.width - fittedSize.width) / 2;
    final offsetY = (size.height - fittedSize.height) / 2;

    final src = Rect.fromLTWH(0, 0, imageSize.width, imageSize.height);
    final dst = Rect.fromLTWH(offsetX, offsetY, fittedSize.width, fittedSize.height);
    canvas.drawImageRect(floorMap, src, dst, Paint());

    if (showGrid) {
      final gridPaint = Paint()
        ..color = AppColors.primary500.withOpacity(0.3)
        ..strokeWidth = 1.0;

      final gridSpacing = 50.0;
      for (double x = offsetX; x <= offsetX + fittedSize.width; x += gridSpacing) {
        canvas.drawLine(
          Offset(x, offsetY),
          Offset(x, offsetY + fittedSize.height),
          gridPaint,
        );
      }

      for (double y = offsetY; y <= offsetY + fittedSize.height; y += gridSpacing) {
        canvas.drawLine(
          Offset(offsetX, y),
          Offset(offsetX + fittedSize.width, y),
          gridPaint,
        );
      }
    }

    final activeAssets = assets.where((asset) => asset.isActive).toList();

    for (final asset in activeAssets) {
      final x = (asset.x / imageSize.width) * fittedSize.width + offsetX;
      final y = ((imageSize.height - asset.y) / imageSize.height) * fittedSize.height + offsetY;

      final glowPaint = Paint()
        ..color = AppColors.primary500.withOpacity(0.2)
        ..maskFilter = MaskFilter.blur(BlurStyle.normal, 8);
      canvas.drawCircle(Offset(x, y), 14, glowPaint);

      final gradientPaint = Paint()
        ..shader = RadialGradient(
          colors: [
            AppColors.primary400,
            AppColors.primary600,
          ],
          stops: [0.4, 1.0],
        ).createShader(Rect.fromCircle(center: Offset(x, y), radius: 8));
      canvas.drawCircle(Offset(x, y), 8, gradientPaint);

      final highlightPaint = Paint()
        ..color = Colors.white.withOpacity(0.8)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2;
      canvas.drawCircle(Offset(x, y), 4, highlightPaint);

      final textSpan = TextSpan(
        text: asset.name,
        style: TextStyle(
          color: Colors.white,
          fontSize: 14,
          fontWeight: FontWeight.w600,
        ),
      );

      final textPainter = TextPainter(
        text: textSpan,
        textDirection: TextDirection.ltr,
        textAlign: TextAlign.center,
      );

      textPainter.layout();
      
      final bgRect = RRect.fromRectAndRadius(
        Rect.fromCenter(
          center: Offset(x, y - 28),
          width: textPainter.width + 20,
          height: textPainter.height + 10,
        ),
        Radius.circular(12),
      );
      
      canvas.drawRRect(
        bgRect,
        Paint()
          ..color = AppColors.primary500.withOpacity(0.9)
          ..style = PaintingStyle.fill,
      );

      textPainter.paint(
        canvas,
        Offset(
          x - textPainter.width / 2,
          y - 28 - textPainter.height / 2,
        ),
      );
    }
  }

  @override
  bool shouldRepaint(covariant FloorMapPainter oldDelegate) {
    return oldDelegate.floorMap != floorMap ||
        oldDelegate.assets != assets ||
        oldDelegate.scale != scale ||
        oldDelegate.showGrid != showGrid;
  }
}
