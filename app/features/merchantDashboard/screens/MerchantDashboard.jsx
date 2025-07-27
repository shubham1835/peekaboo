import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "../styles/styles";

// Hooks
import { useMerchantData } from "../hooks/useMerchantData";
import { useModal } from "../hooks/useModal";

// Components
import Navigation from "../components/Navigation";
import DashboardView from "../components/DashboardView";
import StoreManagementView from "../components/StoreManagementView";
import UserManagementView from "../components/UserManagementView";
import FormModal from "../components/FormModal";

const MerchantDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  // Custom hooks
  const {
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
  } = useMerchantData();

  const {
    modalVisible,
    modalType,
    editingItem,
    storeForm,
    userForm,
    setStoreForm,
    setUserForm,
    openModal,
    closeModal,
  } = useModal();

  // Form submission handlers
  const handleStoreSubmit = () => {
    if (editingItem) {
      updateStore(editingItem.id, storeForm);
    } else {
      addStore(storeForm);
    }
    closeModal();
  };

  const handleUserSubmit = () => {
    if (editingItem) {
      updateUser(editingItem.id, userForm);
    } else {
      addUser(userForm);
    }
    closeModal();
  };

  return (
    <View style={styles.container}>
      {/* <Navigation currentView={currentView} setCurrentView={setCurrentView} /> */}

      {currentView === "dashboard" && (
        <DashboardView
          dashboardData={dashboardData}
          setCurrentView={setCurrentView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}

      {currentView === "stores" && (
        <StoreManagementView
          stores={stores}
          openModal={openModal}
          deleteStore={deleteStore}
        />
      )}

      {currentView === "users" && (
        <UserManagementView
          users={users}
          openModal={openModal}
          deleteUser={deleteUser}
        />
      )}

      <FormModal
        modalVisible={modalVisible}
        modalType={modalType}
        editingItem={editingItem}
        storeForm={storeForm}
        userForm={userForm}
        setStoreForm={setStoreForm}
        setUserForm={setUserForm}
        closeModal={closeModal}
        onStoreSubmit={handleStoreSubmit}
        onUserSubmit={handleUserSubmit}
      />
    </View>
  );
};

export default MerchantDashboard;
