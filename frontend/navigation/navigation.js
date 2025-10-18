import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import SplashScreen from "../screens/splashScreen";
import DisclaimerScreen from "../screens/disclaimerScreen";

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
    },
  });

  const Navigation = createStaticNavigation(Stack);

  return <Navigation />;
};

export default AppNav;
