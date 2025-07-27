import React, { useState } from "react";
import {
  Modal,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Portal } from "react-native-paper";
import CommonButton from "./CommonButton";
import CommonTextInput from "./CommonTextInput";

const BottomSheet = ({
  selectedOptions,
  onChange,
  openModal,
  onClose,
  options,
  maxSelect = 1,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = options.filter((c) =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSelected = (item) => selectedOptions.includes(item);

  const toggleSelect = (item) => {
    if (isSelected(item)) {
      onChange(selectedOptions.filter((c) => c !== item));
    } else if (maxSelect === 1) {
      onChange(item);
    } else if (selectedOptions.length < maxSelect) {
      onChange([...selectedOptions, item]);
    }
  };

  const closeModal = () => {
    onClose();
    setSearchTerm("");
  };

  return (
    <>
      <Portal>
        <Modal
          visible={openModal}
          transparent
          animationType="slide"
          onRequestClose={closeModal}
        >
          <Pressable style={styles.modalOverlay} onPress={closeModal}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              style={styles.bottomSheet}
            >
              <CommonTextInput
                placeholder="Search categories..."
                value={searchTerm}
                onChangeText={setSearchTerm}
              />

              <FlatList
                data={filtered}
                keyExtractor={(item) => item}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => toggleSelect(item)}
                    style={[
                      styles.optionItem,
                      isSelected(item) && styles.optionItemSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected(item) && styles.optionTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />

              <CommonButton onPress={closeModal}>Done</CommonButton>
            </KeyboardAvoidingView>
          </Pressable>
        </Modal>
      </Portal>
    </>
  );
};

const COLORS = {
  background: "#fff",
  overlay: "rgba(0,0,0,0.3)",
  border: "#ccc",
  inputBackground: "#fafafa",
  selectedBg: "#6200ee",
  unselectedBg: "#f2f2f2",
  selectedText: "#fff",
  unselectedText: "#000",
};

const styles = StyleSheet.create({
  selectorContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    padding: 12,
    backgroundColor: COLORS.inputBackground,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "flex-end",
  },
  bottomSheet: {
    width: "100%",
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: Dimensions.get("window").height * 0.6,
    padding: 16,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: COLORS.unselectedBg,
    borderRadius: 6,
    marginBottom: 6,
  },
  optionItemSelected: {
    backgroundColor: COLORS.selectedBg,
  },
  optionText: {
    color: COLORS.unselectedText,
  },
  optionTextSelected: {
    color: COLORS.selectedText,
    fontWeight: "bold",
  },
});

export default BottomSheet;
