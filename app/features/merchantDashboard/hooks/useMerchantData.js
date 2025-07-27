import { useState } from "react";
import { Alert } from "react-native";

export const useMerchantData = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Dashboard data
  const [dashboardData, setDashboardData] = useState({
    totalStores: 12,
    totalUsers: 45,
    activeOrders: 23,
  });

  // Stores data
  const [stores, setStores] = useState([
    {
      id: 1,
      name: "Downtown Store",
      address: "123 Main St",
      status: "Active",
      manager: "John Doe",
    },
    {
      id: 2,
      name: "Mall Location",
      address: "456 Shopping Ave",
      status: "Active",
      manager: "Jane Smith",
    },
    {
      id: 3,
      name: "Airport Branch",
      address: "789 Terminal Rd",
      status: "Inactive",
      manager: "Mike Johnson",
    },
  ]);

  // Users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Store Manager",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Store Manager",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "Staff",
      status: "Inactive",
    },
  ]);

  // CRUD operations for stores
  const addStore = (storeData) => {
    const newStore = { ...storeData, id: Date.now() };
    setStores((prev) => [...prev, newStore]);
    setDashboardData((prev) => ({
      ...prev,
      totalStores: prev.totalStores + 1,
    }));
  };

  const updateStore = (id, storeData) => {
    setStores((prev) =>
      prev.map((store) => (store.id === id ? { ...storeData, id } : store))
    );
  };

  const deleteStore = (id) => {
    Alert.alert("Delete Store", "Are you sure you want to delete this store?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setStores((prev) => prev.filter((store) => store.id !== id));
          setDashboardData((prev) => ({
            ...prev,
            totalStores: prev.totalStores - 1,
          }));
        },
      },
    ]);
  };

  // CRUD operations for users
  const addUser = (userData) => {
    const newUser = { ...userData, id: Date.now() };
    setUsers((prev) => [...prev, newUser]);
    setDashboardData((prev) => ({
      ...prev,
      totalUsers: prev.totalUsers + 1,
    }));
  };

  const updateUser = (id, userData) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...userData, id } : user))
    );
  };

  const deleteUser = (id) => {
    Alert.alert("Delete User", "Are you sure you want to delete this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setUsers((prev) => prev.filter((user) => user.id !== id));
          setDashboardData((prev) => ({
            ...prev,
            totalUsers: prev.totalUsers - 1,
          }));
        },
      },
    ]);
  };

  return {
    dashboardData,
    stores,
    users,
    addStore,
    updateStore,
    deleteStore,
    addUser,
    updateUser,
    deleteUser,
    searchQuery,
    setSearchQuery,
  };
};
