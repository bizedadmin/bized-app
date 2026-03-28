import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../utils/api_service.dart';

class Location {
  final String id;
  final String name;

  Location({required this.id, required this.name});

  factory Location.fromJson(Map<String, dynamic> json) {
    return Location(
      id: json['id'],
      name: json['name'],
    );
  }
}

class LocationController extends GetxController {
  final ApiService _apiService = ApiService();
  final locations = <Location>[].obs;
  final isLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
    fetchLocations();
  }

  Future<void> fetchLocations() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('auth_token');
    
    if (token == null) return;
    isLoading.value = true;
    try {
      final response = await _apiService.getLocations();
      if (response.statusCode == 200) {
        final List<dynamic> data = response.data;
        locations.value = data.map((json) => Location.fromJson(json)).toList();
      }
    } catch (e) {
      Get.snackbar('Error', 'Failed to fetch business locations');
    } finally {
      isLoading.value = false;
    }
  }
}
