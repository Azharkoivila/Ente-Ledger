import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

export default function Spinner() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("@/assets/lottie/time-not-done.json")}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
