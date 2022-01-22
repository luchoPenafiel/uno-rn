// Vendor
import React from 'react';
import { Pressable, Text as RNText } from 'react-native';
import styled from 'styled-components';

// Theme
import theme from '@uno/constants/theme';

const Wrapper = styled(Pressable)`
  flex-direction: row;
  justify-content: space-between;

  padding: ${theme.spaces.m}px;
  margin-top: 10px;

  background-color: ${theme.color.gray};
  border-radius: ${theme.bordeRadius};
`;

const Name = styled(RNText)`
  width: auto;
  margin-bottom: 0;

  font-size: 16px;
`;

const Value = styled(RNText)`
  width: ${theme.spaces['2xl']}px;
  margin-left: ${theme.spaces.s}px;
  margin-bottom: 0;

  font-size: 16px;
  text-align: right;
`;

export const PlayerInGame = ({ name, points, onPress }: { name: string; points: number; onPress: () => void }) => {
  return (
    <Wrapper onPress={onPress}>
      <Name>{name}</Name>
      <Value>{`${points}`}</Value>
    </Wrapper>
  );
};
