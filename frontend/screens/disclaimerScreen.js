import { View, Text, Image } from "react-native";
import colors from "../constants/colors";
import Button from "../components/shared/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const DisclaimerScreen = () => {
  const navigation = useNavigation();

  const continuePress = async () => {
    const firstUseJSON = JSON.stringify(false);
    await AsyncStorage.setItem("FirstUse", firstUseJSON);
    navigation.navigate("Home");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.secondary,
      }}
    >
      <StatusBar style="light" />
      <Image style={{ width: "0%", height: "35%", aspectRatio: 1, marginTop: "15%" }} source={require("./../assets/Info.png")}></Image>
      <Text
        style={{
          fontSize: 50,
          fontWeight: "bold",
          color: "white",
          marginTop: "20%",
          fontFamily: "Main-Font",
          fontStyle: "italic",
          width: "100%",
          textAlign: "center",
        }}
      >
        Welcome!
      </Text>
      <Text
        style={{
          width: "90%",
          marginTop: "3%",
          color: colors.light_grey,
          textAlign: "center",
        }}
      >
        Any data entered in Twill will be permanently lost if you delete the app. Enjoy!
      </Text>
      <Button label="Continue" style={{ marginTop: "10%" }} onPress={continuePress} />
    </View>
  );
};

export default DisclaimerScreen;
