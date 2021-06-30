/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  SectionList,
  Alert,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import styled from 'styled-components/native';

import { WeatherCard, Header, CitySearch } from '../../components';

import api from '../../services/api';
import { API_KEY } from '@env';

export const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [citySearched, setCitySearched] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const listRef = useRef();

  const showAlertByType = (type, err) =>
    type === 'permission'
      ? Alert.alert(
        'Error',
        'There was an error with the location permission. Restart the app to request again',
        [{ text: 'OK', onPress: () => console.log(err) }],
      )
      : Alert.alert(
        'Something went wrong',
        "Something wrong is not right, check your internet connection and try the request again. If that doesn't work, restart the app.",
        [{ text: 'OK', onPress: () => console.log(err) }],
      );

  const getWeatherInfoByCity = () => {
    setLoading(true);
    api
      .get(`weather?units=metric&lang=pt_br&q=${citySearched}&appid=${API_KEY}`)
      .then(({ data }) => {
        setWeatherData([
          ...weatherData,
          { ...data, uuid: weatherData.length, expanded: false },
        ]);
        setCitySearched('');
      })
      .catch(err => showAlertByType('request', err))
      .finally(() => setLoading(false));
  };

  const getWeatherInfoByGeoCoordinates = async () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      info =>
        api
          .get(
            `weather?units=metric&lang=pt_br&lat=${info.coords.latitude}&lon=${info.coords.latitude}&appid=${API_KEY}`,
          )
          .then(({ data }) => {
            setWeatherData([
              ...weatherData,
              { ...data, uuid: weatherData.length, expanded: false },
            ]);
          })
          .catch(err => showAlertByType('request', err))
          .finally(() => setLoading(false)),
      err => showAlertByType('request', err),
    );
  };

  const onExpandItem = uuid => {
    const i = weatherData.findIndex(item => item.uuid === uuid);
    const lastIndex = weatherData.length - 1;
    setWeatherData(
      weatherData.map((item, index) =>
        index === i && lastIndex !== i
          ? { ...item, expanded: !item.expanded }
          : { ...item, expanded: false },
      ),
    );
  };

  const requestAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de Acesso à Localização',
          message: 'Este aplicativo precisa acessar sua localização.',
          buttonNeutral: 'Pergunte-me depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getWeatherInfoByGeoCoordinates();
      } else {
        showAlertByType('permission');
      }
    } catch (err) {
      showAlertByType('permission', err);
    }
  };

  const requestPermission = () => {
    if (Platform.OS === 'android') {
      requestAndroidPermission();
    } else {
      Geolocation.requestAuthorization();
    }
  };


  const sectionData = useMemo(
    () => [
      {
        title: 'Current location',
        data:
          weatherData?.length > 0
            ? [{ ...weatherData[weatherData.length - 1], expanded: true }]
            : [],
      },
      {
        title: 'History',
        data: weatherData?.slice(0, weatherData.length - 1).reverse() || [],
      },
    ],
    [weatherData],
  );

  useEffect(() => {
    if (weatherData.length === 0) {
      getWeatherInfoByGeoCoordinates();
    }
  }, [weatherData]);

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <Container>
      <Header
        onRightPress={() => setVisible(true)}
        onLeftPress={() => setWeatherData([])}
      />
      <SectionList
        sections={sectionData}
        ref={listRef}
        keyExtractor={(item, index) => index}
        renderSectionHeader={({ section: { title } }) => (
          <SectionTitle>{title}</SectionTitle>
        )}
        refreshing={loading}
        onRefresh={() => getWeatherInfoByGeoCoordinates()}
        renderItem={({ item, index }) => (
          <WeatherCard
            data={item}
            onPressItem={() => onExpandItem(item.uuid)}
          />
        )}
      />
      <CitySearch
        visible={visible}
        value={citySearched}
        onChange={setCitySearched}
        onSearch={() => {
          if (citySearched.length > 0) {
            getWeatherInfoByCity();
          }
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      />
      <SafeAreaView />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme: { colors } }) => colors.background}
`;

const SectionTitle = styled.Text`
  background-color: white;
  color: black;
  padding: 10px;
  font-size: 16px;
  border-width: 0.5px;
`;
