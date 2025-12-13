import { TextInput, Animated, Text, View, ViewStyle } from "react-native";
import colors from "../../constants/colors";
import { useEffect, useRef, useState } from "react";

interface InputProps {
  label: string;
  baseColor: string;
  onChangeText: (val: string) => void;
  style?: ViewStyle;
  reset: boolean;
  limit: number;
}

const Input = ({ label, baseColor, onChangeText, style, reset, limit }: InputProps) => {
  const [text, setText] = useState("");

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setText("");
  }, [reset]);

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [baseColor, "white"],
  });

  const onChangeTextLocal = (newText: string) => {
    // @ts-ignore
    if (newText.length > 0 && animatedValue.__getValue() === 0) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      // @ts-ignore
    } else if (newText.length === 0 && animatedValue.__getValue() === 1) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }

    setText(newText);
    onChangeText(newText);
  };

  return (
    <View style={{ ...style }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: "2%", justifyContent: "space-between" }}>
        <Text style={{ color: "white", fontFamily: "Main-Font", fontWeight: "500", fontSize: 20 }}>{label}</Text>
        <Text style={{ color: text.length > 0 ? "white" : colors.light_grey }}>
          {text.length}/{limit}
        </Text>
      </View>
      <Animated.View style={{ borderWidth: 1, borderColor: borderColor, borderRadius: 7, ...style }}>
        <TextInput
          value={text}
          onChangeText={onChangeTextLocal}
          style={{ padding: 10, borderRadius: 7, color: "white", backgroundColor: colors.dark_grey }}
          placeholder={label}
          placeholderTextColor="#aaa"
          maxLength={limit}
          autoCapitalize="characters"
        />
      </Animated.View>
    </View>
  );
};

export default Input;
