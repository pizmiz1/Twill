import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

// screens
import SplashScreen from "../screens/splashScreen";
import DisclaimerScreen from "../screens/disclaimerScreen";
import HomeScreen from "../screens/homeScreen";

const AppNav = () => {
  const Stack = createNativeStackNavigator({
    screenOptions: {
      headerShown: false,
      gestureEnabled: false,
    },
    initialRouteName: "Splash",
    screens: {
      Splash: SplashScreen,
      Disclaimer: DisclaimerScreen,
      Home: HomeScreen,
    },
  });

  const Navigation = createStaticNavigation(Stack);

  return (
    <Navigation>
      <StatusBar style="light" />
    </Navigation>
  );
};

export default AppNav;
