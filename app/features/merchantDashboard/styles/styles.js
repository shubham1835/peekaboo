import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  // Navigation styles
  navigation: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  navigationTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  navigationTabs: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
  navigationTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  navigationTabActive: {
    backgroundColor: "#3b82f6",
  },
  navigationTabInactive: {
    backgroundColor: "#1d4ed8",
  },
  navigationTabText: {
    color: "#ffffff",
    fontSize: 14,
  },

  // Dashboard styles
  dashboardContainer: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  dashboardCardsRow: {
    flexDirection: "row",
    marginBottom: 24,
  },
  dashboardCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flex: 1,
    marginHorizontal: 4,
    borderLeftWidth: 4,
  },
  dashboardCardBlue: {
    borderLeftColor: "#3b82f6",
  },
  dashboardCardGreen: {
    borderLeftColor: "#10b981",
  },
  dashboardCardOrange: {
    borderLeftColor: "#f59e0b",
  },
  dashboardCardContent: {
    justifyContent: "space-between",
  },
  dashboardCardTitle: {
    color: "#6b7280",
    fontSize: 14,
  },
  dashboardCardValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 4,
  },

  // Quick actions
  quickActionsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionsTitle: {
    fontWeight: "600",
    color: "#1f2937",
  },
  quickActionButton: {
    marginTop: 10,
    marginBottom: 12,
  },
  quickActionButtonBlue: {
    backgroundColor: "#eff6ff",
    borderColor: "#bfdbfe",
  },
  quickActionButtonGreen: {
    backgroundColor: "#f0fdf4",
    borderColor: "#bbf7d0",
  },
  quickActionTitle: {
    fontWeight: "500",
    marginBottom: 4,
  },
  quickActionTitleBlue: {
    color: "#1d4ed8",
  },
  quickActionTitleGreen: {
    color: "#166534",
  },
  quickActionSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  quickActionSubtitleBlue: {
    color: "#2563eb",
  },
  quickActionSubtitleGreen: {
    color: "#16a34a",
  },

  // Store/User management styles
  managementContainer: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  managementHeader: {
    backgroundColor: "#ffffff",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  managementHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  addButtonBlue: {
    backgroundColor: "#2563eb",
  },
  addButtonGreen: {
    backgroundColor: "#16a34a",
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "500",
    marginLeft: 8,
  },

  // List item styles
  listItem: {
    backgroundColor: "#ffffff",
    margin: 8,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  listItemInfo: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  listItemSubtitle: {
    color: "#6b7280",
    marginTop: 4,
  },
  listItemActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 4,
  },
  actionButtonEdit: {
    backgroundColor: "#dbeafe",
  },
  actionButtonDelete: {
    backgroundColor: "#fee2e2",
  },

  // Status badge
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  statusBadgeActive: {
    backgroundColor: "#dcfce7",
  },
  statusBadgeInactive: {
    backgroundColor: "#fee2e2",
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  statusBadgeTextActive: {
    color: "#166534",
  },
  statusBadgeTextInactive: {
    color: "#dc2626",
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    margin: 16,
    borderRadius: 8,
    padding: 24,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },

  // Form styles
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    color: "#374151",
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  textInputMultiline: {
    textAlignVertical: "top",
    minHeight: 80,
  },

  // Selection buttons
  selectionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  selectionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  selectionButtonActive: {
    borderColor: "#3b82f6",
  },
  selectionButtonActiveBlue: {
    backgroundColor: "#dbeafe",
    borderColor: "#3b82f6",
  },
  selectionButtonActiveGreen: {
    backgroundColor: "#dcfce7",
    borderColor: "#16a34a",
  },
  selectionButtonInactive: {
    backgroundColor: "#f3f4f6",
    borderColor: "#d1d5db",
  },
  selectionButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  selectionButtonTextActiveBlue: {
    color: "#1d4ed8",
  },
  selectionButtonTextActiveGreen: {
    color: "#166534",
  },
  selectionButtonTextInactive: {
    color: "#374151",
  },

  // Modal actions
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 24,
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modalButtonCancel: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
  },
  modalButtonSubmit: {
    backgroundColor: "#2563eb",
  },
  modalButtonTextCancel: {
    color: "#374151",
  },
  modalButtonTextSubmit: {
    color: "#ffffff",
  },
  dachboardCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // gap: 12,
  },
  managamentCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 16,
    gap: 6,
  },
  storeList: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 5,
  },
});
