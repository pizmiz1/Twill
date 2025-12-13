import { ScrollView, Dimensions, ViewStyle, NativeSyntheticEvent, NativeScrollEvent } from "react-native";

interface ScrollViewContainerProps {
  style?: ViewStyle;
  scrollDisabled?: boolean;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  horizontal?: boolean;
  content: any;
}

const ScrollViewContainer = ({ style, scrollDisabled, onScroll, horizontal, content }: ScrollViewContainerProps) => {
  return (
    <ScrollView
      style={{
        ...style,
      }}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={!scrollDisabled}
      scrollEventThrottle={16}
      onScroll={onScroll}
      horizontal={horizontal}
      decelerationRate={horizontal ? "fast" : undefined}
      snapToInterval={horizontal ? Dimensions.get("screen").width : undefined}
      snapToAlignment={horizontal ? "center" : undefined}
    >
      {content}
    </ScrollView>
  );
};

export default ScrollViewContainer;
