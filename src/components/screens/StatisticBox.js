import React from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import { Gap } from '..';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../utils';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2;

const StatisticBox = ({ iconName, label, count, color }) => {
  return (
    <View style={styles.statBoxWrapper}>
      <View style={styles.statBox}>
        <MaterialIcons name={iconName} size={30} color={color} />
        <Gap height={5} />
        <Text style={[styles.statCount, { color: color }]}>{count}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statBoxWrapper: {
    width: ITEM_WIDTH,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statBox: {
    backgroundColor: COLORS.WHITE,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statCount: {
    fontSize: 32,
    fontWeight: '900',
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.TEXT_DARK,
    marginTop: 2,
    fontWeight: '600',
  },
});

export default StatisticBox;
