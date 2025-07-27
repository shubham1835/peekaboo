// BottomTabs.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Icon } from "react-native-paper";
import { ROUTES } from "./routes";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          const current = ROUTES.find((r) => r.name === route.name);
          return (
            <Icon source={current?.icon || "home"} size={size} color={color} />
          );
        },
      })}
    >
      {ROUTES.map(({ name, component }) => (
        <Tab.Screen key={name} name={name} component={component} />
      ))}
    </Tab.Navigator>
  );
}
