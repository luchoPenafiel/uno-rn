// Vendor
import React from 'react';
import { Pressable, Text } from 'react-native';
import styled from 'styled-components';

// Theme
import theme from '@uno/constants/theme';

const Wrapper = styled(Pressable)<{ disabled: boolean }>`
  padding: ${theme.spaces.l}px;
  margin-top: ${theme.spaces['2xl'] * 2}px;

  background-color: ${({ disabled }) => (disabled ? theme.color.gray : theme.color.blue)};
  border-radius: ${theme.bordeRadius};
`;

const TextStyled = styled(Text)<{ disabled: boolean }>`
  color: ${theme.color.darkGray};

  text-align: center;
  font-size: 18px;
`;

export const Button = ({
  children,
  disabled,
  onPress,
}: {
  children: string;
  disabled: boolean;
  onPress: () => void;
}) => {
  return (
    <Wrapper disabled={disabled} onPress={onPress}>
      <TextStyled disabled={disabled}>{children}</TextStyled>
    </Wrapper>
  );
};
