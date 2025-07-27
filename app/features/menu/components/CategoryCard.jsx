import React from "react";
import { View, Text } from "react-native";
import CommonButton from "../../../shared/components/CommonButton";
import MenuItemCard from "./MenuItemCard";
import { styles } from "../styles/styles";

const CategoryCard = ({ category, onAddItem, onEditItem, onDeleteItem }) => {
  return (
    <View style={styles.categoryCard}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryName}>{category.name}</Text>
        <CommonButton
          style={styles.addItemButton}
          onPress={() => onAddItem(category)}
          mode="contained"
        >
          + Add Item
        </CommonButton>
      </View>

      {category.items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          onEdit={() => onEditItem(category, item)}
          onDelete={() => onDeleteItem(category.id, item.id)}
        />
      ))}

      {category.items.length === 0 && (
        <Text style={styles.emptyMessage}>No items in this category</Text>
      )}
    </View>
  );
};

export default CategoryCard;
