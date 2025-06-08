// routes.js
import HomeScreen from '../screens/HomeScreen';
import MerchantRegistrationScreen from '../screens/MerchantRegistrationScreen';

export const ROUTES = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: 'home',
  },
  {
    name: 'MerchantRegistrationScreen',
    component: MerchantRegistrationScreen,
    icon: 'camera',
  },
];
