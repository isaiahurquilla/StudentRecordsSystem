import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StudentScreen from '../screens/StudentScreen';
import AnalyticScreen from '../screens/AnalyticScreen';
import AlertScreen from '../screens/AlertScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Students" component={StudentScreen} />
      <Tab.Screen name="Alerts" component={AlertScreen} />
      <Tab.Screen name="Analytics" component={AnalyticScreen} />
    </Tab.Navigator>
  );
}