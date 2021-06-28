import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from '../config/constants';

export const storeData = async data => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.log('error', e);
  }
};

export const getData = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log('error', e);
  }
};

export const clear = () => {
  try {
    AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.log('erro', e);
  }
};
