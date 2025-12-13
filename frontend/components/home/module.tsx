import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import colors from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { ModuleType } from "../../types/moduleType";

interface ModuleProps {
  module: ModuleType;
  style?: ViewStyle;
  onPress: () => void;
  color1?: string;
  color2?: string;
  size?: number;
  disabled?: boolean;
  blank?: boolean;
}

const Module = ({ module, style, onPress, color1 = colors.light_primary, color2 = colors.primary, size = 150, disabled = false, blank = false }: ModuleProps) => {
  const dayDisplayer = () => {
    let dayDisplay = "";

    if (blank) {
      return dayDisplay;
    }

    if (module.days.mon) {
      dayDisplay = dayDisplay + "Mon, ";
    }
    if (module.days.tues) {
      dayDisplay = dayDisplay + "Tue, ";
    }
    if (module.days.wed) {
      dayDisplay = dayDisplay + "Wed, ";
    }
    if (module.days.thur) {
      dayDisplay = dayDisplay + "Thu, ";
    }
    if (module.days.fri) {
      dayDisplay = dayDisplay + "Fri, ";
    }
    if (module.days.sat) {
      dayDisplay = dayDisplay + "Sat, ";
    }
    if (module.days.sun) {
      dayDisplay = dayDisplay + "Sun, ";
    }

    if (module.days.mon && module.days.tues && module.days.wed && module.days.thur && module.days.fri && !module.days.sat && !module.days.sun) {
      dayDisplay = "Weekdays, ";
    }

    if (!module.days.mon && !module.days.tues && !module.days.wed && !module.days.thur && !module.days.fri && module.days.sat && module.days.sun) {
      dayDisplay = "Weekends, ";
    }

    if (module.days.mon && module.days.tues && module.days.wed && module.days.thur && module.days.fri && module.days.sat && module.days.sun) {
      dayDisplay = "Everyday, ";
    }

    dayDisplay = dayDisplay.slice(0, -2);

    return dayDisplay;
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <LinearGradient
        colors={[color1, color2]}
        style={{
          width: size,
          height: size,
          borderRadius: 15,
          alignItems: "center",
          ...style,
        }}
      >
        {blank ? <View /> : <MaterialIcons name={module.icon} size={size / 2.7} color="white" style={{ paddingTop: "15%", paddingBottom: "2%" }} />}
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontFamily: "Main-Font",
            fontStyle: "italic",
            fontSize: module.name != undefined && module.name.length > 10 ? 11 : 17,
            width: "95%",
            textAlign: "center",
            textTransform: "uppercase",
            marginTop: "5%",
          }}
        >
          {blank ? "" : module.name}
        </Text>
        <View style={{ flexGrow: 1, justifyContent: "flex-end" }}>
          <Text style={{ marginBottom: "18%", color: colors.lightest_grey, textAlign: "center" }}>{dayDisplayer()}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Module;
