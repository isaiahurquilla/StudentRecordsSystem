import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'students';

export async function saveStudents(students) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.log('Error saving students:', error);
  }
}

export async function loadStudents() {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Error loading students:', error);
    return [];
  }
}

export async function clearStudentsStorage() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.log('Error clearing students:', error);
  }
}