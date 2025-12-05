import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Module from "../components/home/module";
import colors from "../constants/colors";
import ScrollViewContainer from "../components/shared/scrollViewContainer";
import { StatusBar } from "expo-status-bar";
import Edit from "../components/home/edit";
import { useContext } from "react";
import GlobalContext from "../store/globalContext";
import AddModal from "../components/home/addModal";

const HomeScreen = () => {
  const { globalData } = useContext(GlobalContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }}>
      <StatusBar style="light" />
      <ScrollViewContainer
        content={
          <View style={{ padding: "5%" }}>
            <AddModal />

            <Edit />

            <Text style={{ color: "white", fontSize: 40, fontFamily: "Main-Font", fontStyle: "italic" }}>Incomplete</Text>
            <View style={{ marginTop: 15 }}>
              <Module label={globalData.homeEditing ? "Editing" : "Not Editing"} />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
