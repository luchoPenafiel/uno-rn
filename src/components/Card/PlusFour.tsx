// Vendor
import React from 'react';
import styled from 'styled-components';
import { View, Dimensions } from 'react-native';

// Theme
import theme from '@uno/constants/theme';

const FakeCardWrapper = styled(View)`
  position: absolute;
  top: 42%;
  left: 45%;
`;

const FakeCard = styled(View)<{ transformProp: string; color: string; screenHeight: number; screenWidth: number }>`
  position: absolute;

  transform: ${({ transformProp }) => transformProp};

  width: ${({ screenWidth }) => screenWidth / 40}px;
  height: ${({ screenHeight }) => screenHeight / 40}px;

  background-color: ${({ color }) => color};
  border: 0.5px solid ${theme.color.dark};
`;

export const PlusFour = () => {
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;

  return (
    <FakeCardWrapper>
      <FakeCard
        transformProp="translateX(-7px)"
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        color={theme.color.blue}
      />
      <FakeCard
        transformProp="translateY(-7px)"
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        color={theme.color.yellow}
      />
      <FakeCard
        transformProp="translateY(7px) translateX(2px)"
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        color={theme.color.green}
      />
      <FakeCard
        transformProp="translateX(7px)"
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        color={theme.color.red}
      />
    </FakeCardWrapper>
  );
};
