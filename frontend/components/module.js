import { Text, TouchableOpacity } from "react-native";
import colors from "../constants/colors";

const Module = ({ style, label, onPress, color = colors.primary, size = 150 }) => {
  return (
    <TouchableOpacity
      style={{
        ...style,
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <Text style={{ fontWeight: "bold", color: "white" }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Module;
