import 'package:flutter/material.dart';
import 'package:indoor_localization/config/app_colors.dart';

class GridButton extends StatelessWidget {
  final VoidCallback? onPressed;

  const GridButton({Key? key, this.onPressed}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Positioned(
      bottom: 16,
      right: 16,
      child: FloatingActionButton(
        onPressed: onPressed,
        backgroundColor: AppColors.primary500,
        child: Icon(Icons.grid_view, color: AppColors.neutral1000),
      ),
    );
  }
}
