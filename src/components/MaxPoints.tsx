// Vendor
import React from 'react';
import { View, TextInput, Dimensions } from 'react-native';
import styled from 'styled-components';

// Theme
import theme from '@uno/constants/theme';

const Wrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const InputWrapper = styled(View)`
  border-bottom-color: ${theme.color.gray};
  border-bottom-width: 1px;
`;

const Input = styled(TextInput)<{ screenWidth: number }>`
  width: ${({ screenWidth }) => `${screenWidth - theme.spaces.xl - 8}px`};
  padding-top: ${theme.spaces.s}px;
  padding-bottom: ${theme.spaces.s}px;

  color: ${theme.color.white};
  font-size: 16px;
`;

export const MaxPoints = ({
  defaultPoints,
  onChange,
}: {
  defaultPoints: number;
  onChange: (points: string) => void;
}) => {
  const screenWidth = Dimensions.get('screen').width;

  return (
    <Wrapper>
      <InputWrapper>
        <Input
          onChangeText={onChange}
          defaultValue={`${defaultPoints}`}
          keyboardType="numeric"
          screenWidth={screenWidth}
        />
      </InputWrapper>
    </Wrapper>
  );
};
