import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import Input from '../input';
import Button from '../button';


const ComponenteInputEBotoes = ({ disableBtn1,
  disableBtn2,
  btnAddPontosEquipe2,
  btnAddPontosEquipe1,
  inputPontosEquipe1,
  inputPontosEquipe2,
  btnRemovePontosEquipe2,
  btnRemovePontosEquipe1,
  onChangeText1,
  onChangeText2}) => {

  return (
    <View style={styles.viewBotoesEInputs}>
      <View style={styles.viewBotoesAdicionarERemover}>
        <View style={styles.input}>
          <Input
            keyboardType='phone-pad'
            value={inputPontosEquipe1}
            onChangeText={onChangeText1}
            placeholder='Pontos a adicionar' />
        </View>
        <Button
          disabled={disableBtn1}
          text='Adicionar ponto'
          onPress={btnAddPontosEquipe1}
          style={styles.botao}
        />
        <Button
          disabled={disableBtn1}
          onPress={btnRemovePontosEquipe1}
          text='Remover ponto'
          style={[styles.botao, styles.botaoExcluir]}
        />
      </View>
      <View style={styles.viewBotoesAdicionarERemover}>
        <View style={styles.input}>
          <Input
            keyboardType='phone-pad'
            value={inputPontosEquipe2}
            onChangeText={onChangeText2}
            placeholder='Pontos a adicionar' />
        </View>
        <Button
          disabled={disableBtn2}
          text='Adicionar ponto'
          onPress={btnAddPontosEquipe2}
          style={styles.botao}
        />
        <Button
          disabled={disableBtn2}
          text='Remover ponto'
          onPress={btnRemovePontosEquipe2}
          style={[styles.botao, styles.botaoExcluir]}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewBotoesEInputs: {
    flex: 1,
    flexDirection: 'row'
  },
  viewBotoesAdicionarERemover: {
    flex: 1
  },
  input: {
    marginHorizontal: 5
  },
  botao: {
    borderRadius: 10,
    minHeight: 50,
    marginHorizontal: 5
  },
  botaoExcluir: {
    backgroundColor: '#FA5A46',
    minHeight: 50,
  },


})

export default ComponenteInputEBotoes;
