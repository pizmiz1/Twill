import { Image, Animated, View } from "react-native";
import { useRef, useEffect } from "react";
import colors from "./../constants/colors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const setupInitialAsyncStructure = async () => {
      AsyncStorage.clear();

      // Storage Items
      //await AsyncStorage.setItem("FirstUse", JSON.stringify([]));
    };

    const load = async () => {
      // TESTING
      AsyncStorage.clear();

      const FirstUseJSON = await AsyncStorage.getItem("FirstUse");
      const FirstUseParsed = FirstUseJSON != null ? JSON.parse(FirstUseJSON) : null;

      if (FirstUseParsed === null) {
        setupInitialAsyncStructure();

        navigation.navigate("Disclaimer");
      } else {
        navigation.navigate("Home");
      }
    };

    load();
  }, []);

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
      <Animated.Image style={{ width: "0%", height: "35%", aspectRatio: 1, marginBottom: "10%", transform: [{ scale: scaleAnim }] }} source={require("./../assets/logo-clear.png")}></Animated.Image>
    </View>
  );
};

export default SplashScreen;
