import React from 'react';
import { View } from 'react-native';

export default function Gap({
  height,
  width,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  flex,
}) {
  return (
    <View
      style={{
        height,
        width,
        marginLeft,
        marginRight,
        marginTop,
        marginBottom,
        flex,
      }}
    />
  );
}
