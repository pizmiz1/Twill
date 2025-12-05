import { TextInput, Animated } from "react-native";
import colors from "../../constants/colors";
import { useEffect, useRef, useState } from "react";

const Input = ({ label, baseColor, onChangeText, style, reset }) => {
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

  const onChangeTextLocal = (newText) => {
    if (newText.length > 0 && animatedValue.__getValue() === 0) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
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
    <Animated.View style={{ borderWidth: 1, borderColor: borderColor, borderRadius: 7, ...style }}>
      <TextInput
        value={text}
        onChangeText={onChangeTextLocal}
        style={{ padding: 10, borderRadius: 7, color: "white", backgroundColor: colors.dark_grey }}
        placeholder={label}
        placeholderTextColor="#aaa"
      />
    </Animated.View>
  );
};

export default Input;
