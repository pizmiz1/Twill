import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from "react-native";
import colors from "../../constants/colors";
import { MaterialIconButton } from "../shared/IconButton";
import * as SecureStore from "expo-secure-store";
import storageKeys from "../../constants/storageKeys";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { JsonDto } from "../../../shared/jsondto";
import { AccessDto } from "../../../shared/accessdto";
import { post } from "../../helpers/fetch";
import { useGlobalContext } from "../../store/globalContext";
import { deleteAlert, errorAlert } from "../../helpers/alert";
import routeNames from "../../constants/routeNames";

interface UserModalProps {
  visible: boolean;
  setVisible: (newVisible: boolean) => void;
}

const UserModal = ({ visible, setVisible }: UserModalProps) => {
  const { accessToken, updateAccessToken, updateModules } = useGlobalContext();
  const [dispEmail, setDispEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const getUserEmail = async () => {
      const email = await SecureStore.getItemAsync(storageKeys.email);
      setDispEmail(email!);
    };

    getUserEmail();
  }, []);

  const closeModal = () => {
    setVisible(false);
    setProcessing(false);
  };

  const signOutOrDelete = async (signOut: boolean) => {
    setProcessing(true);

    const passkey = await SecureStore.getItemAsync(storageKeys.passkey);

    const req: AccessDto = {
      email: dispEmail,
      passkey: passkey!,
    };

    const url = signOut ? "/auth/signOut" : "/auth/deleteAccount";
    const response: JsonDto<any> = await post(url, req, { accessToken: accessToken, updateAccessToken: updateAccessToken });

    if (response.error) {
      errorAlert(response.error);
      setProcessing(false);
      return;
    }

    await SecureStore.deleteItemAsync(storageKeys.email);
    await SecureStore.deleteItemAsync(storageKeys.passkey);
    await SecureStore.deleteItemAsync(storageKeys.token);
    updateAccessToken("");
    updateModules([]);

    navigation.navigate(routeNames.signup);

    closeModal();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            height: 200,
            width: 250,
            backgroundColor: colors.dark_grey,
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}
        >
          <MaterialIconButton
            name="close"
            color={colors.light_grey}
            size={24}
            onPress={() => {
              closeModal();
            }}
            disabled={processing}
            style={{ paddingVertical: 2, paddingHorizontal: "1%", alignSelf: "flex-end", opacity: processing ? 0.4 : 1 }}
          />

          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }} numberOfLines={1}>
              {dispEmail}
            </Text>
            {processing ? (
              <ActivityIndicator size="small" color={colors.lightest_grey} style={{ marginTop: 30 }} />
            ) : (
              <View style={{ marginTop: 30, alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    signOutOrDelete(true);
                  }}
                >
                  <Text style={{ color: colors.light_primary, fontSize: 18, fontWeight: "bold" }}>Sign Out</Text>
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
                >
                  <Text style={{ color: colors.warning, fontSize: 18, fontWeight: "bold", marginTop: 15 }}>Delete Account</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UserModal;
