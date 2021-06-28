import React from 'react';
import styled from 'styled-components/native';

import colors from '../config/colors';

export default function Info({info, weather}) {
  const getLine = data => (
    <Container weather={weather}>
      <Content>
        <Column>
          <Title weather={weather}>{data[0]?.label}</Title>
        </Column>
        <Column>
          <Title weather={weather}>{data[1]?.label}</Title>
        </Column>
      </Content>
      <Content>
        <Column>
          <Value weather={weather}>{data[0]?.value}</Value>
        </Column>
        <Column>
          <Value weather={weather}>{data[1]?.value}</Value>
        </Column>
      </Content>
    </Container>
  );

  const numOfLines = info.length / 2;

  return (
    <Wrapper>
      {Array.from(Array(numOfLines).keys()).map(i =>
        getLine([info[i * 2], info[i * 2 + 1]]),
      )}
    </Wrapper>
  );
}

const Container = styled.View`
  border-top-width: 1px;
  border-color: ${({weather}) => colors[weather].tertiaryText};
  margin-bottom: 5px;
  padding-top: 2px;
`;

const Wrapper = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Content = styled.View`
  width: 100%;
  flex-direction: row;
`;

const Column = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: ${({weather}) => colors[weather].primaryText};
  font-size: 12px;
`;

const Value = styled.Text`
  color: ${({weather}) => colors[weather].tertiaryText};
  font-size: 14px;
`;
