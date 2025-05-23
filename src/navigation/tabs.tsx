import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../pages/Home"

const Tab = createBottomTabNavigator()

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#A0A0A0',
        headerShown: false,
        tabBarStyle: {
          height: 90,  
        },
        tabBarLabelStyle: {
          fontSize: 8,  
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        
      />
      <Tab.Screen
        name="Clientes"
        component={Home}
      />
      <Tab.Screen
        name="Corretores"
        component={Home}
      />
      <Tab.Screen
        name="Ajustes"
        component={Home}
      />

    </Tab.Navigator>
  )
}