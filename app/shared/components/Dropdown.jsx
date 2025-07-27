import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-paper";

const Dropdown = ({
  data = [],
  placeholder = "Select an option",
  onSelect,
  searchable = true,
  maxHeight = 200,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredData, setFilteredData] = useState(data);

  const animatedHeight = useRef(new Animated.Value(0)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: isOpen ? 0 : maxHeight,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotateValue, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setIsOpen(!isOpen);
    if (!isOpen) {
      setFilteredData(data);
      setSearchText("");
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.label.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const selectItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    setSearchText("");
    setFilteredData(data);
    onSelect && onSelect(item);

    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotateValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const clearSelection = () => {
    setSelectedItem(null);
    onSelect && onSelect(null);
  };

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.dropdownItem,
        index === filteredData.length - 1 && styles.lastItem,
      ]}
      onPress={() => selectItem(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.dropdown, isOpen && styles.dropdownOpen]}
        onPress={toggleDropdown}
        activeOpacity={0.8}
      >
        <Text
          style={[styles.dropdownText, !selectedItem && styles.placeholderText]}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Text>

        <View style={styles.iconContainer}>
          {selectedItem && (
            <TouchableOpacity
              onPress={clearSelection}
              style={styles.clearButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon source="close" size={16} color="#666" />
            </TouchableOpacity>
          )}
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Icon source="chevron-down" size={20} color="#666" />
          </Animated.View>
        </View>
      </TouchableOpacity>

      {/* Fixed: Absolutely positioned dropdown list that overlays content */}
      <Animated.View
        style={[
          styles.dropdownList,
          {
            height: animatedHeight,
            maxHeight: maxHeight, // Add maxHeight to prevent overflow
          },
        ]}
      >
        <View style={styles.listContainer}>
          {searchable && (
            <View style={styles.searchContainer}>
              <Icon
                source="magnify"
                size={16}
                color="#999"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchText}
                onChangeText={handleSearch}
                placeholderTextColor="#999"
              />
            </View>
          )}

          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.value.toString()}
            showsVerticalScrollIndicator={false}
            bounces={false}
            nestedScrollEnabled={true} // Important for nested scrolling
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No items found</Text>
              </View>
            }
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Remove position: relative and zIndex from here
    // Keep it simple for the main container
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e1e8ed",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  dropdownOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: "transparent",
  },
  dropdownText: {
    fontSize: 16,
    color: "#2c3e50",
    flex: 1,
  },
  placeholderText: {
    color: "#95a5a6",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  clearButton: {
    marginRight: 8,
    padding: 4,
  },
  dropdownList: {
    // KEY CHANGES: Make this absolutely positioned to overlay content
    position: "absolute",
    top: "100%", // Position right below the dropdown button
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e1e8ed",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: "hidden",
    zIndex: 1000, // High z-index to appear above other content
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 6,
    // elevation: 8, // Higher elevation for Android
  },
  listContainer: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f2f6",
    backgroundColor: "#f8f9fa",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#2c3e50",
    padding: 0,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f1f2f6",
    backgroundColor: "#fff", // Ensure background color
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemText: {
    fontSize: 16,
    color: "#2c3e50",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#95a5a6",
    fontStyle: "italic",
  },
});

export default Dropdown;
