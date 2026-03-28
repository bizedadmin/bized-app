import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../controllers/location_controller.dart';
import '../../routes/app_pages.dart';
import '../../utils/app_colors.dart';

class LocationSelectionView extends StatelessWidget {
  const LocationSelectionView({super.key});

  @override
  Widget build(BuildContext context) {
    final locationController = Get.find<LocationController>();

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Select Location'),
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Select your business location',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: AppColors.primary,
              ),
            ),
            const SizedBox(height: 10),
            const Text(
              'Choose a location to view its specialized dashboard and analytics.',
              style: TextStyle(
                fontSize: 14,
                color: AppColors.grey,
              ),
            ),
            const SizedBox(height: 30),
            Expanded(
              child: Obx(() {
                if (locationController.isLoading.value) {
                  return const Center(child: CircularProgressIndicator());
                }
                
                if (locationController.locations.isEmpty) {
                  return Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text('No locations found'),
                        TextButton(
                          onPressed: () => locationController.fetchLocations(),
                          child: const Text('Retry'),
                        ),
                      ],
                    ),
                  );
                }

                return ListView.builder(
                  itemCount: locationController.locations.length,
                  itemBuilder: (context, index) {
                    final location = locationController.locations[index];
                    return Card(
                      elevation: 0,
                      margin: const EdgeInsets.only(bottom: 15),
                      color: AppColors.lightGrey,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: ListTile(
                        contentPadding: const EdgeInsets.all(15),
                        leading: Container(
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: AppColors.primary.withOpacity(0.1),
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(
                            Icons.location_on,
                            color: AppColors.primary,
                          ),
                        ),
                        title: Text(
                          location.name,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                          ),
                        ),
                        subtitle: const Text('Active Branch'),
                        trailing: const Icon(Icons.arrow_forward_ios, size: 16),
                        onTap: () => Get.toNamed(AppRoutes.DASHBOARD, arguments: location.id),
                      ),
                    );
                  },
                );
              }),
            ),
          ],
        ),
      ),
    );
  }
}
