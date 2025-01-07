import 'package:flutter/material.dart';
import 'package:indoor_localization/config/app_colors.dart';

class RefreshButton extends StatelessWidget {
  final VoidCallback? onPressed;

  const RefreshButton({Key? key, this.onPressed}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Transform.scale(
      scale: 1.15,
      child: FloatingActionButton(
        onPressed: onPressed,
        backgroundColor: AppColors.primary500,
        child: Icon(Icons.refresh, color: AppColors.neutral1000),
      ),
    );
  }
}
