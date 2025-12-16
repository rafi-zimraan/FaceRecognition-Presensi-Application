import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../utils';

const CategoryButton = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        // Warna border berubah jika terpilih
        isSelected && {
          borderColor: COLORS.PRIMARY,
          backgroundColor: COLORS.PRIMARY + '10',
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.categoryText,
          // Warna teks berubah jika terpilih
          isSelected && { color: COLORS.PRIMARY, fontWeight: 'bold' },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  categoryButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: COLORS.LIGHT_GREY,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 15,
    color: COLORS.DARK_GREY,
    fontWeight: '600',
  },
});
