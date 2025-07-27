import React, { useState } from "react";
import CommonButton from "../../../shared/components/CommonButton";
import { View, Text } from "react-native";
import CommonTextInput from "../../../shared/components/CommonTextInput";
import { Icon, TextInput } from "react-native-paper";
import { styles } from "../styles/styles";

const DashboardManagementCard = ({
  setCurrentView,
  searchQuery,
  setSearchQuery,
  cardTitle,
  cardSubTitle,
  buttonText,
  icon,
  currentView,
}) => {
  return (
    <View style={styles.quickActionsContainer}>
      <View style={styles.managamentCard}>
        <Icon source={icon} size={18} color="#000000" />
        <Text style={styles.quickActionsTitle}>{cardTitle}</Text>
      </View>
      <View>
        <Text style={styles.quickActionSubtitle}>{cardSubTitle}</Text>
        <View style={styles.quickActionButton}>
          <CommonTextInput
            placeholder="Search stores..."
            mode="outlined"
            left={<TextInput.Icon icon="magnify" />}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              borderRadius: 10,
              paddingHorizontal: 10,
              height: 36,
            }}
          />
          <View style={styles.storeList}>
            <View style={styles.dachboardCard}>
              <Text style={styles.quickActionTitle}>
                Go to Store Management
              </Text>
              <CommonButton
                mode="contained"
                contentStyle={{
                  height: 32,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                labelStyle={{
                  fontSize: 12,
                  lineHeight: 14,
                  textAlignVertical: "center",
                }}
              >
                Active
              </CommonButton>
            </View>
            <Text style={styles.quickActionTitle}>Location</Text>
          </View>
          <View style={styles.storeList}>
            <View style={styles.dachboardCard}>
              <Text style={styles.quickActionTitle}>
                Go to Store Management
              </Text>
              <CommonButton
                mode="contained"
                contentStyle={{
                  height: 32,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                labelStyle={{
                  fontSize: 12,
                  lineHeight: 14,
                  textAlignVertical: "center",
                }}
              >
                Active
              </CommonButton>
            </View>
            <Text style={styles.quickActionTitle}>Location</Text>
          </View>
        </View>

        <View style={[styles.quickActionButton, { marginTop: 10 }]}>
          <CommonButton
            onPress={() => setCurrentView(currentView)}
            style={styles.quickActionTitle}
          >
            {buttonText}
          </CommonButton>
        </View>
      </View>
    </View>
  );
};

export default DashboardManagementCard;
