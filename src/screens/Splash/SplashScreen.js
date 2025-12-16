import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { LogoKariminang } from '../../assets';
import { LoaderKitView } from 'react-native-loader-kit';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('HomeScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={LogoKariminang}
          style={{ width: 200, height: 200 }}
          resizeMethod="resize"
          resizeMode="cover"
        />

        <LoaderKitView
          style={{ width: 60, height: 60 }}
          name="BallPulse"
          color="#eb8b15ff"
          animationSpeedMultiplier={1.0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
