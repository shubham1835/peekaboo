import { useState } from "react";

export const useModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "Admin",
    status: "Active",
    phone: "",
    store: "",
  });

  const resetForms = () => {
    setUserForm({ name: "", email: "", role: "Admin", status: "Active" });
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      if (type.includes("user")) {
        setUserForm(item);
      }
    } else {
      resetForms();
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingItem(null);
    resetForms();
  };

  return {
    modalVisible,
    modalType,
    editingItem,
    userForm,
    setUserForm,
    openModal,
    closeModal,
  };
};
