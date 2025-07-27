import React from "react";
import { View, Text, Modal } from "react-native";
import CommonButton from "../../../shared/components/CommonButton";
import CommonTextInput from "../../../shared/components/CommonTextInput";
import { styles } from "../styles/styles";

const CategoryModal = ({
  visible,
  categoryName,
  onCategoryNameChange,
  onClose,
  onAddCategory,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Category</Text>

          <CommonTextInput
            label="Category Name"
            value={categoryName}
            onChangeText={onCategoryNameChange}
            style={styles.textInput}
          />

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
              onPress={onAddCategory}
              mode="contained"
            >
              Add Category
            </CommonButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CategoryModal;
