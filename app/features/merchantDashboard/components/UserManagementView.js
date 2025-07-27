import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Icon, TextInput } from "react-native-paper";
import { styles } from "../styles/styles";
import CommonTextInput from "../../../shared/components/CommonTextInput";

const UserManagementView = ({ users, openModal, deleteUser }) => (
  <View style={styles.managementContainer}>
    <View style={styles.managementHeader}>
      {/* <Text style={styles.managementHeaderTitle}>User & Role Management</Text> */}
      <CommonTextInput
        placeholder="Search stores..."
        mode="outlined"
        left={<TextInput.Icon icon="magnify" />}
        // value={searchQuery}
        // onChangeText={setSearchQuery}
        style={{
          borderRadius: 10,
          paddingHorizontal: 10,
          height: 36,
          width: "65%",
        }}
      />
      <TouchableOpacity
        onPress={() => openModal("add-user")}
        style={[styles.addButton, styles.addButtonGreen]}
      >
        <Icon source="plus" size={16} color="#ffffff" />
        <Text style={styles.addButtonText}>Add User</Text>
      </TouchableOpacity>
    </View>

    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <View style={styles.listItemContent}>
            <View style={styles.listItemInfo}>
              <Text style={styles.listItemTitle}>{item.name}</Text>
              <Text style={styles.listItemSubtitle}>{item.email}</Text>
              <Text style={styles.listItemSubtitle}>Role: {item.role}</Text>
              <View
                style={[
                  styles.statusBadge,
                  item.status === "Active"
                    ? styles.statusBadgeActive
                    : styles.statusBadgeInactive,
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    item.status === "Active"
                      ? styles.statusBadgeTextActive
                      : styles.statusBadgeTextInactive,
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>

            <View style={styles.listItemActions}>
              <TouchableOpacity
                onPress={() => openModal("edit-user", item)}
                style={[styles.actionButton, styles.actionButtonEdit]}
              >
                <Icon source="pencil" size={16} color="#2563eb" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteUser(item.id)}
                style={[styles.actionButton, styles.actionButtonDelete]}
              >
                <Icon source="delete" size={16} color="#dc2626" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  </View>
);

export default UserManagementView;
