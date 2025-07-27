import { useState, useCallback, useMemo } from "react";
import { Alert } from "react-native";

export const useMenuManagement = () => {
  const [categories, setCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showMenuItemModal, setShowMenuItemModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Category form state
  const [categoryName, setCategoryName] = useState("");

  // Menu item form state
  const [menuItem, setMenuItem] = useState({
    dishName: "",
    image: null,
    isVeg: true,
    preparationTime: "",
    price: "",
    isAvailable: true,
    isPrepaid: true,
  });

  // Memoize initial menu item state to prevent recreating object
  const initialMenuItemState = useMemo(
    () => ({
      dishName: "",
      image: null,
      isVeg: true,
      preparationTime: "",
      price: "",
      isAvailable: true,
      isPrepaid: true,
    }),
    []
  );

  // Add new category
  const addCategory = useCallback(() => {
    if (!categoryName.trim()) {
      Alert.alert("Error", "Please enter category name");
      return;
    }

    const newCategory = {
      id: Date.now(),
      name: categoryName,
      items: [],
    };

    setCategories((prev) => [...prev, newCategory]);
    setCategoryName("");
    setShowCategoryModal(false);
    Alert.alert("Success", "Category added successfully");
  }, [categoryName]);

  // Add or update menu item
  const addOrUpdateMenuItem = useCallback(() => {
    if (!menuItem.dishName.trim()) {
      Alert.alert("Error", "Please enter dish name");
      return;
    }

    if (!menuItem.preparationTime.trim()) {
      Alert.alert("Error", "Please enter preparation time");
      return;
    }

    if (!menuItem.price.trim()) {
      Alert.alert("Error", "Please enter price");
      return;
    }

    const itemData = {
      ...menuItem,
      preparationTime: parseInt(menuItem.preparationTime) || 0,
      price: parseFloat(menuItem.price) || 0,
    };

    if (editingItem) {
      // Update existing item
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === selectedCategory.id
            ? {
                ...cat,
                items: cat.items.map((item) =>
                  item.id === editingItem.id
                    ? { ...itemData, id: editingItem.id }
                    : item
                ),
              }
            : cat
        )
      );
      Alert.alert("Success", "Menu item updated successfully");
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        ...itemData,
      };

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === selectedCategory.id
            ? { ...cat, items: [...cat.items, newItem] }
            : cat
        )
      );
      Alert.alert("Success", "Menu item added successfully");
    }

    setMenuItem(initialMenuItemState);
    setEditingItem(null);
    setShowMenuItemModal(false);
  }, [menuItem, selectedCategory, editingItem, initialMenuItemState]);

  // Edit menu item
  const editMenuItem = useCallback((category, item) => {
    setSelectedCategory(category);
    setEditingItem(item);
    setMenuItem({
      dishName: item.dishName,
      image: item.image,
      isVeg: item.isVeg,
      preparationTime: item.preparationTime.toString(),
      price: item.price.toString(),
      isAvailable: item.isAvailable,
      isPrepaid: item.isPrepaid,
    });
    setShowMenuItemModal(true);
  }, []);

  // Delete menu item
  const deleteMenuItem = useCallback((categoryId, itemId) => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setCategories((prev) =>
            prev.map((cat) =>
              cat.id === categoryId
                ? {
                    ...cat,
                    items: cat.items.filter((item) => item.id !== itemId),
                  }
                : cat
            )
          );
          Alert.alert("Success", "Menu item deleted successfully");
        },
      },
    ]);
  }, []);

  // Simulate image picker
  const pickImage = useCallback(() => {
    Alert.alert("Select Image", "Choose image source", [
      { text: "Camera", onPress: () => simulateImagePick("camera") },
      { text: "Gallery", onPress: () => simulateImagePick("gallery") },
      { text: "Cancel", style: "cancel" },
    ]);
  }, []);

  const simulateImagePick = useCallback((source) => {
    // Simulate image selection
    const mockImage = {
      uri: "https://via.placeholder.com/150x150?text=Dish+Image",
      type: "image/jpeg",
      name: "dish_image.jpg",
    };
    setMenuItem((prev) => ({ ...prev, image: mockImage }));
  }, []);

  // Memoized handlers to prevent recreating functions
  const handleCategoryModalClose = useCallback(() => {
    setShowCategoryModal(false);
    setCategoryName("");
  }, []);

  const handleMenuItemModalClose = useCallback(() => {
    setShowMenuItemModal(false);
    setMenuItem(initialMenuItemState);
    setEditingItem(null);
  }, [initialMenuItemState]);

  const handleCategoryModalOpen = useCallback(() => {
    setShowCategoryModal(true);
  }, []);

  const handleMenuItemModalOpen = useCallback((category) => {
    setSelectedCategory(category);
    setEditingItem(null);
    setShowMenuItemModal(true);
  }, []);

  // Memoized menu item field updaters
  const updateDishName = useCallback((text) => {
    setMenuItem((prev) => ({ ...prev, dishName: text }));
  }, []);

  const updatePreparationTime = useCallback((text) => {
    setMenuItem((prev) => ({ ...prev, preparationTime: text }));
  }, []);

  const updatePrice = useCallback((text) => {
    setMenuItem((prev) => ({ ...prev, price: text }));
  }, []);

  const updateIsVeg = useCallback((isVeg) => {
    setMenuItem((prev) => ({ ...prev, isVeg }));
  }, []);

  const updateIsAvailable = useCallback((isAvailable) => {
    setMenuItem((prev) => ({ ...prev, isAvailable }));
  }, []);

  const updateIsPrepaid = useCallback((isPrepaid) => {
    setMenuItem((prev) => ({ ...prev, isPrepaid }));
  }, []);

  return {
    // State
    categories,
    showCategoryModal,
    showMenuItemModal,
    selectedCategory,
    editingItem,
    categoryName,
    menuItem,
    initialMenuItemState,

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
  };
};
