import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ajustes from './Tabs/Ajustes';
import Clientes from './Tabs/Clientes';
import Corretores from './Tabs/Corretores';
import AdminHome from './Tabs/Home/AdminHome';

const Tab = createBottomTabNavigator()

export default function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0D559F',
        tabBarInactiveTintColor: '#A0A0A0',
        headerShown: false,
        tabBarStyle: {
          height: 92,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
        },
        tabBarIconStyle: {
          paddingBottom: 0, 
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={AdminHome}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={32} color={color}/>
          ),
          tabBarLabel: () => null,
        }}
        
      />
      <Tab.Screen
        name="Clientes"
        component={Clientes}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name='address-card' size={28} color={color}/>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Corretores"
        component={Corretores}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user-group" size={24} color={color} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Ajustes"
        component={Ajustes}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="gear" size={26} color={color} />
          ),tabBarLabel: () => null,
        }}
      />

    </Tab.Navigator>
  )
}