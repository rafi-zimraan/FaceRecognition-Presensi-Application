import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  Platform,
} from 'react-native';

import { Gap, StatisticBox, AdvancedMenuButton } from '../../components';
import { COLORS } from '../../utils';
import { IMG_KARIMINANGLANDSCAPE } from '../../assets';

export default function Home({ navigation }) {
  const dataStats = [
    { icon: 'check-circle', label: 'Hadir', count: 12, color: COLORS.SUCCESS },
    { icon: 'flag', label: 'Pulang', count: 10, color: COLORS.DANGER },
    { icon: 'cached', label: 'Izin', count: 1, color: COLORS.WARNING },
    { icon: 'star', label: 'Cuti', count: 0, color: COLORS.INFO },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.PRIMARY} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Presensi Karyawan</Text>
        </View>

        <Gap height={20} />

        {/* --- Card Profil --- */}
        <View style={styles.profileCard}>
          <Image source={IMG_KARIMINANGLANDSCAPE} style={styles.cardImage} />
          <View style={styles.overlay}>
            <Text style={styles.cardSubtitle}>RUMAH MAKAN KARIMINANG</Text>
            <Text style={styles.cardDetail}>MAKANAN KHAS PADANG</Text>
          </View>
        </View>

        <Gap height={20} />

        {/* --- Area Statistik --- */}
        <View style={styles.statsContainer}>
          {dataStats.map((item, index) => (
            <StatisticBox
              key={index}
              iconName={item.icon}
              label={item.label}
              count={item.count}
              color={item.color}
            />
          ))}
        </View>

        <Gap height={30} />

        {/* --- Menu Presensi --- */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuSectionTitle}>Aksi Utama Presensi</Text>
          <Gap height={10} />

          <AdvancedMenuButton
            iconName="event-available"
            label="Mulai Presensi Harian"
            onPress={() => navigation.navigate('FaceInstruction')}
            buttonColor={COLORS.PRIMARY}
          />

          <AdvancedMenuButton
            iconName="history"
            label="Riwayat Presensi"
            onPress={() => console.log('Lihat Riwayat')}
            buttonColor={COLORS.DARK_GREY}
          />
        </View>
        <Gap height={50} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_GREY,
  },
  header: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: {
    color: COLORS.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  profileCard: {
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    height: 180,
    backgroundColor: COLORS.WHITE,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    padding: 15,
  },
  cardSubtitle: {
    color: COLORS.ACCENT,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDetail: {
    color: COLORS.LIGHT_GREY,
    fontSize: 12,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  menuContainer: {
    marginHorizontal: 20,
  },
  menuSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: 10,
  },
});
