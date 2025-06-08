import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import CommonButton from '../components/CommonButton';
import CommonTextInput from '../components/CommonTextInput';
import HeaderWithBackButton from '../components/HeaderWithBackButton';

const {width, height} = Dimensions.get('window');

const GOOGLE_API_KEY = 'AIzaSyASMIZqKFDROa87NZ2lTg493pxtwbE9mgQ';

const BusinessLocationScreen = () => {
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState('');
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const mapRef = useRef(null);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the Loction');
          return true;
        } else {
          console.log('Loction permission denied' + granted);
          return false;
        }
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  useEffect(() => {
    requestLocationPermission().then(granted => {
      if (granted) {
        console.log('Location Granted');
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            const initialRegion = {
              latitude,
              longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            };
            setRegion(initialRegion);
            fetchAddressFromCoords(latitude, longitude);
          },
          error => console.log(error),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } else {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to use this feature',
        );
      }
    });
  }, []);

  const fetchAddressFromCoords = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`,
      );
      if (response.data.results.length > 0) {
        setAddress(response.data.results[0].formatted_address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSuggestions = async text => {
    setSearch(text);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_API_KEY}&components=country:in`,
      );
      if (response.data.predictions) {
        setSuggestions(response.data.predictions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSuggestionSelect = async placeId => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`,
      );
      const location = response.data.result.geometry.location;
      const formatted_address = response.data.result.formatted_address;

      setAddress(formatted_address);
      setRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setSuggestions([]);
      setSearch('');
      mapRef.current.animateToRegion(
        {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegionChangeComplete = newRegion => {
    setRegion(newRegion);
    fetchAddressFromCoords(newRegion.latitude, newRegion.longitude);
  };

  const handleSubmit = () => {
    console.log('Submitted Address:', address);
    console.log('Coordinates:', region);
  };

  return (
    <View style={styles.container}>
      <HeaderWithBackButton title="Restaurant Location"></HeaderWithBackButton>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}
      />
      <View style={styles.markerFixed} pointerEvents="none">
        <Image source={require('../assets/marker.png')} style={styles.marker} />
      </View>
      <View style={styles.searchContainer}>
        <CommonTextInput
          placeholder="Search address"
          value={search}
          onChangeText={fetchSuggestions}
        />
        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={item => item.place_id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSuggestionSelect(item.place_id)}
                style={styles.suggestionItem}>
                <Text>{item.description}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsList}
          />
        )}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.addressBox}>
          <Text style={styles.addressLabel}>Selected Address:</Text>
          <Text>{address}</Text>
        </View>
        <CommonButton
          onPress={handleSubmit}
          label="Submit Address"></CommonButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height * 0.8,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 48,
    width: 48,
  },
  searchContainer: {
    position: 'absolute',
    top: '10%',
    width: width * 0.9,
    alignSelf: 'center',
    zIndex: 20,
  },
  bottomContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  suggestionsList: {
    backgroundColor: '#fff',
    maxHeight: 150,
    borderRadius: 8,
    marginTop: 4,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  addressBox: {
    padding: 8,
  },
  addressLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default BusinessLocationScreen;
