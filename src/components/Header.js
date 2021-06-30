import React from 'react';
import { SafeAreaView, View } from 'react-native';
import styled from 'styled-components/native';

export default function Header({ onRightPress, onLeftPress }) {
  return (
    <View>
      <SafeAreaView />
      <Container>
        <Button onPress={onLeftPress}>
          <Text textAlign="left" color="red">
            Clear
          </Text>
        </Button>
        <Text textAlign="center">WEATHER</Text>
        <Button onPress={onRightPress}>
          <Text textAlign="right">Search By City</Text>
        </Button>
      </Container>
    </View>
  );
}

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
`;

const Text = styled.Text`
  text-align: ${({ textAlign }) => textAlign};
  font-size: 16px;
  color: ${({ color }) => color || 'black'};
`;
