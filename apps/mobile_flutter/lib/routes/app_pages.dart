import 'package:get/get.dart';
import '../views/onboarding/onboarding_view.dart';
import '../views/auth/login_view.dart';
import '../views/auth/signup_view.dart';
import '../views/locations/location_selection_view.dart';
import '../views/dashboard/dashboard_view.dart';
import 'app_bindings.dart';

class AppRoutes {
  static const ONBOARDING = '/';
  static const LOGIN = '/login';
  static const SIGNUP = '/signup';
  static const LOCATIONS = '/locations';
  static const DASHBOARD = '/dashboard';
}

class AppPages {
  static final routes = [
    GetPage(
      name: AppRoutes.ONBOARDING,
      page: () => const OnboardingView(),
    ),
    GetPage(
      name: AppRoutes.LOGIN,
      page: () => const LoginView(),
    ),
    GetPage(
      name: AppRoutes.SIGNUP,
      page: () => const SignupView(),
    ),
    GetPage(
      name: AppRoutes.LOCATIONS,
      page: () => const LocationSelectionView(),
      binding: LocationBinding(),
    ),
    GetPage(
      name: AppRoutes.DASHBOARD,
      page: () => const DashboardView(),
    ),
  ];
}
