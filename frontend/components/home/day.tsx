import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text } from "react-native";
import colors from "../../constants/colors";

interface DayProps {
  label: string;
  size: number;
  baseColor: string;
  onPress: () => void;
  reset: boolean;
}

const Day = ({ label, size, baseColor, onPress, reset }: DayProps) => {
  const [active, setActive] = useState(false);

  const animVal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animVal, {
      toValue: active ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [active]);

  useEffect(() => {
    setActive(false);
  }, [reset]);

  const animatedBackgroundCol = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [baseColor, colors.primary],
  });

  const onLocalPress = () => {
    setActive(!active);
    onPress();
  };

  return (
    <Pressable onPress={onLocalPress}>
      <Animated.View style={{ width: size, height: size, borderRadius: size / 2, alignItems: "center", justifyContent: "center", backgroundColor: animatedBackgroundCol }}>
        <Text style={{ color: "white", textAlign: "center", fontSize: size / 2.2 }}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default Day;
