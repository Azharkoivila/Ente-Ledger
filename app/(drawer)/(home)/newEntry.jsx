import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { Animated } from "react-native";

import Add from '../../components/add';

export default function AddNewEntry() {
  const navigation = useNavigation();

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();

      parent?.setOptions({
        title: "New Entry",
      });

      opacity.setValue(0);
      translateY.setValue(30);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();

      return () => {
        parent?.setOptions({
          title: "Home",
        });
      };
    }, [])
  );

  return (
    <Animated.View
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: [{ translateY }],
      }}
    >
      <Add/>
    </Animated.View>
  );
}