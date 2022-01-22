// Vendor
import React, { useState } from 'react';
import { View, TextInput, Pressable, Dimensions, Text as RNText } from 'react-native';
import styled from 'styled-components';

// Theme
import theme from '@uno/constants/theme';

const Wrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;

  margin-top: ${theme.spaces.l}px;
`;

const InputWrapper = styled(View)`
  border-bottom-color: ${theme.color.darkGray};
  border-bottom-width: 1px;
`;

const Input = styled(TextInput)<{ screenWidth: number }>`
  width: ${({ screenWidth }) => `${screenWidth - theme.spaces.xl - 40 - 8}px`};
  padding-top: ${theme.spaces.s}px;
  padding-bottom: ${theme.spaces.s}px;

  color: ${theme.color.dark};
  font-size: 16px;
`;

const Button = styled(Pressable)<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${`${theme.spaces.xl}px`};
  height: ${`${theme.spaces.xl}px`};

  background-color: ${({ disabled }) => (disabled ? theme.color.gray : theme.color.blue)};
  border-radius: ${theme.bordeRadius};
`;

export const AddPlayer = ({ handlePress }: { handlePress: (name: string) => void }) => {
  const [name, setName] = useState('');
  const screenWidth = Dimensions.get('screen').width;

  const onChangeName = (newName: string) => setName(newName);

  const onPress = () => {
    setName('');
    handlePress && handlePress(name);
  };

  return (
    <Wrapper>
      <InputWrapper>
        <Input
          placeholder="Buzz Lightyear"
          onChangeText={onChangeName}
          value={name}
          screenWidth={screenWidth}
          placeholderTextColor={theme.color.gray}
        />
      </InputWrapper>
      <Button onPress={onPress} disabled={!name}>
        <RNText style={{ color: theme.color.white }}>+</RNText>
      </Button>
    </Wrapper>
  );
};
