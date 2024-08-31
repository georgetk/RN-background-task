import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCustomAsyncStorage = (): [
  (asyncStorageKey: string) => Promise<string | null>,
  (value: string, asyncStorageKey: string) => Promise<void>,
] => {
  const getItem = async (asyncStorageKey: string): Promise<string | null> =>
    await AsyncStorage.getItem(asyncStorageKey);

  const setItem = async (
    value: string,
    asyncStorageKey: string,
  ): Promise<void> => await AsyncStorage.setItem(asyncStorageKey, value);

  return [getItem, setItem];
};
