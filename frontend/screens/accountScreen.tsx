import { Animated, Switch, Text, TouchableOpacity, View } from "react-native";
import PageContainer from "../components/shared/pageContainer";
import { useEffect, useRef, useState } from "react";
import routeNames from "../constants/routeNames";
import { useGlobalContext } from "../store/globalContext";
import { deleteAlert, errorAlert } from "../helpers/alert";
import * as SecureStore from "expo-secure-store";
import storageKeys from "../constants/storageKeys";
import { AccessDto } from "../../shared/accessdto";
import { JsonDto } from "../../shared/jsondto";
import { get, post } from "../helpers/fetch";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { opacityLayout } from "../helpers/layouts";

const AccountScreen = () => {
  const { userSettings, patchUserSettings, accessToken, updateAccessToken, updateModules } = useGlobalContext();

  const navigation = useNavigation();

  const [blurActive, setBlurActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localEnableCompleteAnimation, setLocalEnableCompleteAnimation] = useState(userSettings.enableCompleteAnimation);
  const [switchesDisabled, setSwitchesDisabled] = useState(false);

  const headerOpacity = useRef(new Animated.Value(0)).current;
  const loadingOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: blurActive ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [blurActive]);

  useEffect(() => {
    Animated.timing(loadingOpacity, {
      toValue: loading ? 0.6 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [loading]);

  const signOutOrDelete = async (signOut: boolean) => {
    opacityLayout();
    setLoading(true);

    const passkey = await SecureStore.getItemAsync(storageKeys.passkey);

    const req: AccessDto = {
      email: userSettings.userEmail,
      passkey: passkey!,
    };

    const url = signOut ? "/auth/signOut" : "/auth/deleteAccount";
    const response: JsonDto<any> = await post(url, req, { accessToken: accessToken, updateAccessToken: updateAccessToken });

    if (response.error) {
      errorAlert(response.error);
      setLoading(false);
      return;
    }

    await SecureStore.deleteItemAsync(storageKeys.email);
    await SecureStore.deleteItemAsync(storageKeys.passkey);
    await SecureStore.deleteItemAsync(storageKeys.token);
    updateAccessToken("");
    updateModules([]);

    navigation.navigate(routeNames.signup);
  };

  const toggleEnableCompletionAnimation = async () => {
    const newState = !localEnableCompleteAnimation;
    setLocalEnableCompleteAnimation(newState);
    setSwitchesDisabled(true);

    let newUserSettings = userSettings;
    newUserSettings.enableCompleteAnimation = newState;

    const success = await patchUserSettings(newUserSettings);

    if (!success) {
      setLocalEnableCompleteAnimation(!newState);
    }

    setSwitchesDisabled(false);
  };

  return (
    <PageContainer
      header="Account"
      setBlurActive={setBlurActive}
      backButton={true}
      backButtonRoute={routeNames.daily}
      backButtonDisabled={loading}
      backButtonStyle={{ opacity: loading ? 0.6 : 1 }}
    >
      <Animated.Text
        style={{
          color: "white",
          fontSize: 50,
          fontFamily: "Main-Font",
          fontStyle: "italic",
          fontWeight: "bold",
          opacity: headerOpacity,
        }}
      >
        Account
      </Animated.Text>

      <View style={{ marginTop: 30 }}>
        <Text style={{ color: "white", fontSize: 23 }}>{userSettings.userEmail}</Text>
      </View>

      <Animated.View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#333438",
          padding: 20,
          borderRadius: 30,
          alignItems: "center",
          marginTop: 30,
          opacity: loadingOpacity,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Complete Module Animation</Text>
        <Switch value={localEnableCompleteAnimation} onValueChange={toggleEnableCompletionAnimation} disabled={loading || switchesDisabled} />
      </Animated.View>

      <Animated.View style={{ marginTop: 30, justifyContent: "flex-end", flex: 1, marginBottom: 20, opacity: loadingOpacity }}>
        <TouchableOpacity
          onPress={() => {
            signOutOrDelete(true);
          }}
          disabled={loading}
        >
          <Text style={{ color: colors.light_primary, fontSize: 23, fontWeight: "bold" }}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            deleteAlert(
              "Account",
              () => {
                signOutOrDelete(false);
              },
              "Are you sure you want to delete this account? You will lose all data tied to the account and this action cannot be undone.",
            );
          }}
          disabled={loading}
        >
          <Text style={{ color: colors.warning, fontSize: 23, fontWeight: "bold", marginTop: 15 }}>Delete Account</Text>
        </TouchableOpacity>
      </Animated.View>
    </PageContainer>
  );
};

export default AccountScreen;
