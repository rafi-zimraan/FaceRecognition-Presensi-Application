import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { COLORS } from '../../utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AdvancedMenuButton = ({
  iconName,
  label,
  onPress,
  buttonColor = COLORS.PRIMARY,
}) => {
  return (
    <TouchableOpacity
      style={[styles.menuButton, { borderLeftColor: buttonColor }]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View
        style={[styles.menuIconContainer, { backgroundColor: buttonColor }]}
      >
        <MaterialIcons name={iconName} size={24} color={COLORS.WHITE} />
      </View>
      <Text style={styles.menuLabel}>{label}</Text>
      <MaterialIcons
        name="arrow-forward-ios"
        size={18}
        color={COLORS.DARK_GREY}
      />
    </TouchableOpacity>
  );
};

export default AdvancedMenuButton;

const styles = StyleSheet.create({
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 5,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  menuIconContainer: {
    padding: 10,
    borderRadius: 8,
    marginRight: 15,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_DARK,
  },
});
