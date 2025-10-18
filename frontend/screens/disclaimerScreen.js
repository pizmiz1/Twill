import { View, Text, Image } from "react-native";
import colors from "../constants/colors";
import Button from "../components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const DisclaimerScreen = () => {
  const navigation = useNavigation();

  const continuePress = async () => {
    const firstUseJSON = JSON.stringify(false);
    await AsyncStorage.setItem("FirstUse", firstUseJSON);

    // navigation.navigate("DOES NOT EXIST YET");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Image style={{ width: "0%", height: "35%", aspectRatio: 1, marginTop: "25%" }} source={require("./../assets/Info.png")}></Image>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          color: "#404040",
        }}
      >
        Welcome!
      </Text>
      <Text
        style={{
          width: "90%",
          marginTop: "3%",
          color: "#7a7a7a",
          textAlign: "center",
        }}
      >
        Any data entered in Twill will be permanently lost if you delete the app. Enjoy!
      </Text>
      <Button label="Continue" style={{ marginTop: "20%" }} onPress={continuePress} />
    </View>
  );
};

export default DisclaimerScreen;
