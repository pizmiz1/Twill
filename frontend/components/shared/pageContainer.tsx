import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Animated, Keyboard, KeyboardAvoidingView, ScrollView, ViewStyle } from "react-native";
import colors from "../../constants/colors";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { opacityLayoutEaseOut } from "../../helpers/layouts";
import { MaterialIconButton } from "./IconButton";
import { useNavigation } from "@react-navigation/native";

interface PageContainerProps {
  children: React.ReactNode;
  header: string;
  setBlurActive: (active: boolean) => void;
  backButton?: boolean;
  backButtonRoute?: string;
  backButtonDisabled?: boolean;
  backButtonStyle?: ViewStyle;
  disableScroll?: boolean;
  screenOverlay?: React.ReactNode;
  scrollViewRef?: React.Ref<ScrollView>;
  keyboardPadding?: number;
  setCurrentY?: (y: number) => void;
  userButton?: boolean;
  userButtonFunction?: () => void;
}

const PageContainer = ({
  children,
  header,
  setBlurActive,
  backButton,
  backButtonRoute,
  backButtonDisabled,
  backButtonStyle,
  disableScroll,
  screenOverlay,
  scrollViewRef,
  keyboardPadding,
  setCurrentY,
  userButton,
  userButtonFunction,
}: PageContainerProps) => {
  const [blurActive, setBlurActiveLocal] = useState(false);
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();

  const HEADER_HEIGHT = 65 + insets.top;

  const inactiveLocations: readonly [number, number, ...number[]] = [0, 0.05, 0.1, 1];
  const activeLocations: readonly [number, number, ...number[]] = [0, 0.5, 0.7, 0.9];

  const handleScrollBlur = (event: NativeSyntheticEvent<NativeScrollEvent>, blurActive: boolean, setBlurActiveLocal: (active: boolean) => void) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY >= 66 && !blurActive) {
      opacityLayoutEaseOut();
      setBlurActiveLocal(true);
      setBlurActive(true);
    } else if (offsetY < 66 && blurActive) {
      opacityLayoutEaseOut();
      setBlurActiveLocal(false);
      setBlurActive(false);
    }
  };

  const headerButtonPress = () => {
    if (backButton) {
      navigation.navigate(backButtonRoute as never);
    } else {
      if (userButtonFunction) {
        userButtonFunction();
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 100, height: HEADER_HEIGHT, pointerEvents: "none" }}>
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <LinearGradient
              colors={["black", "black", "rgba(0,0,0,0.5)", "transparent"]}
              locations={blurActive ? activeLocations : inactiveLocations}
              style={StyleSheet.absoluteFill}
            />
          }
        >
          <BlurView intensity={90} tint={"dark"} style={StyleSheet.absoluteFill} />
        </MaskedView>

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "700", fontFamily: "Main-Font", color: "white", opacity: blurActive ? 1 : 0 }}>{header}</Text>
        </View>
      </View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={(e) => {
          handleScrollBlur(e, blurActive, setBlurActiveLocal);
          if (setCurrentY) {
            setCurrentY(e.nativeEvent.contentOffset.y);
          }
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        removeClippedSubviews={false}
        scrollEnabled={!disableScroll}
        keyboardShouldPersistTaps="handled"
        ref={scrollViewRef}
      >
        {backButton || userButton ? (
          <Animated.View style={{ height: 40 }}>
            <MaterialIconButton
              name={backButton ? "arrow-back" : "person"}
              size={34}
              color={colors.light_primary}
              style={{ paddingHorizontal: "5%", marginTop: "3%", ...backButtonStyle }}
              disabled={backButtonDisabled}
              onPress={headerButtonPress}
            />
          </Animated.View>
        ) : (
          <View style={{ height: 40 }} />
        )}
        <View style={{ padding: "5%" }}>
          {children}
          <View style={{ padding: keyboardPadding ?? 0 }} />
        </View>
      </ScrollView>

      {screenOverlay}
    </SafeAreaView>
  );
};

export default PageContainer;
