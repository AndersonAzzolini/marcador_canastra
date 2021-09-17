import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Divider } from 'react-native-paper';

const ComponentePontos = ({ arrayPontosEquipe1, arrayPontosEquipe2, nomeEquipe1, nomeEquipe2, totalPontosEquipe1, totalPontosEquipe2 }) => {

  return (
    <View style={styles.viewPontos}>
      <View >
        <Text style={[styles.text, styles.textEquipes]}>
          {nomeEquipe1}
        </Text>
        {arrayPontosEquipe1.map((index => {
          return <Text style={styles.text}>
            {index.pontos}
          </Text>
        }))}
        <View style={styles.viewPontosTotal}>
          <Divider
            style={styles.divider} />
          <Text style={styles.textTotal}>{totalPontosEquipe1}</Text>
        </View>
      </View>
      <View >
        <Text style={[styles.text, styles.textEquipes]}>
          {nomeEquipe2}
        </Text>
        {arrayPontosEquipe2.map((index => {
          return (
            <Text style={styles.text}>
              {index.pontos}
            </Text>
          )
        }))}
        <View style={styles.viewPontosTotal}>
          <Divider
            style={styles.divider} />
          <Text style={styles.textTotal}>{totalPontosEquipe2}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewPontos: {
    flex: 1,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewPontosTotal: {
    maxWidth: Dimensions.get('window').width * 0.4,
    paddingTop: 15,
    justifyContent: 'flex-start'
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textEquipes: {
    maxWidth: Dimensions.get('window').width * 0.4,
    marginBottom: 15
  },
  textTotal: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#36D948'
  },
  divider: {
    borderWidth: 1,
    width: 85
  },

})

export default ComponentePontos;
