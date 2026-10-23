
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
} from 'react-native';

export default function App() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [pagina, setPagina] = useState('Inicio');

  const abrirYouTube = () => {
    Linking.openURL('https://youtube.com');
  };

  const abrirPagina = (nome) => {
    setPagina(nome);""
    setMenuAberto(false);
  };

  const conteudo = {
    Historia: {
      titulo: 'A história do YouTube',
      texto:
        'O YouTube foi criado em fevereiro de 2005 por Chad Hurley, Steve Chen e Jawed Karim. A ideia era facilitar o compartilhamento de vídeos pela internet. Em novembro de 2006, a plataforma foi adquirida pelo Google e cresceu até se tornar uma das maiores plataformas de vídeos do mundo.',
    },
    Servicos: {
      titulo: 'Para que o YouTube serve?',
      texto:
        'O YouTube serve para assistir, publicar e compartilhar vídeos. Ele é utilizado para aprender, ouvir músicas, acompanhar notícias, assistir a entretenimento, fazer transmissões ao vivo e compartilhar conhecimentos com pessoas do mundo inteiro.',
    },
    Desenvolvedores: {
      titulo: 'Desenvolvedores',
      texto:
        'Este projeto foi desenvolvido por:\n\n• Alanis\n• Andre\n• Anna Clara\n• Davi',
    },
  };

  return (
    <View style={styles.container}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuBotao}
          onPress={() => setMenuAberto(!menuAberto)}
        >
          <Text style={styles.menuIcone}>☰</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitulo}>YouTube</Text>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.conteudo}>
        {pagina === 'Inicio' ? (
          <View style={styles.inicio}>
            <Text style={styles.subtitulo}>
              Bem-vindo ao YouTube!
            </Text>

            <TouchableOpacity
              style={styles.botao}
              onPress={abrirYouTube}
              activeOpacity={1}
            >
              <View style={styles.play} />
            </TouchableOpacity>

            <Text style={styles.instrucao}>
              Toque no botão para abrir o YouTube
            </Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.pagina}>
            <TouchableOpacity
              onPress={() => setPagina('Inicio')}
              style={styles.voltarBotao}
            >
              <Text style={styles.voltarTexto}>
                ← Voltar ao início
              </Text>
            </TouchableOpacity>

            <Text style={styles.tituloPagina}>
              {conteudo[pagina].titulo}
            </Text>

            <View style={styles.linha} />

            <Text style={styles.textoPagina}>
              {conteudo[pagina].texto}
            </Text>
          </ScrollView>
        )}
      </View>

      {/* FUNDO ESCURO */}
      {menuAberto && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.fundoEscuro}
          onPress={() => setMenuAberto(false)}
        />
      )}

      {/* MENU LATERAL */}
      <View
        pointerEvents={menuAberto ? 'auto' : 'none'}
        style={[
          styles.menuLateral,
          {
            transform: [
              { translateX: menuAberto ? 0 : -280 },
            ],
          },
        ]}
      >
        <View style={styles.menuCabecalho}>
          <Text style={styles.menuLogo}>▶ YouTube</Text>
          <Text style={styles.menuDescricao}>
            Conheça nossa história
          </Text>
        </View>

        <TouchableOpacity
          style={styles.itemMenu}
          onPress={() => abrirPagina('Historia')}
        >
          <Text style={styles.itemIcone}>◷</Text>
          <Text style={styles.itemTexto}>História</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemMenu}
          onPress={() => abrirPagina('Servicos')}
        >
          <Text style={styles.itemIcone}>▶</Text>
          <Text style={styles.itemTexto}>
            Para que ele serve
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemMenu}
          onPress={() => abrirPagina('Desenvolvedores')}
        >
          <Text style={styles.itemIcone}>👥</Text>
          <Text style={styles.itemTexto}>Desenvolvedores</Text>
        </TouchableOpacity>

        <View style={styles.rodape}>
          <Text style={styles.rodapeTexto}>
            Projeto educativo • 2026
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    zIndex: 1,
  },

  menuBotao: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuIcone: {
    fontSize: 28,
    color: '#222222',
  },

  headerTitulo: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#E53935',
    marginLeft: 8,
  },

  conteudo: {
    flex: 1,
  },

  inicio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  subtitulo: {
    fontSize: 22,
    color: '#222222',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  botao: {
    width: 200,
    height: 100,
    backgroundColor: '#355ee5ff',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  play: {
    width: 0,
    height: 0,
    borderTopWidth: 20,
    borderBottomWidth: 20,
    borderLeftWidth: 32,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#FFFFFF',
    marginLeft: 7,
  },

  instrucao: {
    color: '#777777',
    fontSize: 14,
    marginTop: 22,
    textAlign: 'center',
  },

  fundoEscuro: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 2,
  },

  menuLateral: {
    position: 'absolute',
    top: 60,
    bottom: 0,
    left: 0,
    width: 280,
    backgroundColor: '#E53935',
    zIndex: 3,
    elevation: 12,
  },

  menuCabecalho: {
    padding: 22,
    paddingTop: 28,
    paddingBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.25)',
  },

  menuLogo: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },

  menuDescricao: {
    color: '#FFECEC',
    fontSize: 13,
    marginTop: 8,
  },

  itemMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 19,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.13)',
  },

  itemIcone: {
    color: '#FFFFFF',
    fontSize: 21,
    width: 38,
  },

  itemTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },

  rodape: {
    marginTop: 'auto',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.25)',
  },

  rodapeTexto: {
    color: '#FFECEC',
    fontSize: 12,
  },

  pagina: {
    padding: 25,
    paddingBottom: 40,
  },

  voltarBotao: {
    paddingVertical: 12,
    marginBottom: 18,
    alignSelf: 'flex-start',
  },

  voltarTexto: {
    color: '#E53935',
    fontSize: 15,
    fontWeight: 'bold',
  },

  tituloPagina: {
    fontSize: 28,
    lineHeight: 36,
    color: '#222222',
    fontWeight: 'bold',
  },

  linha: {
    width: 65,
    height: 5,
    backgroundColor: '#E53935',
    borderRadius: 3,
    marginTop: 18,
    marginBottom: 24,
  },

  textoPagina: {
    color: '#444444',
    fontSize: 17,
    lineHeight: 29,
  },
});
