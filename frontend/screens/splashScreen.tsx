import { Animated, View } from "react-native";
import { useRef, useEffect } from "react";
import colors from "./../constants/colors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import asyncKeys from "../constants/asyncKeys";
import routeNames from "../constants/routeNames";
import { useGlobalContext } from "../store/globalContext";
import { UserDto } from "./../../shared/models/userdto";
import { JsonDto } from "./../../shared/models/jsondto";
import uuid from "react-native-uuid";
import { ModuleType } from "../types/moduleType";

const SplashScreen = () => {
  const { updateModules } = useGlobalContext();

  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [loaded, error] = useFonts({
    "Main-Font": require("./../assets/Helvetica.ttf"),
  });

  useEffect(() => {
    const loadGlobalState = async () => {
      // Get Data
      // Do fetch here
      const existingModules: ModuleType[] = [];

      // Update Global State
      updateModules(existingModules);
    };

    const load = async () => {
      // Testing auth screen
      navigation.navigate(routeNames.auth as never);

      /* need to check if authed
      if (authed === null) {
        // Go to auth screen
        navigation.navigate(routeNames.auth as never);
      } else {
        await loadGlobalState();

        navigation.navigate(routeNames.home as never);
      }
        */
    };

    if (!loaded) {
      return;
    }

    load();
  }, [loaded]);

  Animated.loop(
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ])
  ).start();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }}>
      <StatusBar style="light" />
      <Animated.Image style={{ width: "0%", height: "35%", aspectRatio: 1, marginBottom: "10%", transform: [{ scale: scaleAnim }] }} source={require("./../assets/logo-clear.png")}></Animated.Image>
    </View>
  );
};

export default SplashScreen;
