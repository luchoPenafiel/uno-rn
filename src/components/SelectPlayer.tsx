// Vendor
import React from 'react';
import { Pressable, Text as RNText } from 'react-native';
import styled from 'styled-components';

// Types
import { Player } from '@uno/types/player';

// Theme
import theme from '@uno/constants/theme';

const Wrapper = styled(Pressable)<{ isActive: boolean }>`
  padding: ${theme.spaces.m}px;
  margin-top: 10px;

  background-color: ${({ isActive }) => (isActive ? theme.color.green : theme.color.gray)};
  border-radius: ${theme.bordeRadius};
`;

const Value = styled(RNText)`
  font-size: 16px;
`;

export const SelectPlayer = ({
  player,
  isActive,
  onPress,
}: {
  player: Player;
  isActive: boolean;
  onPress: (p: Player) => void;
}) => {
  const handlePress = () => {
    onPress(player);
  };
  return (
    <Wrapper isActive={isActive} onPress={handlePress}>
      <Value>{player.name}</Value>
    </Wrapper>
  );
};
