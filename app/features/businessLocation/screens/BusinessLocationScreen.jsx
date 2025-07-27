import React from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import MapView from "react-native-maps";
import CommonButton from "../../../shared/components/CommonButton";
import CommonTextInput from "../../../shared/components/CommonTextInput";
import HeaderWithBackButton from "../../../shared/components/HeaderWithBackButton";
import useBusinessLocation from "../hooks/useBusinessLocation";
import styles from "../styles/styles";

const BusinessLocationScreen = () => {
  const {
    region,
    address,
    search,
    suggestions,
    error,
    addressLoading,
    suggestionsLoading,
    placeDetailsLoading,
    mapRef,
    handleSearchChange,
    handleSuggestionSelect,
    handleRegionChangeComplete,
    handleSubmit,
    clearErrorMessage,
  } = useBusinessLocation();

  // Show error alert if there's an error
  React.useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [
        {
          text: "OK",
          onPress: clearErrorMessage,
        },
      ]);
    }
  }, [error]);

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSuggestionSelect(item.place_id)}
      style={styles.suggestionItem}
      disabled={placeDetailsLoading}
    >
      <Text>{item.description}</Text>
      {placeDetailsLoading && (
        <ActivityIndicator size="small" color="#0000ff" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeaderWithBackButton title="Restaurant Location" />

      {region && (
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
          onRegionChangeComplete={handleRegionChangeComplete}
        />
      )}

      <View style={styles.markerFixed} pointerEvents="none">
        <Image
          source={require("../../../assets/marker.png")}
          style={styles.marker}
        />
      </View>

      <View style={styles.searchContainer}>
        <CommonTextInput
          placeholder="Search address"
          value={search}
          onChangeText={handleSearchChange}
          editable={!placeDetailsLoading}
        />

        {suggestionsLoading && (
          <View style={styles.suggestionsList}>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        )}

        {suggestions.length > 0 && !suggestionsLoading && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={renderSuggestionItem}
            style={styles.suggestionsList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.addressBox}>
          <Text style={styles.addressLabel}>Selected Address:</Text>
          {addressLoading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Text>{address}</Text>
          )}
        </View>

        <CommonButton
          onPress={handleSubmit}
          disabled={!address || addressLoading || placeDetailsLoading}
        >
          {placeDetailsLoading ? "Loading..." : "Submit Address"}
        </CommonButton>
      </View>
    </View>
  );
};

export default BusinessLocationScreen;
