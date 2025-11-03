import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Module from "../components/module";
import colors from "../constants/colors";
import ScrollViewContainer from "../components/scrollViewContainer";
import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }}>
      <StatusBar style="light" />
      <ScrollViewContainer
        content={
          <View style={{ padding: "5%" }}>
            <Text style={{ color: "white", fontSize: 40 }}>Hello</Text>
            <Module label="TEST" />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
