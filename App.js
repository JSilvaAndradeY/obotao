
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => { }}
        activeOpacity={0.7}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  botao: {
    width: 200,
    height: 100,
    backgroundColor: '#355ee5ff',
    borderRadius: 15,
  },
});
