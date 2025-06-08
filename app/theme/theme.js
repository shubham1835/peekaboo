// theme.js
import {MD3LightTheme as DefaultTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0179b0', // Your primary brand color
    secondary: '#43A047',
    background: '#ffffff',
    surface: '#f5f5f5',
    error: '#B00020',
    button: '#fac724',
    text: '#000000',
    onPrimary: '#ffffff',
    onSecondary: '#ffffff',
  },
};
