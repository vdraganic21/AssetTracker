import 'package:flutter/material.dart';
import 'package:indoor_localization/domain/entities/facility.dart';
import 'package:indoor_localization/config/app_colors.dart';

class FacilitySelectorButton extends StatelessWidget {
  final Facility? selectedFacility;
  final List<Facility> facilities;
  final Function(Facility) onFacilityChanged;

  const FacilitySelectorButton({
    Key? key,
    required this.selectedFacility,
    required this.facilities,
    required this.onFacilityChanged,
  }) : super(key: key);

  void _showFacilitySelector(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return Dialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          child: Container(
            constraints: const BoxConstraints(maxWidth: 400, maxHeight: 500),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppColors.primary500,
                    borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(12),
                      topRight: Radius.circular(12),
                    ),
                  ),
                  child: Row(
                    children: [
                      const Text(
                        'Select Facility',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const Spacer(),
                      IconButton(
                        icon: const Icon(Icons.close, color: Colors.white),
                        onPressed: () => Navigator.pop(context),
                      ),
                    ],
                  ),
                ),
                Flexible(
                  child: ListView.builder(
                    shrinkWrap: true,
                    itemCount: facilities.length,
                    itemBuilder: (context, index) {
                      final facility = facilities[index];
                      final isSelected = selectedFacility?.id == facility.id;
                      
                      return InkWell(
                        onTap: () {
                          onFacilityChanged(facility);
                          Navigator.pop(context);
                        },
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 12,
                          ),
                          decoration: BoxDecoration(
                            color: isSelected ? AppColors.primary100 : null,
                          ),
                          child: Row(
                            children: [
                              Icon(
                                isSelected 
                                    ? Icons.radio_button_checked 
                                    : Icons.radio_button_unchecked,
                                color: AppColors.primary500,
                              ),
                              const SizedBox(width: 12),
                              Text(
                                facility.name,
                                style: TextStyle(
                                  fontWeight: isSelected 
                                      ? FontWeight.bold 
                                      : FontWeight.normal,
                                  color: Colors.black87,
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Transform.scale(
      scale: 1.15,
      child: FloatingActionButton(
        onPressed: () => _showFacilitySelector(context),
        backgroundColor: AppColors.primary500,
        child: const Icon(
          Icons.map,
          color: Colors.white,
        ),
      ),
    );
  }
}
