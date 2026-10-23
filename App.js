
import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const cores = ['#E53935' , '#1E88E5' , '#43A047' , '#FDD835' , '#8E24AA' , '#FB8C00'];

export default function App() {
  const [piscando, setPiscando] = useState(false);
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (!piscando) {
      setIndice(0);
      return;
    }
    const id = setInterval(() => {
      setIndice((atual) => (atual + 1) % cores.length);
    }, 300);
    return () => clearInterval(id);
  }, [piscando]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.botao, {
          backgroundColor: cores[indice] }]}
        
        onPress={() => setPiscando(!piscando)}
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
    backgroundColor: '#E53935',
    borderRadius: 15,
  },
});
