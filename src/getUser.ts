import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getUser() {
  try {
    const userString = await AsyncStorage.getItem('user');
    if (userString !== null) {
      return JSON.parse(userString);
    } else {
      console.log("No user data found.");
      return null;
    }
  } catch (e) {
    console.error("Failed to get user from storage:", e);
    return null;
  }
}