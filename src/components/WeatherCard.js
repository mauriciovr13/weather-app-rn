import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {fromUnixTime, format} from 'date-fns';

import theme from '../config/colors';
import {weatherConditions} from '../utils/conditions';

import {WeatherDetails} from '.';

export default function WeatherCard({data, onPressItem}) {
  const weather = useMemo(() => {
    const weatherId = data.weather[0].id;
    return weatherConditions(weatherId);
  }, [data]);

  const weatherDetails = useMemo(
    () => [
      {label: 'UMIDADE', value: `${data.main.humidity}%`},
      {label: 'SENSAÇÃO', value: `${data.main.feels_like}ºC`},
      // {label: 'CHUVA', value: data.main.humidity},
      // {label: 'PRECIPITACAO', value: data.main.feels_like},
      {label: 'MIN', value: `${data.main.temp_min}ºC`},
      {label: 'MAX', value: `${data.main.temp_max}ºC`},
      {
        label: 'NASCER DO SOL',
        value: format(fromUnixTime(data.sys.sunrise), 'kk:mm'),
      },
      {
        label: 'PÔR DO SOL',
        value: format(fromUnixTime(data.sys.sunset), 'kk:mm'),
      },
      {label: 'NEBULOSIDADE', value: `${data.clouds.all}%`},
      {label: 'VENTO', value: `${data.wind.speed} m/s`},
    ],
    [data],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        onPressItem();
      }}>
      <Container weather={weather}>
        <Header>
          <TextContainer>
            <Description weather={weather}>
              {data.weather[0].description}
            </Description>
            <Temperature weather={weather}>
              {data.main.temp}
              <Unit>ºC</Unit>
            </Temperature>
            <City weather={weather}> {data.name} </City>
          </TextContainer>
          <Icon
            source={{
              uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            }}
          />
        </Header>
        {data?.expanded && (
          <WeatherDetails info={weatherDetails} weather={weather} />
        )}
        <TextFooter>
          Lat: {data.coord.lon} / Lon: {data.coord.lat} -
          {format(fromUnixTime(data.dt), 'dd/MM/yyyy HH:mm')}
        </TextFooter>
      </Container>
    </TouchableOpacity>
  );
}

const Container = styled(LinearGradient).attrs(({weather}) => {
  return {
    colors: [theme[weather].primary, theme[weather].secondary],
  };
})`
  margin: 10px 20px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.1);
  elevation: 5;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const City = styled.Text`
  font-size: 16px;
  color: ${({weather}) => theme[weather].secondaryText};
  text-align: center;
  margin-top: 5px;
`;
const Description = styled.Text`
  font-size: 20px;
  color: ${({weather}) => theme[weather].secondaryText};
  text-align: center;
  margin-bottom: 5px;
  text-transform: capitalize;
`;

const Unit = styled.Text`
  font-size: 14px;
`;

const Temperature = styled.Text`
  font-size: 32px;
  color: ${({weather}) => theme[weather].primaryText};
  text-align: center;
`;

const TextFooter = styled.Text`
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
  opacity: 0.2;
`;

const TextContainer = styled.View`
  width: 75%;
`;

const Icon = styled.Image`
  flex: 1;
`;
