import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncKeys from "../constants/asyncKeys";
import { Text, View } from "react-native";
import { UserDto } from "../../shared/userdto";
import { JsonDto } from "../../shared/jsondto";
import { OtpDto } from "../../shared/otpdto";
import { AccessDto } from "../../shared/accessdto";
import * as SecureStore from "expo-secure-store";
import { ips } from "../constants/ips";

const AuthScreen = () => {
  const checkFirstUse = async () => {
    const FirstUseJSON = await AsyncStorage.getItem(asyncKeys.firstUse);
    const FirstUseParsed = FirstUseJSON != null ? JSON.parse(FirstUseJSON) : null;
  };

  const testFetch = async () => {
    const userEmail = await SecureStore.getItemAsync(asyncKeys.email);

    if (!userEmail) {
      // Have user enter email
      // await SecureStore.setItemAsync(asyncKeys.email, "ebritton12321@gmail.com");
      return;
    }

    const passkey = "aGmLL4TOZYlv*bxc";

    // Testing
    const body: UserDto = { email: "ebritton12321@gmail.com" };
    const API_URL = ips.Cle_Home_Proxy + "/auth/generateOtp";

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const json: JsonDto = await response.json();
    console.log(response.status);
    console.log(json.data);
    console.log(json.error);
  };

  testFetch();

  return (
    <View>
      <Text>Auth Screen</Text>
    </View>
  );
};

export default AuthScreen;
