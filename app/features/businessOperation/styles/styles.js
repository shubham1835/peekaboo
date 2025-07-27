import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#ffffff",
  },
  input: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginTop: 16,
    fontWeight: "bold",
    fontSize: 16,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  button: {
    marginTop: 24,
    backgroundColor: "#fac724",
  },
  bottomSheetContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  pickerHeader: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 12,
  },
});

export default styles;
