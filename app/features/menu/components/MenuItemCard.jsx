import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "../styles/styles";

const MenuItemCard = ({ item, onEdit, onDelete }) => {
  return (
    <View style={styles.menuItem}>
      <View style={styles.itemContent}>
        {/* Left side - Image */}
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image source={{ uri: item.image.uri }} style={styles.itemImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>🍽️</Text>
            </View>
          )}
        </View>

        {/* Right side - Details */}
        <View style={styles.itemDetailsContainer}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemName}>{item.dishName}</Text>
            <View style={styles.itemTags}>
              <Text
                style={[
                  styles.tag,
                  item.isVeg ? styles.vegTag : styles.nonVegTag,
                ]}
              >
                {item.isVeg ? "🌱" : "🍖"}
              </Text>
              <Text
                style={[
                  styles.tag,
                  styles.availabilityTag,
                  !item.isAvailable && styles.unavailableTag,
                ]}
              >
                {item.isAvailable ? "Available" : "Unavailable"}
              </Text>
            </View>
          </View>

          <Text style={styles.itemPrice}>₹{item.price}</Text>

          <View style={styles.itemDetails}>
            <Text style={styles.itemDetail}>
              ⏱️ {item.preparationTime} mins
            </Text>
            <Text style={styles.itemDetail}>
              💳 {item.isPrepaid ? "Prepaid" : "Postpaid"}
            </Text>
          </View>

          <View style={styles.itemActions}>
            <TouchableOpacity style={styles.editButton} onPress={onEdit}>
              <Text style={styles.editButtonText}>✏️ Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MenuItemCard;
