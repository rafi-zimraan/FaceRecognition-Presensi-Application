import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  FaceInstructionScreen,
  FaceResultScreen,
  FaceTopUpResultScreen,
  HomeScreen,
  LibDemo,
  SplashScreen,
} from '../screens';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: 'transparent',
        statusBarTranslucent: true,
      }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen name="LibDemo" component={LibDemo} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="FaceInstruction" component={FaceInstructionScreen} />
      <Stack.Screen name="FaceResult" component={FaceResultScreen} />
      <Stack.Screen
        name="FaceTopUpResultScreen"
        component={FaceTopUpResultScreen}
      />
    </Stack.Navigator>
  );
}
