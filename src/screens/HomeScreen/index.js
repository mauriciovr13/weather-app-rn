import React, {useEffect, useMemo, useState} from 'react';
import {View, Platform, PermissionsAndroid, SectionList} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import styled from 'styled-components/native';

import {WeatherCard, Header} from '../../components';

import api from '../../services/api';
import {API_KEY} from '../../config/constants';
import {getData, storeData} from '../../utils/storage';

export function HomeScreen() {
  const [weatherData, setWeatherData] = useState([]);

  const getWeatherInfoByCity = city => {
    api
      .get(`weather?units=metric&lang=pt_br&q=${city}&appid=${API_KEY}`)
      .then(({data}) => {
        setWeatherData([...weatherData, {...data, expanded: true}]);
      })
      .catch(err => console.log('err', err));
  };

  const getWeatherInfoByGeoCoordinates = async () => {
    Geolocation.getCurrentPosition(
      info =>
        api
          .get(
            `weather?units=metric&lang=pt_br&lat=${info.coords.latitude}&lon=${info.coords.latitude}&appid=${API_KEY}`,
          )
          .then(({data}) => {
            setWeatherData([...weatherData, {...data, expanded: true}]);
          })
          .catch(err => console.log('err', err)),
      err => console.log('err', err),
    );
    getWeatherInfoByCity('Londres');
  };

  const onExpandItem = i => {
    setWeatherData(
      weatherData.map((item, index) =>
        index === i
          ? {...item, expanded: !item.expanded}
          : {...item, expanded: false},
      ),
    );
  };

  const requestPermission = () => {
    if (Platform.OS === 'android') {
      console.log('teste');
      const requestLocationPermission = async () => {
        const granted = await PermissionsAndroid.RESULTS;
        console.log(granted);
        // const callLocation = () => {
        //   if(Platform.OS === 'ios') {
        //     getLocation();
        //   } else {
        //     const requestLocationPermission = async () => {
        //       const granted = await PermissionsAndroid.request(
        //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        //         {
        //           title: "Permissão de Acesso à Localização",
        //           message: "Este aplicativo precisa acessar sua localização.",
        //           buttonNeutral: "Pergunte-me depois",
        //           buttonNegative: "Cancelar",
        //           buttonPositive: "OK"
        //         }
        //       );
        //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //         getLocation();
        //       } else {
        //         alert('Permissão de Localização negada');
        //       }
        //     };
        //     requestLocationPermission();
        //   }
        // }
      };
      requestLocationPermission();
    } else {
      Geolocation.requestAuthorization();
    }
    Geolocation.getCurrentPosition(
      info => getWeatherInfoByGeoCoordinates(info),
      err => console.log('err', err),
    );
  };

  const loadData = async () => {
    const data = await getData();
    setWeatherData(data);
    requestPermission();
    getWeatherInfoByCity('Ferros');
  };

  const sectionData = useMemo(
    () => [
      {
        title: 'Current location',
        data: weatherData[weatherData.length - 1]
          ? [weatherData[weatherData.length - 1]]
          : [],
      },
      {
        title: 'History',
        data: weatherData.slice(0, weatherData.length - 2) || [],
      },
    ],
    [weatherData],
  );

  useEffect(() => {
    storeData(weatherData.map(item => ({...item, expanded: false})));
  }, [weatherData]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Header onLeftPress={() => {}} />
      <SectionList
        sections={sectionData}
        keyExtractor={(item, index) => index}
        renderSectionHeader={({section: {title}}) => (
          <SectionTitle>{title}</SectionTitle>
        )}
        renderItem={({item, index}) => (
          <WeatherCard data={item} onPressItem={() => onExpandItem(index)} />
        )}
      />
    </View>
  );
}

const SectionTitle = styled.Text``;

// Features:
// detalhes da previsao OK
// ultimos resultados ok
// buscar por cidades
// estilizar o header
// estilizar o section header
// pull to refresh
// limpar todos os resultados ok
