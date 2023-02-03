// Vendor
import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import styled from 'styled-components';

// Components
import { Text } from '@uno/components/Texts';
import theme from '@uno/constants/theme';

const Wrapper = styled(View)`
  flex-direction: row;

  margin-top: ${theme.spaces.l}px;
  border-bottom-color: ${theme.color.gray};
  border-bottom-width: 1px;
`;

const Tab = styled(Pressable)<{ active: boolean }>`
  width: 50%;

  text-align: center;
  border-bottom-color: ${theme.color.gray};
  border-bottom-width: ${({ active }) => (active ? '1px' : 0)};
`;

export const TabSelector = ({ onPress }: { onPress: (value: string) => void }) => {
  const [activeTab, setActiveTab] = useState('games');

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
    onPress(tab);
  };

  return (
    <Wrapper>
      <Tab onPress={() => handleActiveTab('games')} active={activeTab === 'games'}>
        <Text align="center">Partidos</Text>
      </Tab>
      <Tab onPress={() => handleActiveTab('points')} active={activeTab === 'points'}>
        <Text align="center">Puntos</Text>
      </Tab>
    </Wrapper>
  );
};
