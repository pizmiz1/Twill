import { Text, TouchableOpacity } from "react-native";
import colors from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";

const Module = ({ style, label, onPress, color = colors.primary, size = 150 }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[colors.light_primary, colors.primary]}
        style={{
          ...style,
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", color: "white", fontFamily: "Main-Font", fontStyle: "italic", fontSize: 18 }}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Module;
