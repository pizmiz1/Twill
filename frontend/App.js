import { Image, View } from "react-native";
import colors from "./constants/colors";

const App = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }}>
      <Image style={{ width: "0%", height: "35%", aspectRatio: 1 }} source={require("./assets/logo-clear.png")}></Image>
    </View>
  );
};

export default App;
