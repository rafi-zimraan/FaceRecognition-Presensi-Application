import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function LibDemo({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('FaceTopUpResultScreen')}
      >
        <Text>LibTestDemo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
