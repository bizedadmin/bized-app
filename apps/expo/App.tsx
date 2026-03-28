import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "@repo/app/provider";

// Screens
import { LandingScreen }       from "@repo/app/features/landing/screen";
import { LoginScreen }         from "@repo/app/features/auth/login-screen";
import { DashboardScreen }     from "@repo/app/features/dashboard/screen";
import { CatalogScreen }       from "@repo/app/features/catalog/screen";
import { OrderScreen }         from "@repo/app/features/order/screen";
import { PaymentLinkScreen }   from "@repo/app/features/payment-links/screen";
import { MarketingScreen }     from "@repo/app/features/marketing/screen";
import { BookingScreen }       from "@repo/app/features/booking/screen";
import { InvoiceScreen }       from "@repo/app/features/invoice/screen";
import { SubscriptionScreen }  from "@repo/app/features/subscriptions/screen";
import { StoreScreen }         from "@repo/app/features/store/screen";
import { UserScreen }          from "@repo/app/features/user/screen";
import { BusinessScreen }      from "@repo/app/features/business/screen";

// React Native icons via Text
import { Text } from "react-native";

const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabIcon(emoji: string) {
  return ({ focused }: { focused: boolean }) => (
    <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#111B21",
          borderTopColor: "#25D366",
          borderTopWidth: 1,
          paddingBottom: 8,
          height: 72,
        },
        tabBarActiveTintColor:   "#25D366",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarLabelStyle: { fontSize: 10, fontWeight: "700", marginBottom: 2 },
      }}
    >
      <Tab.Screen name="Dashboard"     component={DashboardScreen}    options={{ tabBarIcon: TabIcon("📊"), title: "Dash" }} />
      <Tab.Screen name="Catalog"       component={CatalogScreen}      options={{ tabBarIcon: TabIcon("🛍️"), title: "Catalog" }} />
      <Tab.Screen name="Orders"        component={OrderScreen}        options={{ tabBarIcon: TabIcon("📦"), title: "Orders" }} />
      <Tab.Screen name="Payments"      component={PaymentLinkScreen}  options={{ tabBarIcon: TabIcon("💳"), title: "Payments" }} />
      <Tab.Screen name="Marketing"     component={MarketingScreen}    options={{ tabBarIcon: TabIcon("📣"), title: "Marketing" }} />
      <Tab.Screen name="Bookings"      component={BookingScreen}      options={{ tabBarIcon: TabIcon("📅"), title: "Bookings" }} />
      <Tab.Screen name="Invoices"      component={InvoiceScreen}      options={{ tabBarIcon: TabIcon("🧾"), title: "Invoices" }} />
      <Tab.Screen name="Subscriptions" component={SubscriptionScreen} options={{ tabBarIcon: TabIcon("🔁"), title: "Subs" }} />
      <Tab.Screen name="Store"         component={StoreScreen}        options={{ tabBarIcon: TabIcon("🌐"), title: "Store" }} />
      <Tab.Screen name="Profile"       component={UserScreen}         options={{ tabBarIcon: TabIcon("👤"), title: "Profile" }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="landing" component={LandingScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Business" component={BusinessScreen} options={{ presentation: "modal" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
