// screens/SplashScreen.js
import {Image} from 'expo-image';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';

const HomeScreen = () => {
  const {width, height} = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#DFDFDF" stopOpacity="1" />
            <Stop offset="1" stopColor="#484848" stopOpacity="1" />
            <Stop offset="3" stopColor="#F6F8F7" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      <Image
        source={require('../assets/logo.png')}
        style={{
          width: width * 0.8,
          height: height * 0.4,
        }}
        contentFit="contain"
        cachePolicy="immutable"
        transition={1000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: Dimensions.get('window').width * 0.8,
  },
});

export default HomeScreen;
