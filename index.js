/**
 * @format
 */
import {registerRootComponent} from 'expo';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {name as appName} from './app.json';
import App from './app/App';

AppRegistry.registerComponent(appName, () => App);
registerRootComponent(App);
