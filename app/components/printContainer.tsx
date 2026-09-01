import { Button, ButtonText } from "@/components/ui/button";
import { PrintContainerProps } from "@/src/types";
import { useState } from "react";
import { View } from "react-native";
import generatePrint from "../../src/utils/print/printer";

function PrintContainer({
  transactions,
  summery,
  accountName,
  accountId,
}: PrintContainerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePrint = async () => {
    try {
      setIsLoading(true);
      await generatePrint(transactions, summery, accountName, accountId);
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
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Button
        size="lg"
        onPress={handlePrint}
        className="bg-[#0F766E]"
        isDisabled={isLoading}
      >
        <ButtonText>{isLoading ? "Printing" : "Generate PDF"}</ButtonText>
      </Button>
    </View>
  );
}

export default PrintContainer;
