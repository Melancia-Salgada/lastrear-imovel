import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../pages/Home"
import { AiFillHome } from "react-icons/ai";
import { BsPersonLinesFill } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";

const Tab = createBottomTabNavigator()

export default function Tabs() {
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
        tabBarLabelStyle: {
          fontSize: 8,  
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <AiFillHome size={40} color={color}/>
          ),
          tabBarLabel: () => null,
        }}
        
      />
      <Tab.Screen
        name="Clientes"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <BsPersonLinesFill size={40} color={color}/>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Corretores"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <FaUserGroup  size={28} color={color}/>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Ajustes"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <FaGear  size={40} color={color}/>
          ),tabBarLabel: () => null,
        }}
      />

    </Tab.Navigator>
  )
}