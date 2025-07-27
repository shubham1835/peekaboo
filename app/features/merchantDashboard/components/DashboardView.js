import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";
import DashboardCard from "./DashboardCard";
import DashboardManagementCard from "./DashboardManagementCard";

const DashboardView = ({
  dashboardData,
  setCurrentView,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <ScrollView style={styles.dashboardContainer}>
      <Text style={styles.dashboardTitle}>Overview</Text>

      <View style={styles.dashboardCardsRow}>
        <DashboardCard
          title="Total Users"
          value={dashboardData.totalUsers}
          icon="account-group"
          color={styles.dashboardCardGreen}
        />
        <DashboardCard
          title="Active Orders"
          value={dashboardData.activeOrders}
          icon="cart"
          color={styles.dashboardCardOrange}
        />
      </View>
      <DashboardManagementCard
        setCurrentView={setCurrentView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cardTitle="Store Management"
        cardSubTitle="Add, edit, or manage your store"
        buttonText="+ Manage Stores"
        icon="cog"
        currentView="stores"
      />
      <View style={styles.quickActionButton}>
        <DashboardManagementCard
          setCurrentView={setCurrentView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cardTitle="User Management"
          cardSubTitle="Add, edit, or manage your users"
          buttonText="+ Manage Users"
          icon="cog"
          currentView="users"
        />
      </View>
    </ScrollView>
  );
};

export default DashboardView;
