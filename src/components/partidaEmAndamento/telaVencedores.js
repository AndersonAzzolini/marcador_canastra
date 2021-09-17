import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import Cores from '../../assets/cores.json'
import Button from '../button';
const TelaVencedores = ({ vencedor, perdedor, pontosVencedor, pontosPerdedor, btnRecomecarPartida, btnNovaPartida }) => {

  return (

    <View style={styles.viewFimPartida}>
      <View >
        <View style={styles.viewVencedorEPerdedor}>
          <Text style={styles.textVencedor}>Grande vencedor: {vencedor} </Text>
          <Text style={[styles.textBold, styles.textCenter]}>Total de pontos: {pontosVencedor}</Text>
          <Divider style={[styles.divider, styles.dividerVencedores]} />
          <Text style={styles.textPerdedor}>Grande perdedor: {perdedor} </Text>
          <Text style={[styles.textBold, styles.textCenter]}>Total de pontos: {pontosPerdedor}</Text>
        </View>
        <View style={styles.viewBotoesRecomecar}>
          <Button
            style={styles.botao}
            onPress={btnRecomecarPartida}
            text='Recomeçar está partida' />
          <Button
            style={styles.botao}
            onPress={btnNovaPartida}
            text='Criar outra' />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewFimPartida: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  viewBotoesRecomecar: {
    justifyContent: 'space-evenly',
    marginBottom: 15,
    marginTop: 40
  },
  viewVencedorEPerdedor: {
    flex: 1,
    justifyContent: 'center',
  },
  textVencedor: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
    color: Cores.verdeEscuro
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 16
  },
  textCenter: {
    textAlign: 'center'
  },
  textPerdedor: {
    color: '#FA5A46',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  divider: {
    backgroundColor: 'black',
  },
  dividerVencedores: {
    marginVertical: 30,
  },
  botao: {
    borderRadius: 10,
    minHeight: 50,
    marginHorizontal: 5
  },

})

export default TelaVencedores;
