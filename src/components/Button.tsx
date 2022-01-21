// Vendor
import React from 'react';
import { Pressable, Text } from 'react-native';
import styled from 'styled-components';

// Theme
import theme from '@uno/constants/theme';

const Wrapper = styled(Pressable)<{ disabled: boolean }>`
  padding: ${theme.spaces.l}px;
  margin-top: 10px;

  background-color: ${({ disabled }) => (disabled ? theme.color.gray : theme.color.green)};
  border-radius: ${theme.bordeRadius};
`;

const TextStyled = styled(Text)`
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
      <TextStyled>{children}</TextStyled>
    </Wrapper>
  );
};
