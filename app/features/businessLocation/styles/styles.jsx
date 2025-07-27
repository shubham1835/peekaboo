import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height * 0.8,
  },
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  marker: {
    height: 48,
    width: 48,
  },
  searchContainer: {
    position: "absolute",
    top: "10%",
    width: width * 0.9,
    alignSelf: "center",
    zIndex: 20,
  },
  bottomContainer: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  suggestionsList: {
    backgroundColor: "#fff",
    maxHeight: 150,
    borderRadius: 8,
    marginTop: 4,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  addressBox: {
    padding: 8,
  },
  addressLabel: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});

export default styles;
