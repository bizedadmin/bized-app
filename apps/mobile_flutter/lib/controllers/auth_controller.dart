import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../utils/api_service.dart';
import '../routes/app_pages.dart';

class AuthController extends GetxController {
  final ApiService _apiService = ApiService();
  final isLoggingIn = false.obs;
  final isRegistering = false.obs;

  @override
  void onInit() {
    super.onInit();
    checkInitialStatus();
  }

  Future<void> checkInitialStatus() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('auth_token');
    if (token != null) {
      Get.offAllNamed(AppRoutes.LOCATIONS);
    }
  }

  Future<void> login(String email, String password) async {
    isLoggingIn.value = true;
    try {
      final response = await _apiService.login(email, password);
      if (response.statusCode == 200) {
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('auth_token', response.data['token']);
        await prefs.setString('user_id', response.data['user']['id']);
        Get.offAllNamed(AppRoutes.LOCATIONS);
      } else {
        Get.snackbar('Error', response.data['message'] ?? 'Login failed');
      }
    } catch (e) {
      Get.snackbar('Error', 'An unexpected error occurred during login');
    } finally {
      isLoggingIn.value = false;
    }
  }

  Future<void> signup(String name, String email, String password) async {
    isRegistering.value = true;
    try {
      final response = await _apiService.signup(name, email, password);
      if (response.statusCode == 201) {
        Get.snackbar('Success', 'Account created! Please sign in.');
        Get.toNamed(AppRoutes.LOGIN);
      } else {
        Get.snackbar('Error', response.data['message'] ?? 'Registration failed');
      }
    } catch (e) {
      Get.snackbar('Error', 'An unexpected error occurred during signup');
    } finally {
      isRegistering.value = false;
    }
  }

  void logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    Get.offAllNamed(AppRoutes.LOGIN);
  }
}
