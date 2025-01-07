import 'package:flutter/material.dart';
import 'package:indoor_localization/config/app_colors.dart';

class GridButton extends StatelessWidget {
  final VoidCallback? onPressed;

  const GridButton({Key? key, this.onPressed}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Positioned(
      bottom: 20,
      right: 20,
      child: Transform.scale(
        scale:1.15,
          child:FloatingActionButton(
            onPressed: onPressed,
            backgroundColor: AppColors.primary500,
            child: const Icon(Icons.grid_view, color: AppColors.neutral1000),
          )
      )
    );
  }
}
