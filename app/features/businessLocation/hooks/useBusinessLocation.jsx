import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Platform, PermissionsAndroid, Alert } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import {
  fetchAddressFromCoords,
  fetchSuggestions,
  fetchPlaceDetails,
  setRegion,
  setSearch,
  clearSuggestions,
  clearSearch,
  clearError,
} from "../../../core/store/reducers/locationSlice";
const useBusinessLocation = () => {
  const dispatch = useDispatch();
  const {
    region,
    address,
    search,
    suggestions,
    loading,
    error,
    addressLoading,
    suggestionsLoading,
    placeDetailsLoading,
  } = useSelector((state) => state.location);

  const mapRef = useRef(null);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message:
              "This app needs access to your location to show your current position.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission granted");
          return true;
        } else {
          console.log("Location permission denied:", granted);
          return false;
        }
      }
      return true; // iOS handles permissions differently
    } catch (err) {
      console.warn("Permission request error:", err);
      return false;
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const initialRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };
        dispatch(setRegion(initialRegion));
        dispatch(fetchAddressFromCoords({ latitude, longitude }));
      },
      (error) => {
        console.log("Location error:", error);
        Alert.alert(
          "Location Error",
          "Unable to get your current location. Please try again."
        );
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  useEffect(() => {
    requestLocationPermission().then((granted) => {
      if (granted) {
        getCurrentLocation();
      } else {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to use this feature"
        );
      }
    });
  }, []);

  const handleSearchChange = (text) => {
    dispatch(setSearch(text));
    if (text.length > 2) {
      dispatch(fetchSuggestions(text));
    } else {
      dispatch(clearSuggestions());
    }
  };

  const handleSuggestionSelect = (placeId) => {
    dispatch(fetchPlaceDetails(placeId)).then(() => {
      dispatch(clearSuggestions());
      dispatch(clearSearch());

      // Animate map to new region
      if (mapRef.current && region) {
        mapRef.current.animateToRegion(region, 1000);
      }
    });
  };

  const handleRegionChangeComplete = (newRegion) => {
    dispatch(setRegion(newRegion));
    dispatch(
      fetchAddressFromCoords({
        latitude: newRegion.latitude,
        longitude: newRegion.longitude,
      })
    );
  };

  const handleSubmit = () => {
    console.log("Submitted Address:", address);
    console.log("Coordinates:", region);
    // Add your submission logic here
  };

  const clearErrorMessage = () => {
    dispatch(clearError());
  };

  return {
    // State
    region,
    address,
    search,
    suggestions,
    loading,
    error,
    addressLoading,
    suggestionsLoading,
    placeDetailsLoading,

    // Refs
    mapRef,

    // Handlers
    handleSearchChange,
    handleSuggestionSelect,
    handleRegionChangeComplete,
    handleSubmit,
    clearErrorMessage,
    getCurrentLocation,
  };
};

export default useBusinessLocation;
