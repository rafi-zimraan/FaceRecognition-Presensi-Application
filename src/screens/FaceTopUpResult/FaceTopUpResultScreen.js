import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../utils';

export default function FaceTopUpResultScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    matched = false,
    confidence = 0.0,
    user_data = {
      name: 'Pengguna Tidak Dikenal',
      user_id: null,
      image_url: null,
    },
  } = route.params || {};

  const statusInfo = useMemo(() => {
    if (matched) {
      return {
        icon: 'check-circle',
        color: COLORS.SUCCESS,
        title: 'Absensi Berhasil!',
        message: `${user_data.name} terverifikasi.`,
      };
    } else {
      return {
        icon: 'close-circle',
        color: COLORS.PRIMARY,
        title: 'Verifikasi Gagal!',
        message: 'Wajah tidak cocok atau data tidak ditemukan.',
      };
    }
  }, [matched, user_data.name]);

  const formattedConfidence = `${(confidence * 100).toFixed(1)}%`;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: statusInfo.color }]}>
        <Icon name={statusInfo.icon} size={80} color={COLORS.LIGHT_GREY} />
        <Text style={styles.headerTitle}>{statusInfo.title}</Text>
      </View>

      <View style={styles.body}>
        {user_data.image_url && (
          <Image
            source={{ uri: user_data.image_url }}
            style={styles.profileImage}
          />
        )}

        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Nama Pengguna:</Text>
          <Text style={styles.detailValue}>{user_data.name}</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Tingkat Kepercayaan:</Text>
          <Text
            style={[
              styles.detailValue,
              { color: matched ? COLORS.SUCCESS : COLORS.DANGER },
            ]}
          >
            {formattedConfidence}
          </Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Pesan Sistem:</Text>
          <Text style={styles.detailValue}>{statusInfo.message}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.buttonText}>Kembali ke Beranda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.LIGHT_GREY,
    marginTop: 10,
  },
  body: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: COLORS.PRIMARY,
  },
  detailCard: {
    width: '100%',
    padding: 15,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.PRIMARY,
  },
  detailTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEXT_DARK,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.LIGHT_GREY,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
