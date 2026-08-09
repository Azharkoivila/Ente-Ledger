import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { AddIcon } from "@/components/ui/icon";
import { Text, View } from "react-native";
import { hamdlermdb, handledb } from "./db";

export default function DevPanel() {
  return (
    <View className="mx-6 mb-6 p-4 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5]">
      <Text className="text-[12px] font-semibold text-[#991B1B] mb-2">
        DEV ONLY — not visible in production builds
      </Text>
      <Button size="sm" className="rounded-full mb-2" onPress={handledb}>
        <ButtonText>Seed test DB</ButtonText>
        <ButtonIcon as={AddIcon} className="ml-2" />
      </Button>
      <Button size="sm" className="rounded-full" onPress={hamdlermdb}>
        <ButtonText>Wipe DB</ButtonText>
        <ButtonIcon as={AddIcon} className="ml-2" />
      </Button>
    </View>
  );
}
