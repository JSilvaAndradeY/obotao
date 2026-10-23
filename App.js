import React, { useRef, useState } from 'react';
import {Animated, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

const FRASES = [
  'SAI FORA!',
  'ME DEIXA!',
  'VOCÊ DE NOVO?!',
  'PARA DE ME TOCAR!',
  'CHEGA!',
  'JÁ DISSE QUE NÃO!',
  'TÁ DE BRINCADEIRA?',
  'PARA SEU PORRAAA!',
  'MAS TU É UM FDP MESMO HEIM!',
  'VAI DORMIR, INFERO!',
  'PARA CARALHO!',
  'NÃO ME CLICA MAIS!',
  'VAI SE FODER!',
  'NÃO ME CLICA, PORRA!',
  'NÃO ME CLICA, SEU FDP!',
  'NÃO ME CLICA, SEU MERDA!'
];

// Quanto mais cliques, mais bravo o botão fica.
const HUMORES = [
  { minCliques: 0, rosto: '😒', cor: '#FF8A5B', borda: '#C75630' },
  { minCliques: 3, rosto: '😠', cor: '#F2433A', borda: '#A32722' },
  { minCliques: 7, rosto: '🤬', cor: '#C8102E', borda: '#780A1B' },
];

const humorPara = (cliques) =>
  [...HUMORES].reverse().find((h) => cliques >= h.minCliques);

export default function App() {
  const [cliques, setCliques] = useState(0);
  const [frase, setFrase] = useState('NÃO ME CLICA');

  const x = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(0)).current;
  const giro = useRef(new Animated.Value(0)).current;
  const escala = useRef(new Animated.Value(1)).current;

  const humor = humorPara(cliques);

  const fugirEXingar = () => {
    setCliques((c) => c + 1);

    // escolhe uma frase diferente da atual
    let nova = frase;
    while (nova === frase) {
      nova = FRASES[Math.floor(Math.random() * FRASES.length)];
    }
    setFrase(nova);

    Animated.parallel([
      Animated.spring(x, {
        toValue: (Math.random() - 0.5) * 220,
        friction: 5,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.spring(y, {
        toValue: (Math.random() - 0.5) * 320,
        friction: 5,
        tension: 120,
        useNativeDriver: true,
      }),
      // tremidinha de raiva
      Animated.sequence([
        Animated.timing(giro, { toValue: 1, duration: 60, useNativeDriver: true }),
        Animated.timing(giro, { toValue: -1, duration: 90, useNativeDriver: true }),
        Animated.timing(giro, { toValue: 0.5, duration: 70, useNativeDriver: true }),
        Animated.timing(giro, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(escala, { toValue: 0.88, duration: 70, useNativeDriver: true }),
        Animated.spring(escala, { toValue: 1, friction: 4, useNativeDriver: true }),
      ]),
    ]).start();
  };

  const rotacao = giro.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-8deg', '8deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#16132B" />

      <View style={styles.topo}>
        <Text style={styles.titulo}>Botão rabugento</Text>
        <Text style={styles.subtitulo}>Tente clicar. Ele não gosta.</Text>
      </View>

      <View style={styles.palco}>
        <Animated.View
          style={{
            transform: [
              { translateX: x },
              { translateY: y },
              { rotate: rotacao },
              { scale: escala },
            ],
          }}
        >
          <Pressable
            onPress={fugirEXingar}
            style={({ pressed }) => [
              styles.botao,
              {
                backgroundColor: humor.cor,
                borderBottomColor: humor.borda,
                borderBottomWidth: pressed ? 2 : 8,
                marginTop: pressed ? 6 : 0,
              },
            ]}
          >
            <Text style={styles.rosto}>{humor.rosto}</Text>
            <Text style={styles.textoBotao}>{frase}</Text>
          </Pressable>
        </Animated.View>
      </View>

      <View style={styles.rodape}>
        <Text style={styles.contador}>{cliques}</Text>
        <Text style={styles.contadorLabel}>
          {cliques === 1 ? 'clique' : 'cliques'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16132B',
  },
  topo: {
    paddingTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  titulo: {
    color: '#F5F1FF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  subtitulo: {
    color: '#9B94C4',
    fontSize: 15,
    marginTop: 6,
  },
  palco: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao: {
    width: 240,
    paddingVertical: 22,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  rosto: {
    fontSize: 40,
    marginBottom: 6,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  rodape: {
    alignItems: 'center',
    paddingBottom: 36,
  },
  contador: {
    color: '#F5F1FF',
    fontSize: 44,
    fontWeight: '800',
  },
  contadorLabel: {
    color: '#9B94C4',
    fontSize: 15,
    marginTop: 2,
  },
});