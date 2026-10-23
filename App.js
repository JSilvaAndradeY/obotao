import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function App() {
  const [numero, setNumero] = useState(null);
  const [descobertas, setDescobertas] = useState([]);
  const [mostrarLista, setMostrarLista] = useState(false);

  const curiosidades = [
    '🐙 O polvo tem três corações!',
    '🌎 A Terra não é uma esfera perfeita.',
    '🦈 Os tubarões existem há milhões de anos.',
    '🚀 O som não se propaga no vácuo do espaço.',
    '🍯 O mel pode durar milhares de anos quando bem armazenado.',
    '🧠 O cérebro humano possui bilhões de neurônios.',
    '⚡ Um raio pode ser mais quente que a superfície do Sol.',
    '🐝 As abelhas conseguem reconhecer padrões e rostos.',
    '🌙 A Lua se afasta da Terra alguns centímetros por ano.',
    '🦒 As girafas têm sete vértebras no pescoço, assim como os humanos.'
  ];

  function descobrirCuriosidade() {
    let sorteado;

    do {
      sorteado = Math.floor(
        Math.random() * curiosidades.length
      );
    } while (
      curiosidades.length > 1 &&
      sorteado === numero
    );

    setNumero(sorteado);

    if (!descobertas.includes(sorteado)) {
      setDescobertas([...descobertas, sorteado]);
    }

    setMostrarLista(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>💡</Text>

      <Text style={styles.titulo}>MUNDO DAS</Text>
      <Text style={styles.subtitulo}>CURIOSIDADES</Text>

      <Text style={styles.descricao}>
        Descubra fatos incríveis que você provavelmente não sabia!
      </Text>

      <View style={styles.cartao}>
        <Text style={styles.numero}>
          {descobertas.length}
        </Text>
        <Text style={styles.textoCartao}>
          curiosidades diferentes descobertas
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botaoArea}
        onPress={descobrirCuriosidade}
        activeOpacity={0.8}
      >
        <View style={styles.sombraBotao} />
        <View style={styles.botao}>
          <Text style={styles.textoBotao}>
            ✨ DESCOBRIR
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoLista}
        onPress={() => setMostrarLista(!mostrarLista)}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotaoLista}>
          📚 MINHAS DESCOBERTAS
        </Text>
      </TouchableOpacity>

      {numero !== null && !mostrarLista && (
        <View style={styles.cartaoCuriosidade}>
          <Text style={styles.tituloCuriosidade}>
            💡 Você sabia?
          </Text>
          <Text style={styles.textoCuriosidade}>
            {curiosidades[numero]}
          </Text>
        </View>
      )}

      {mostrarLista && (
        <View style={styles.cartaoCuriosidade}>
          <Text style={styles.tituloCuriosidade}>
            📚 Minhas descobertas
          </Text>

          <Text style={styles.textoCuriosidade}>
            Você descobriu {descobertas.length} de {curiosidades.length} curiosidades!
          </Text>

          <ScrollView style={styles.lista}>
            {descobertas.length === 0 ? (
              <Text style={styles.textoCuriosidade}>
                Você ainda não descobriu nenhuma. Aperte o botão Descobrir!
              </Text>
            ) : (
              descobertas.map((item, index) => (
                <Text key={item} style={styles.itemLista}>
                  {index + 1}. {curiosidades[item]}
                </Text>
              ))
            )}
          </ScrollView>
        </View>
      )}

      <Text style={styles.rodape}>
        Toque nos botões e surpreenda-se!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10172A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 45,
    marginBottom: 8,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: '900',
    letterSpacing: 2,
  },
  subtitulo: {
    color: '#38E8D0',
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 4,
  },
  descricao: {
    color: '#C5CEE0',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22,
  },
  cartao: {
    backgroundColor: '#1D2942',
    width: '100%',
    borderRadius: 18,
    padding: 15,
    alignItems: 'center',
    marginTop: 22,
    borderWidth: 1,
    borderColor: '#344565',
  },
  numero: {
    color: '#38E8D0',
    fontSize: 36,
    fontWeight: 'bold',
  },
  textoCartao: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  botaoArea: {
    width: 230,
    height: 62,
    marginTop: 28,
  },
  sombraBotao: {
    position: 'absolute',
    top: 7,
    width: '100%',
    height: 55,
    backgroundColor: '#087C78',
    borderRadius: 16,
  },
  botao: {
    width: '100%',
    height: 55,
    backgroundColor: '#38E8D0',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#8FFFF0',
  },
  textoBotao: {
    color: '#10172A',
    fontSize: 18,
    fontWeight: '900',
  },
  botaoLista: {
    width: 230,
    padding: 14,
    marginTop: 18,
    backgroundColor: '#8B5CF6',
    borderRadius: 14,
    alignItems: 'center',
  },
  textoBotaoLista: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartaoCuriosidade: {
    marginTop: 20,
    padding: 16,
    width: '100%',
    backgroundColor: '#1D2942',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#38E8D0',
    alignItems: 'center',
  },
  tituloCuriosidade: {
    color: '#38E8D0',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  textoCuriosidade: {
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 23,
  },
  lista: {
    width: '100%',
    maxHeight: 150,
  },
  itemLista: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 22,
    marginVertical: 5,
  },
  rodape: {
    color: '#8997B1',
    fontSize: 12,
    marginTop: 20,
    textAlign: 'center',
  },
});