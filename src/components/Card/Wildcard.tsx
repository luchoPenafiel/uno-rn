// Vendor
import React from 'react';
import { View, Dimensions } from 'react-native';
import styled from 'styled-components';

// Theme
import theme from '@uno/constants/theme';

const WildcardWrapper = styled(View)<{ screenHeight: number }>`
  display: flex;
  flex-wrap: wrap;

  width: 127%;
  height: ${({ screenHeight }) => screenHeight / 11}px;

  border-radius: 999px;

  transform: scaleY(0.6) rotate(-50deg);

  border: 4px solid ${theme.color.white};
  overflow: hidden;
`;

const WildcardBlock = styled(View)<{ color: string }>`
  width: 50%;
  height: 50%;

  background-color: ${({ color }) => color};
`;

const WildcardIcon = styled(View)<{ screenHeight: number }>`
  position: absolute;
  top: -24%;
  left: -50%;

  width: 127%;
  height: ${({ screenHeight }) => screenHeight / 11}px;

  transform: scale(0.2);
`;

const WildcardIconInvert = styled(View)<{ screenHeight: number }>`
  position: absolute;
  bottom: -24%;
  right: -50%;

  width: 127%;
  height: ${({ screenHeight }) => screenHeight / 11}px;

  transform: scale(0.2) rotate(180deg);
`;

export const Wildcard = () => {
  const screenHeight = Dimensions.get('screen').height;

  return (
    <>
      <WildcardIcon screenHeight={screenHeight}>
        <WildcardWrapper screenHeight={screenHeight}>
          <WildcardBlock color={theme.color.blue} />
          <WildcardBlock color={theme.color.yellow} />
          <WildcardBlock color={theme.color.red} />
          <WildcardBlock color={theme.color.green} />
        </WildcardWrapper>
      </WildcardIcon>
      <WildcardWrapper screenHeight={screenHeight}>
        <WildcardBlock color={theme.color.blue} />
        <WildcardBlock color={theme.color.yellow} />
        <WildcardBlock color={theme.color.red} />
        <WildcardBlock color={theme.color.green} />
      </WildcardWrapper>
      <WildcardIconInvert screenHeight={screenHeight}>
        <WildcardWrapper screenHeight={screenHeight}>
          <WildcardBlock color={theme.color.blue} />
          <WildcardBlock color={theme.color.yellow} />
          <WildcardBlock color={theme.color.red} />
          <WildcardBlock color={theme.color.green} />
        </WildcardWrapper>
      </WildcardIconInvert>
    </>
  );
};
