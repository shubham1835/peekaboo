import React from "react";
import { View, Text, ScrollView } from "react-native";
import CommonButton from "../../../shared/components/CommonButton";
import CategoryModal from "../components/CategoryModal";
import MenuItemModal from "../components/MenuItemModal";
import CategoryCard from "../components/CategoryCard";
import { useMenuManagement } from "../hooks/useMenuManagement";
import { styles } from "../styles/styles";
import HeaderWithBackButton from "../../../shared/components/HeaderWithBackButton";
const AddMenuScreen = () => {
  const {
    // State
    categories,
    showCategoryModal,
    showMenuItemModal,
    selectedCategory,
    editingItem,
    categoryName,
    menuItem,

    // State setters
    setCategoryName,

    // Actions
    addCategory,
    addOrUpdateMenuItem,
    editMenuItem,
    deleteMenuItem,
    pickImage,

    // Modal handlers
    handleCategoryModalClose,
    handleMenuItemModalClose,
    handleCategoryModalOpen,
    handleMenuItemModalOpen,

    // Field updaters
    updateDishName,
    updatePreparationTime,
    updatePrice,
    updateIsVeg,
    updateIsAvailable,
    updateIsPrepaid,
  } = useMenuManagement();
  return (
    <>
      <HeaderWithBackButton title="Add Menu"></HeaderWithBackButton>
      <View style={styles.container}>
        <CommonButton
          onPress={handleCategoryModalOpen}
          style={styles.addButton}
        >
          + Add Category
        </CommonButton>

        <ScrollView style={styles.scrollView}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onAddItem={handleMenuItemModalOpen}
              onEditItem={editMenuItem}
              onDeleteItem={deleteMenuItem}
            />
          ))}

          {categories.length === 0 && (
            <Text style={styles.emptyMessage}>
              No categories added yet. Start by adding a category!
            </Text>
          )}
        </ScrollView>

        <CategoryModal
          visible={showCategoryModal}
          categoryName={categoryName}
          onCategoryNameChange={setCategoryName}
          onClose={handleCategoryModalClose}
          onAddCategory={addCategory}
        />

        <MenuItemModal
          visible={showMenuItemModal}
          selectedCategory={selectedCategory}
          editingItem={editingItem}
          menuItem={menuItem}
          onClose={handleMenuItemModalClose}
          onSave={addOrUpdateMenuItem}
          onPickImage={pickImage}
          onUpdateDishName={updateDishName}
          onUpdatePreparationTime={updatePreparationTime}
          onUpdatePrice={updatePrice}
          onUpdateIsVeg={updateIsVeg}
          onUpdateIsAvailable={updateIsAvailable}
          onUpdateIsPrepaid={updateIsPrepaid}
        />
      </View>
    </>
  );
};

export default AddMenuScreen;
