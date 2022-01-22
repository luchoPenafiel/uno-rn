// Vendor
import React from 'react';
import { Pressable, Text } from 'react-native';
import styled from 'styled-components';

// Theme
import theme from '@uno/constants/theme';

const Wrapper = styled(Pressable)<{ disabled: boolean; color?: string }>`
  padding: ${theme.spaces.l}px;
  margin-top: ${theme.spaces.m}px;

  background-color: ${({ disabled, color }) => (disabled ? theme.color.gray : color ? color : theme.color.blue)};
  border-radius: ${theme.bordeRadius};
`;

const TextStyled = styled(Text)<{ disabled: boolean }>`
  color: ${theme.color.darkGray};

  text-align: center;
  font-size: 18px;
`;

export const Button = ({
  children,
  color,
  disabled,
  onPress,
}: {
  children: string;
  color?: string;
  disabled: boolean;
  onPress: () => void;
}) => {
  return (
    <Wrapper disabled={disabled} onPress={onPress} color={color}>
      <TextStyled disabled={disabled}>{children}</TextStyled>
    </Wrapper>
  );
};
