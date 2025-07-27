import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";

const Navigation = ({ currentView, setCurrentView }) => (
  <View style={styles.navigation}>
    <Text style={styles.navigationTitle}>Merchant Dashboard</Text>
    <View style={styles.navigationTabs}>
      {[
        { key: "dashboard", label: "Dashboard" },
        { key: "stores", label: "Stores" },
        { key: "users", label: "Users & Roles" },
      ].map((item) => (
        <TouchableOpacity
          key={item.key}
          onPress={() => setCurrentView(item.key)}
          style={[
            styles.navigationTab,
            currentView === item.key
              ? styles.navigationTabActive
              : styles.navigationTabInactive,
          ]}
        >
          <Text style={styles.navigationTabText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export default Navigation;
