import React, { useEffect, useState } from 'react'
import {
  View,
  ScrollView,
  Text,
  Alert
} from 'react-native'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { styles } from './styles/novaPartida'
import Input from '../components/input'
import Button from '../components/button'
import { insereEquipes } from '../db/equipes'
import { insereNomePartida } from '../db/partida'
import Loader from '../components/loader'
import { inserePontos, selecionaPontos } from '../db/pontos'
import BannerComponent from '../components/banner'
import AsyncStorage from '@react-native-async-storage/async-storage';

const NovaPartida = ({ navigation }) => {

  const [nomeEquipe1, setNomeEquipe1] = useState('')
  const [nomeEquipe2, setNomeEquipe2] = useState('')
  const [loading, setLoading] = useState(false)
  const [banner, setBanner] = useState(true)

  useEffect(() => {
    verificaBanner()
  })
  const SchemaNovaPartida = Yup.object().shape({
    nomePartida: Yup.string().required('Campo obrigatório!'),
    pontos: Yup.number('')
      .positive('O campo de ver somente números')
      .required('Campo obrigatório!')
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
  } = useFormik({
    validationSchema: SchemaNovaPartida,
    initialValues: {
      nomePartida: '',
      pontos: ''
    },
    onSubmit: () => criaPartida(values.nomePartida)
  })

  const criaPartida = async () => {
    try {
      setLoading(true)
      let idPartida = await insereNomePartida(values.nomePartida, values.pontos)
      const [idEquipe1, idEquipe2] = await Promise.all([
        insereEquipes(nomeEquipe1 || 'Equipe 1', idPartida),
        insereEquipes(nomeEquipe2 || 'Equipe 2', idPartida)
      ])
      Promise.all([
        inserePontos(idEquipe1, 0, idPartida),
        inserePontos(idEquipe2, 0, idPartida)
      ])
      let informacoesPartida = await selecionaPontos(idPartida)
      let pontosEquipe1 = [{ pontos: 0 }]
      let pontosEquipe2 = [{ pontos: 0 }]
      informacoesPartida.length > 0 ?
        navigation.replace("Partida em Andamento", { informacoesPartida, pontosEquipe1, pontosEquipe2, idPartida })
        :
        Alert.alert(
          'Erro',
          'Problema ao criar partida..'
        )
    } catch (e) {
      console.log(e)

    } finally {
      setLoading(false)
    }
  }

  const naoMostraBanner = async () => {
    try {
      await AsyncStorage.setItem(
        'bannerVisible', '1')
      setBanner(false)
    } catch (e) {
      console.log(e);
    }
  }

  const verificaBanner = async () => {
    const value = await AsyncStorage.getItem('bannerVisible')
    JSON.parse(value) == '1' ? setBanner(false) : null
  }

  return (
    <>
      <Loader
        visible={loading}
        text='Criando partida... aguarde'
      />
      {banner &&
        <BannerComponent
          text='A partida é salva automaticamente, não se preocupe com isso :)'
          labelTextoCancelar='Não mostrar novamente'
          onPressCancelar={() => naoMostraBanner()}
          onPressConfirmar={() => setBanner(false)}
          visible={banner}
        />}
      <ScrollView contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps='handled'
      >

        <View style={styles.viewInputs}>
          <Text style={styles.textBold}>Campos obrigatórios marcados com *</Text>
          <Text>Nome da partida *:</Text>
          <Input
            onChangeText={handleChange('nomePartida')}
            keyboardType='phone-pad'
            placeholder='Digite o nome da partida'
            onBlur={handleBlur('nomePartida')}
            value={values.nomePartida}
            touched={touched.nomePartida}
            error={errors.nomePartida}
          />
          {errors.nomePartida && touched.nomePartida ? (
            <Text style={styles.textErros}>{errors.nomePartida}</Text>
          ) : null}

          <Text style={{ marginTop: 5 }}>Primeira equipe:</Text>
          <Input
            onChangeText={(text) => setNomeEquipe1(text)}
            value={nomeEquipe1}
            placeholder='Equipe 1' />
        </View>
        <View style={styles.viewInputs}>
          <Text>Segunda equipe:</Text>
          <Input
            value={nomeEquipe2}
            onChangeText={(text) => setNomeEquipe2(text)}
            placeholder='Equipe 2' />
        </View>
        <View style={styles.viewInputs}>
          <Text>Pontos máximos *:</Text>
          <Input
            onChangeText={handleChange('pontos')}
            keyboardType='phone-pad'
            placeholder='Digite a pontuação máxima da partida'
            onBlur={handleBlur('pontos')}
            value={values.pontos}
            touched={touched.pontos}
            error={errors.pontos}
          />
          {
            errors.pontos &&
            <Text style={styles.textErros}>{errors.pontos}</Text>
          }
        </View>
        <View style={styles.viewBotoes}>
          <Button
            onPress={handleSubmit}
            text='Criar partida' />
        </View>
      </ScrollView >
    </>
  )
}

export default NovaPartida