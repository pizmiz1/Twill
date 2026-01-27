import { createStaticNavigation, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import SplashScreen from "../screens/splashScreen";
import routeNames from "../constants/routeNames";
import SignupScreen from "../screens/signupScreen";
import ModuleScreen from "../screens/moduleScreen";
import DailyScreen from "../screens/dailyScreen";
import ModuleDetailScreen from "../screens/moduleDetailScreen";

const AppNav = () => {
  const Stack = createNativeStackNavigator({
    screenOptions: {
      headerShown: false,
      gestureEnabled: false,
    },
    initialRouteName: routeNames.splash,
    screens: {
      Splash: SplashScreen,
      Signup: SignupScreen,
      Daily: {
        screen: DailyScreen,
        options: ({ navigation }) => {
          const state = navigation.getState();
          const previousRoute = state.routes[state.index - 1];

          return {
            animation:
              previousRoute?.name === routeNames.moduleDetail || previousRoute?.name === routeNames.module ? "slide_from_left" : "slide_from_right",
          };
        },
      },
      Module: {
        screen: ModuleScreen,
        options: ({ navigation }) => {
          const state = navigation.getState();
          const previousRoute = state.routes[state.index - 1];

          return {
            animation: previousRoute?.name === routeNames.moduleDetail ? "slide_from_left" : "slide_from_right",
          };
        },
      },
      ModuleDetail: ModuleDetailScreen,
    },
  });

  const Navigation = createStaticNavigation(Stack);

  return <Navigation />;
};

export default AppNav;
