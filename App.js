import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { StudentProvider } from './src/context/StudentContext';

export default function App() {
  return (
    <StudentProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </StudentProvider>
  );
}