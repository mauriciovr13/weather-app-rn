import {WEATHER_CONDITIONS} from '../config/constants';

export const weatherConditions = code => {
  if (code > 800) {
    return WEATHER_CONDITIONS.CLOUDS;
  }
  if (code >= 800) {
    return WEATHER_CONDITIONS.CLEAR;
  }
  if (code >= 700) {
    return WEATHER_CONDITIONS.ATMOSPHERE;
  }
  if (code >= 600) {
    return WEATHER_CONDITIONS.SNOW;
  }
  if (code >= 500) {
    return WEATHER_CONDITIONS.RAIN;
  }
  if (code >= 300) {
    return WEATHER_CONDITIONS.DRIZZLE;
  }
  return WEATHER_CONDITIONS.THUNDERSTORM;
};
