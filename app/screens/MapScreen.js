import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert, Button, Platform, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';


export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ако сме в уеб режим, директно показваме съобщението и SOS бутона
  if (Platform.OS === 'web') {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          Картата не се поддържа в уеб режим. Използвайте мобилно устройство за пълна функционалност.
        </Text>
      </View>
    );
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Грешка', 'Нужни са разрешения за достъп до локация!');
        setLoading(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setLoading(false);
      Speech.speak('Вие сте на картата. Вашата позиция е отбелязана. За спешна помощ натиснете бутона SOS.', { language: 'bg-BG' });
    })();
  }, []);


  const handleSOS = () => {
    Speech.speak('Извиквате спешна помощ! Моля, изчакайте.', { language: 'bg-BG' });
    // Тук може да добавите реално изпращане на сигнал или друго действие
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }


  if (!location) {
    return (
      <View style={styles.center}>
        <Alert title="Грешка" message="Не може да се определи локацията." />
        <Button title="SOS" onPress={handleSOS} color="#d32f2f" />
      </View>
    );
  }



  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title="Вашата позиция"
        />
      </MapView>
      <View style={styles.sosButton}>
        <Button title="SOS" onPress={handleSOS} color="#d32f2f" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 200,
  },
});
