import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Добре дошли в приложението!</Text>
      <Button title="Карта" onPress={() => navigation.navigate('Map')} />
      <Button title="Настройки" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}
