/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import BottomTabs from "./core/navigation/BottomTabs";
import BusinessLocationScreen from "./features/businessLocation/screens/BusinessLocationScreen";
import FssaiDetailsUploadScreen from "./screens/FssaiDetailsUploadScreen";
import StoreBasicInfoScreen from "./screens/StoreBasicInfoScreen";
import GSTDetailsUploadScreen from "./screens/GSTDetailsUploadScreen";
import PanDetailsUploadScreen from "./screens/PanDetailsUploadScreen";
import FinalVerificationScreen from "./screens/RegistrationConfirmation";
import SplashScreen from "./screens/SplashScreen";
import OperationalDetailsScreen from "./features/businessOperation/screens/OperationalDetailsScreen";
import AddMenuScreen from "./features/menu/screens/AddMenuScreen";
import MerchantRegistrationScreen from "./screens/MerchantRegistrationScreen";
import { persistor, store } from "./core/store/store";
import { theme } from "./shared/theme/theme";
import MerchantDashboard from "./features/merchantDashboard/screens/MerchantDashboard";
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Stack.Navigator initialRouteName="MerchantDashboard">
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="BottomTabs"
                component={BottomTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MerchantRegistrationScreen"
                component={MerchantRegistrationScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="BusinessLocationScreen"
                component={BusinessLocationScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PanDetailsUploadScreen"
                component={PanDetailsUploadScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FssaiDetailsUploadScreen"
                component={FssaiDetailsUploadScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="GSTDetailsUploadScreen"
                component={GSTDetailsUploadScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FinalVerificationScreen"
                component={FinalVerificationScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="StoreBasicInfoScreen"
                component={StoreBasicInfoScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="OperationalDetailsScreen"
                component={OperationalDetailsScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddMenuScreen"
                component={AddMenuScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MerchantDashboard"
                component={MerchantDashboard}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </PersistGate>
        </Provider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
