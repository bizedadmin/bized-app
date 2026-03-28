import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'api_constants.dart';

class ApiService {
  final Dio dio = Dio(BaseOptions(
    baseUrl: ApiConstants.baseUrl,
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 10),
  ));

  ApiService() {
    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('auth_token');
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
    ));
  }

  Future<Response> login(String email, String password) async {
    return await dio.post(ApiConstants.login, data: {
      'email': email,
      'password': password,
    });
  }

  Future<Response> signup(String name, String email, String password) async {
    return await dio.post(ApiConstants.register, data: {
      'name': name,
      'email': email,
      'password': password,
    });
  }

  Future<Response> getLocations() async {
    return await dio.get(ApiConstants.locations);
  }

  Future<Response> getDashboardStats(String locationId) async {
    return await dio.get('${ApiConstants.dashboard}/$locationId');
  }
}
