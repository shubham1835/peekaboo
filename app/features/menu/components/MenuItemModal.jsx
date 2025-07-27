import React from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import CommonButton from "../../../shared/components/CommonButton";
import CommonTextInput from "../../../shared/components/CommonTextInput";
import { styles } from "../styles/styles";

const MenuItemModal = ({
  visible,
  selectedCategory,
  editingItem,
  menuItem,
  onClose,
  onSave,
  onPickImage,
  onUpdateDishName,
  onUpdatePreparationTime,
  onUpdatePrice,
  onUpdateIsVeg,
  onUpdateIsAvailable,
  onUpdateIsPrepaid,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <ScrollView style={styles.modalScrollView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingItem ? "Edit Item" : "Add Item to"}{" "}
              {selectedCategory?.name}
            </Text>

            <CommonTextInput
              label="Dish Name"
              value={menuItem.dishName}
              onChangeText={onUpdateDishName}
              style={styles.textInput}
            />

            <TouchableOpacity style={styles.imageUpload} onPress={onPickImage}>
              {menuItem.image ? (
                <Image
                  source={{ uri: menuItem.image.uri }}
                  style={styles.uploadedImage}
                />
              ) : (
                <Text style={styles.imageUploadText}>📷 Upload Image</Text>
              )}
            </TouchableOpacity>

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Food Type:</Text>
              <View style={styles.vegNonVegContainer}>
                <TouchableOpacity
                  style={[
                    styles.vegButton,
                    menuItem.isVeg && styles.vegButtonActive,
                  ]}
                  onPress={() => onUpdateIsVeg(true)}
                >
                  <Text
                    style={[
                      styles.vegButtonText,
                      menuItem.isVeg && styles.vegButtonTextActive,
                    ]}
                  >
                    🌱 Veg
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.nonVegButton,
                    !menuItem.isVeg && styles.nonVegButtonActive,
                  ]}
                  onPress={() => onUpdateIsVeg(false)}
                >
                  <Text
                    style={[
                      styles.nonVegButtonText,
                      !menuItem.isVeg && styles.nonVegButtonTextActive,
                    ]}
                  >
                    🍖 Non-Veg
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <CommonTextInput
              label="Preparation Time (minutes)"
              value={menuItem.preparationTime}
              onChangeText={onUpdatePreparationTime}
              keyboardType="numeric"
              style={styles.textInput}
            />

            <CommonTextInput
              label="Price (₹)"
              value={menuItem.price}
              onChangeText={onUpdatePrice}
              keyboardType="numeric"
              style={styles.textInput}
            />

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Available</Text>
              <Switch
                value={menuItem.isAvailable}
                onValueChange={onUpdateIsAvailable}
                trackColor={{ false: "#ccc", true: "#4CAF50" }}
                thumbColor={menuItem.isAvailable ? "#fff" : "#f4f3f4"}
              />
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Payment Type:</Text>
              <View style={styles.paymentContainer}>
                <TouchableOpacity
                  style={[
                    styles.paymentButton,
                    menuItem.isPrepaid && styles.paymentButtonActive,
                  ]}
                  onPress={() => onUpdateIsPrepaid(true)}
                >
                  <Text
                    style={[
                      styles.paymentButtonText,
                      menuItem.isPrepaid && styles.paymentButtonTextActive,
                    ]}
                  >
                    Prepaid
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.paymentButton,
                    !menuItem.isPrepaid && styles.paymentButtonActive,
                  ]}
                  onPress={() => onUpdateIsPrepaid(false)}
                >
                  <Text
                    style={[
                      styles.paymentButtonText,
                      !menuItem.isPrepaid && styles.paymentButtonTextActive,
                    ]}
                  >
                    Postpaid
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalButtons}>
              <CommonButton
                style={styles.cancelButton}
                onPress={onClose}
                mode="outlined"
              >
                Cancel
              </CommonButton>

              <CommonButton
                style={styles.primaryButton}
                onPress={onSave}
                mode="contained"
              >
                {editingItem ? "Update Item" : "Add Item"}
              </CommonButton>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default MenuItemModal;
