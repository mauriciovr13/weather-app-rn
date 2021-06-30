import React from 'react';
import { Modal, Text } from 'react-native';
import styled from 'styled-components/native';

const CitySearch = ({ visible, value, onChange, onSearch, onCancel }) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      hardwareAccelerated
      statusBarTranslucent>
      <Container>
        <Content>
          <Title>
            Enter the city name to see the weather forecast. {'\n\n'}
            To update the weather forecast of the current location, just swipe
            down from the main screen.
          </Title>
          <TextInput value={value} onChangeText={onChange} />
          <ButtonsContainer>
            <Button onPress={onCancel}>
              <Text>cancel</Text>
            </Button>
            <Button onPress={onSearch}>
              <Text>search</Text>
            </Button>
          </ButtonsContainer>
        </Content>
      </Container>
    </Modal>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  padding: 30px;
`;

const Content = styled.View`
  background-color: white;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px;
  border-radius: 7px;
`;

const Title = styled.Text`
  font-size: 16px;
`;

const TextInput = styled.TextInput`
  border-width: 1px;
  border-bottom-width: 1.5px;
  border-radius: 8px;
  height: 40px;
  padding: 5px;
  text-align: center;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const Button = styled.TouchableOpacity`
  padding: 10px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default CitySearch;
