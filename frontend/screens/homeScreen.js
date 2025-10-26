import { Text, View } from "react-native";
import Module from "../components/module";
import colors from "../constants/colors";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.secondary }}>
      <Module label="TEST" />
    </View>
  );
};

export default HomeScreen;
