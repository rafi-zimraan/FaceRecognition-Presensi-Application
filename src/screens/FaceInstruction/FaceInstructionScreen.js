import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { CategoryButton, Gap, Header } from '../../components';
import { COLORS } from '../../utils';
import { ICON_SCANNER } from '../../assets';

const { height } = Dimensions.get('window');

export default function FaceInstructionScreen({ navigation }) {
  // State untuk melacak kategori absensi yang dipilih (Hadir, Pulang, Istirahat)
  const [selectedCategory, setSelectedCategory] = useState('Hadir');

  // Data kategori absensi
  const categories = ['Hadir', 'Pulang', 'Istirahat'];

  const handleAbsen = () => {
    console.log(
      `Melanjutkan ke scan wajah untuk kategori: ${selectedCategory}`,
    );
    navigation.navigate('FaceResult', { category: selectedCategory });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.PRIMARY} />
      {/* --- Header Kustom --- */}
      <Header
        title="Presensi Masuk"
        onBackPress={() => navigation.goBack()}
        showBackButton={true}
      />

      {/* --- Area Konten Utama --- */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Pindai Wajah Anda</Text>
        <Gap height={15} />

        {/* --- Area Pindai Wajah --- */}
        <View style={styles.scanArea}>
          <Image
            source={ICON_SCANNER}
            style={styles.scanImage}
            resizeMode="contain"
          />
          <Gap height={10} />
          <Text style={styles.scanInstructionText}>
            Posisikan wajah Anda di tengah bingkai.
          </Text>
          <Text style={styles.scanInstructionText}>
            Pastikan pencahayaan cukup.
          </Text>
        </View>

        <Gap height={40} />

        {/* --- Pilihan Kategori Absensi --- */}
        <Text style={styles.sectionTitle}>Pilih Kategori Absensi</Text>
        <Gap height={10} />

        <View style={styles.categoryContainer}>
          {categories.map(cat => (
            <CategoryButton
              key={cat}
              label={cat}
              isSelected={selectedCategory === cat}
              onPress={() => setSelectedCategory(cat)}
            />
          ))}
        </View>

        <Text style={styles.instructionText}>
          Pilih salah satu kategori di atas untuk melanjutkan proses absensi.
        </Text>
      </View>

      {/* --- Tombol Aksi Utama --- */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleAbsen}
          activeOpacity={0.9}
        >
          <Text style={styles.actionButtonText}>
            Absensi Sekarang ({selectedCategory})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_GREY,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.TEXT_DARK,
  },
  scanArea: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.45,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  scanInstructionText: {
    fontSize: 14,
    color: COLORS.DARK_GREY,
    textAlign: 'center',
    marginBottom: 5,
  },
  scanImage: {
    width: '50%',
    height: '50%',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 13,
    color: COLORS.DARK_GREY,
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    padding: 20,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  actionButton: {
    backgroundColor: COLORS.ACCENT,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.ACCENT,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  actionButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 17,
    fontWeight: '800',
  },
});
