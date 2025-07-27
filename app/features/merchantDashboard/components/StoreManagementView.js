import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Icon } from "react-native-paper";
import { styles } from "../styles/styles";

const StoreManagementView = ({ stores, openModal, deleteStore }) => (
  <View style={styles.managementContainer}>
    <View style={styles.managementHeader}>
      <Text style={styles.managementHeaderTitle}>Store Management</Text>
      <TouchableOpacity
        onPress={() => openModal("add-store")}
        style={[styles.addButton, styles.addButtonBlue]}
      >
        <Icon source="plus" size={16} color="#ffffff" />
        <Text style={styles.addButtonText}>Add Store</Text>
      </TouchableOpacity>
    </View>

    <FlatList
      data={stores}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <View style={styles.listItemContent}>
            <View style={styles.listItemInfo}>
              <Text style={styles.listItemTitle}>{item.name}</Text>
              <Text style={styles.listItemSubtitle}>{item.address}</Text>
              <Text style={styles.listItemSubtitle}>
                Manager: {item.manager}
              </Text>
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
                onPress={() => openModal("edit-store", item)}
                style={[styles.actionButton, styles.actionButtonEdit]}
              >
                <Icon source="pencil" size={16} color="#2563eb" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteStore(item.id)}
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

export default StoreManagementView;
