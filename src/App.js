import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import Navigator from './routers';
import BootSplash from 'react-native-bootsplash';

export const navigatoionRef = createNavigationContainerRef();

export default function App() {
  return (
    <NavigationContainer
      ref={navigatoionRef}
      onReady={() => {
        BootSplash.hide({ fade: true });
      }}
    >
      <Navigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
