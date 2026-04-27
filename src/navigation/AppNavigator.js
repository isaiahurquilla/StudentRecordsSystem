import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentScreen from '../screens/StudentScreen';
import AnalyticScreen from '../screens/AnalyticScreen';
import AlertScreen from '../screens/AlertScreen';
import StudentFormScreen from '../screens/StudentFormScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StudentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StudentList"
        component={StudentScreen}
        options={{ title: 'Students' }}
      />
      <Stack.Screen
        name="StudentForm"
        component={StudentFormScreen}
        options={({ route }) => ({
          title: route?.params?.student ? 'Edit Student' : 'Add Student',
        })}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Students"
        component={StudentStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Alerts" component={AlertScreen} />
      <Tab.Screen name="Analytics" component={AnalyticScreen} />
      <Tab.Screen name="Tools" component={SettingsScreen} />
    </Tab.Navigator>
  );
}