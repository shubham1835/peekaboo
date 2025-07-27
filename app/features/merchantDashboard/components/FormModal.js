import React from "react";
import { View, Text, Modal, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles/styles";
import CommonTextInput from "../../../shared/components/CommonTextInput";
import Dropdown from "../../../shared/components/Dropdown";

const FormModal = ({
  modalVisible,
  modalType,
  editingItem,
  userForm,
  setUserForm,
  closeModal,
  onUserSubmit,
}) => {
  const handleUserSubmit = () => {
    if (!userForm.name || !userForm.email || !userForm.phone) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    onUserSubmit();
  };
  const handleSelection = (item) => {
    console.log("Selected:", item);
  };
  const countriesData = [
    { label: "United States", value: "us" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "ca" },
    { label: "Australia", value: "au" },
    { label: "Germany", value: "de" },
    { label: "France", value: "fr" },
    { label: "Japan", value: "jp" },
    { label: "India", value: "in" },
  ];
  return (
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {editingItem ? "Edit" : "Add"}{" "}
            {modalType.includes("store") ? "Store" : "User"}
          </Text>
          <View>
            <View style={styles.formGroup}>
              <CommonTextInput
                value={userForm.name}
                onChangeText={(text) =>
                  setUserForm((prev) => ({ ...prev, name: text }))
                }
                label="Name"
                placeholder="Enter full name"
              />
            </View>

            <View style={styles.formGroup}>
              <CommonTextInput
                value={userForm.email}
                onChangeText={(text) =>
                  setUserForm((prev) => ({ ...prev, email: text }))
                }
                label="Email"
                placeholder="Enter email address"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.formGroup}>
              <CommonTextInput
                value={userForm.phone}
                onChangeText={(text) =>
                  setUserForm((prev) => ({ ...prev, phone: text }))
                }
                label="Phone"
                placeholder="Enter 10 digit phone no."
                keyboardType="numeric"
              />
            </View>
            <View style={styles.formGroup}>
              <Dropdown
                data={countriesData}
                placeholder="Select a fruit"
                onSelect={handleSelection}
                searchable={true}
                maxHeight={250}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Role</Text>
              <View style={styles.selectionRow}>
                {["Admin", "Store Manager", "Store Staff", "kitchen Staff"].map(
                  (role) => (
                    <TouchableOpacity
                      key={role}
                      onPress={() => setUserForm((prev) => ({ ...prev, role }))}
                      style={[
                        styles.selectionButton,
                        userForm.role === role
                          ? styles.selectionButtonActiveGreen
                          : styles.selectionButtonInactive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.selectionButtonText,
                          userForm.role === role
                            ? styles.selectionButtonTextActiveGreen
                            : styles.selectionButtonTextInactive,
                        ]}
                      >
                        {role}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Status</Text>
              <View style={styles.selectionRow}>
                {["Active", "Inactive"].map((status) => (
                  <TouchableOpacity
                    key={status}
                    onPress={() => setUserForm((prev) => ({ ...prev, status }))}
                    style={[
                      styles.selectionButton,
                      userForm.status === status
                        ? styles.selectionButtonActiveGreen
                        : styles.selectionButtonInactive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.selectionButtonText,
                        userForm.status === status
                          ? styles.selectionButtonTextActiveGreen
                          : styles.selectionButtonTextInactive,
                      ]}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              onPress={closeModal}
              style={[styles.modalButton, styles.modalButtonCancel]}
            >
              <Text style={styles.modalButtonTextCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUserSubmit}
              style={[styles.modalButton, styles.modalButtonSubmit]}
            >
              <Text style={styles.modalButtonTextSubmit}>
                {editingItem ? "Update" : "Create"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FormModal;
