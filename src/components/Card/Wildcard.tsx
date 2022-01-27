// Vendor
import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

// Theme
import theme from '@uno/constants/theme';

const WildcardWrapper = styled(View)<{ cardWidth: number; cardHeight: number }>`
  display: flex;
  flex-wrap: wrap;

  width: ${({ cardWidth }) => cardWidth * 1.2}px;
  height: ${({ cardHeight }) => cardHeight / 1.4}px;

  border-radius: 999px;
  background-color: ${theme.color.white};

  transform: scaleY(0.5);

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

const WildcardIcon = styled(View)`
  position: absolute;
  top: -30%;
  left: -55%;

  transform: scale(0.2);
`;

const WildcardIconInvert = styled(View)`
  position: absolute;
  bottom: -30%;
  right: -55%;

  transform: scale(0.2) rotate(180deg);
`;

export const Wildcard = ({ cardWidth, cardHeight }: { cardWidth: number; cardHeight: number }) => {
  return (
    <>
      <WildcardIcon>
        <WildcardWrapper cardWidth={cardWidth} cardHeight={cardHeight}>
          <WildcardBlock color={theme.color.blue} />
          <WildcardBlock color={theme.color.yellow} />
          <WildcardBlock color={theme.color.red} />
          <WildcardBlock color={theme.color.green} />
        </WildcardWrapper>
      </WildcardIcon>
      <WildcardWrapper cardWidth={cardWidth} cardHeight={cardHeight}>
        <WildcardBlock color={theme.color.blue} />
        <WildcardBlock color={theme.color.yellow} />
        <WildcardBlock color={theme.color.red} />
        <WildcardBlock color={theme.color.green} />
      </WildcardWrapper>
      <WildcardIconInvert>
        <WildcardWrapper cardWidth={cardWidth} cardHeight={cardHeight}>
          <WildcardBlock color={theme.color.blue} />
          <WildcardBlock color={theme.color.yellow} />
          <WildcardBlock color={theme.color.red} />
          <WildcardBlock color={theme.color.green} />
        </WildcardWrapper>
      </WildcardIconInvert>
    </>
  );
};
