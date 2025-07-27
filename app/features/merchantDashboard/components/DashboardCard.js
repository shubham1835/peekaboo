import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-paper";
import { styles } from "../styles/styles";

const DashboardCard = ({ title, value, icon, color }) => (
  <View style={[styles.dashboardCard, color]}>
    <View style={styles.dashboardCardContent}>
      <View style={styles.dachboardCard}>
        <Text style={styles.dashboardCardTitle}>{title}</Text>
        <Icon source={icon} size={16} />
      </View>
      <View>
        <Text style={styles.dashboardCardValue}>{value}</Text>
      </View>
    </View>
  </View>
);

export default DashboardCard;
