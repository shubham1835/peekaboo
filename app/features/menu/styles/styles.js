import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  addButton: {
    marginBottom: 20,
  },
  scrollView: {
    paddingBottom: 100,
  },
  categoryCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  addItemButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 6,
  },
  menuItem: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  imageContainer: {
    marginRight: 12,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  placeholderText: {
    fontSize: 24,
  },
  itemDetailsContainer: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  itemTags: {
    flexDirection: "row",
    gap: 4,
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    fontSize: 10,
    fontWeight: "600",
  },
  vegTag: {
    backgroundColor: "#E8F5E8",
    color: "#4CAF50",
  },
  nonVegTag: {
    backgroundColor: "#FFE8E8",
    color: "#F44336",
  },
  availabilityTag: {
    backgroundColor: "#E8F5E8",
    color: "#4CAF50",
  },
  unavailableTag: {
    backgroundColor: "#FFE8E8",
    color: "#F44336",
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: 8,
  },
  itemDetails: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  itemDetail: {
    fontSize: 12,
    color: "#666",
  },
  itemActions: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    flex: 1,
  },
  editButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#F44336",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    flex: 1,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  emptyMessage: {
    textAlign: "center",
    color: "#999",
    fontStyle: "italic",
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalScrollView: {
    maxHeight: "90%",
    width: "100%",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    margin: 20,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  textInput: {
    marginBottom: 16,
    maxHeight: 60,
    height: 60,
  },
  imageUpload: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },
  imageUploadText: {
    color: "#666",
    fontSize: 16,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  vegNonVegContainer: {
    flexDirection: "row",
    gap: 8,
  },
  vegButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  vegButtonActive: {
    backgroundColor: "#4CAF50",
  },
  vegButtonText: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  vegButtonTextActive: {
    color: "white",
  },
  nonVegButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#F44336",
  },
  nonVegButtonActive: {
    backgroundColor: "#F44336",
  },
  nonVegButtonText: {
    color: "#F44336",
    fontWeight: "600",
  },
  nonVegButtonTextActive: {
    color: "white",
  },
  paymentContainer: {
    flexDirection: "row",
    gap: 8,
  },
  paymentButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#2196F3",
  },
  paymentButtonActive: {
    backgroundColor: "#2196F3",
  },
  paymentButtonText: {
    color: "#2196F3",
    fontWeight: "600",
  },
  paymentButtonTextActive: {
    color: "white",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
  },
});
