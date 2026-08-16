import * as SecureStore from "expo-secure-store";

class StorageService {
  static BIOMETRIC_KEY = "APP_BIOMETRIC";

  async setBiometric(status: boolean) {
    try {
      await SecureStore.setItemAsync(
        StorageService.BIOMETRIC_KEY,
        String(status),
      );
    } catch (error) {
      console.log(error, "biometric");
    }
  }

  async getBiometric(): Promise<boolean> {
    try {
      const stored = await SecureStore.getItemAsync(
        StorageService.BIOMETRIC_KEY,
      );
      return stored === "true";
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new StorageService();
