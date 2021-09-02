import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import EditScreenInfo from "./components/EditScreenInfo";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { LoginScreen } from "./screens/LoginScreen";
const Stack = createStackNavigator();
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {/* <View style={styles.container}> */}
        <StatusBar />
        <EditScreenInfo />
        {/* </View> */}
        {/* <NavigationContainer>
          <Stack.Navigator
            initialRouteName={"MAIN"}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name={"MAIN"}
              options={{
                headerShown: false,
              }}
            >
              {(props) => (
               
              )}
            </Stack.Screen>
            <Stack.Screen
              name={"LOGIN"}
              options={{
                headerShown: false,
              }}
            >
              {(props) => <LoginScreen {...props} />}
            </Stack.Screen>
          </Stack.Navigator> */}
        {/* </NavigationContainer> */}
      </SafeAreaProvider>
    );
  }
}
