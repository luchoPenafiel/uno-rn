// Vendor
import React from 'react';
import { Pressable, Text } from 'react-native';
import styled from 'styled-components';

// Theme
import theme from '@uno/constants/theme';

const Wrapper = styled(Pressable)<{ disabled: boolean; color?: string; outlined?: boolean }>`
  padding: ${theme.spaces.m}px ${theme.spaces.l}px;
  margin-top: ${theme.spaces.m}px;

  background-color: ${({ outlined, disabled, color }) =>
    outlined ? theme.color.white : disabled ? theme.color.gray : color ? color : theme.color.blue};
  border-radius: ${theme.bordeRadius};
  border: 2px solid ${({ disabled, color }) => (disabled ? theme.color.gray : color ? color : theme.color.blue)};
`;

const TextStyled = styled(Text)<{ disabled: boolean; color?: string; outlined?: boolean }>`
  color: ${({ disabled, outlined, color }) => (outlined ? color : disabled ? theme.color.darkGray : theme.color.white)};

  text-align: center;
  font-size: 18px;
`;

export const Button = ({
  children,
  color,
  disabled = false,
  outlined = false,
  onPress,
}: {
  children: string;
  color?: string;
  outlined?: boolean;
  disabled?: boolean;
  onPress: () => void;
}) => {
  return (
    <Wrapper disabled={disabled} onPress={onPress} color={color} outlined={outlined}>
      <TextStyled disabled={disabled} color={color} outlined={outlined}>
        {children}
      </TextStyled>
    </Wrapper>
  );
};
