import { Button, ButtonText } from "@/components/ui/button";
import { useState } from "react";
import { View } from "react-native";
import genarateHtml from "../../src/utils/print/printer";

function PrintContainer({ transactions, summery }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePrint = async () => {
    try {
      setIsLoading(true);
      await genarateHtml(transactions, summery);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        justify: "center",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Button size="lg" onPress={handlePrint} isDisabled={isLoading}>
        <ButtonText>{isLoading ? "Printing" : "Generate PDF"}</ButtonText>
      </Button>
    </View>
  );
}

export default PrintContainer;
