import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { Animated } from "react-native";
export default function WithAnimation(Component) {
  return function HOC(props) {
    const translateX = useRef(new Animated.Value(30)).current;
    useFocusEffect(
      useCallback(() => {
        translateX.setValue(30);

        Animated.parallel([
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
          transform: [{ translateX }],
        }}
      >
        <Component {...props} />
      </Animated.View>
    );
  };
}
