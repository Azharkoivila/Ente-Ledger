import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { Animated } from "react-native";
export default function WithAnimation(Component) {
  return function HOC(props) {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(30)).current;
    useFocusEffect(
      useCallback(() => {
        opacity.setValue(0);
        translateX.setValue(30);

        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }),
        ]).start();
      }),
    );
    return (
      <Animated.View
        style={{
          flex: 1,
          opacity,
          transform: [{ translateX }],
        }}
      >
        <Component {...props} />
      </Animated.View>
    );
  };
}
