import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { COLORS } from '../../utils';

export default function FaceCaptureScreen({ navigation, route }) {
  const cameraRef = useRef(null);
  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();
  const [isLoading, setIsLoading] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isFaceValid, setIsFaceValid] = useState(false);
  const [faceDetectionMessage, setFaceDetectionMessage] =
    useState('Memuat kamera...');

  const user_id = route.params?.user_id || 999;
  const user_name = route.params?.user_name || 'Rafi';

  const device = useCameraDevice('front');

  React.useEffect(() => {
    if (!hasCameraPermission) {
      requestCameraPermission();
    }
  }, [hasCameraPermission, requestCameraPermission]);

  const captureFace = useCallback(async () => {
    if (isLoading || isCapturing) return;

    if (!isFaceValid) {
      Alert.alert(
        'Gagal',
        'Wajah belum terdeteksi atau kualitas foto belum memenuhi syarat.',
      );
      return;
    }

    if (cameraRef.current == null) {
      Alert.alert('Error', 'Kamera belum siap.');
      return;
    }

    setIsCapturing(true);

    try {
      const photo = await cameraRef.current.takePhoto({
        quality: 85,
        skipMetadata: true,
      });

      setIsCapturing(false);

      const imagePath = `file://${photo.path}`;

      handleSimulatedApiSend(imagePath);
    } catch (error) {
      console.error('Capture Error:', error);
      Alert.alert('Error Capture', 'Gagal mengambil foto.');
      setIsCapturing(false);
    }
  }, [isLoading, isCapturing, isFaceValid]);

  const handleSimulatedApiSend = async imagePath => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    Alert.alert(
      'Foto Berhasil Diambil!',
      `Path Sementara: ${imagePath}\n\nStatus: Siap dikirim ke POST /face/register.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );

    setIsLoading(false);
  };

  if (!hasCameraPermission || device == null) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Icon name="camera-off" size={60} color={COLORS.DANGER} />
        <Text style={styles.permissionText}>
          Akses kamera dibutuhkan untuk registrasi wajah.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={requestCameraPermission}
        >
          <Text style={styles.buttonText}>Izinkan Akses Kamera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => Linking.openSettings()}
        >
          <Text style={styles.secondaryButtonText}>
            Buka Pengaturan Aplikasi
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrasi Wajah untuk {user_name}</Text>

      <View style={styles.cameraFrame}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />

        <View style={styles.overlayGuide}>
          <Icon
            name="face-recognition"
            size={80}
            color={COLORS.LIGHT_GREY}
            style={{ opacity: 0.7 }}
          />
        </View>

        {isCapturing && (
          <ActivityIndicator
            size="large"
            color={COLORS.LIGHT_GREY}
            style={styles.overlayLoader}
          />
        )}
      </View>

      <View style={styles.statusBox}>
        <Icon
          name={isFaceValid ? 'check-circle' : 'alert-circle'}
          size={20}
          color={isFaceValid ? COLORS.SUCCESS : COLORS.DANGER}
        />
        <Text
          style={[
            styles.statusText,
            { color: isFaceValid ? COLORS.SUCCESS : COLORS.DANGER },
          ]}
        >
          {isFaceValid
            ? 'Wajah Terdeteksi Jelas (Simulasi)'
            : 'Posisikan Wajah dengan Baik (Simulasi)'}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.captureButton,
          (isLoading || isCapturing || !isFaceValid) && styles.disabledButton,
        ]}
        onPress={captureFace}
        disabled={isLoading || isCapturing || !isFaceValid}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.LIGHT_GREY} />
        ) : (
          <Icon name="camera" size={30} color={COLORS.LIGHT_GREY} />
        )}
        <Text style={styles.captureButtonText}>
          {isLoading ? 'Memproses...' : 'Ambil Foto Wajah'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.noteText}>
        Pastikan wajah terlihat jelas, tanpa kacamata gelap atau masker.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
  },
  centerContent: {
    justifyContent: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: COLORS.TEXT_DARK,
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButton: {
    marginTop: 10,
  },
  secondaryButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 14,
  },
  buttonText: {
    color: COLORS.LIGHT_GREY,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.TEXT_DARK,
    marginBottom: 20,
  },
  cameraFrame: {
    width: '100%',
    height: 400,
    backgroundColor: '#000',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayGuide: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
    borderRadius: 200,
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayLoader: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    borderRadius: 10,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GREY,
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
  },
  statusText: {
    marginLeft: 10,
    fontWeight: '600',
  },
  captureButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    elevation: 3,
  },
  captureButtonText: {
    color: COLORS.LIGHT_GREY,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  noteText: {
    fontSize: 12,
    color: '#666',
    marginTop: 15,
    textAlign: 'center',
  },
});
