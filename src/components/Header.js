import React from 'react';
import {SafeAreaView, View} from 'react-native';
import styled from 'styled-components/native';

import {clear} from '../utils/storage';

export default function Header() {
  return (
    <View>
      <SafeAreaView />
      <Container>
        <Button onPress={() => clear()}>
          <Text textAlign="left">Clear</Text>
        </Button>
        <Text textAlign="center">Weather</Text>
        <Button>
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
  text-align: ${({textAlign}) => textAlign};
`;
