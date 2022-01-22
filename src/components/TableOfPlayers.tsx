// Vendor
import React from 'react';
import { View, Text as RNText } from 'react-native';
import styled from 'styled-components';

// Types
import { Player } from '@uno/types/player';

// Theme
import theme from '@uno/constants/theme';

const Wrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;

  padding: ${theme.spaces.m}px;
  margin-top: 10px;

  background-color: ${theme.color.gray};
  border-radius: ${theme.bordeRadius};
`;

const ValueWrapper = styled(View)`
  flex-direction: row;
  width: 50%;
`;

const Name = styled(RNText)`
  width: auto;
  margin-bottom: 0;

  font-size: 16px;
`;

const Value = styled(RNText)`
  width: 100%;
  margin-bottom: 0;

  font-size: 16px;
  text-align: right;
`;

export const TableOfPlayers = ({ playerList, show }: { playerList: Player[]; show: 'totalPoints' | 'gamesWon' }) => {
  return (
    <>
      {playerList.map(p => {
        return (
          <Wrapper key={p.id}>
            <Name>{p.name}</Name>
            <ValueWrapper>
              <Value>{`${p[show]}`}</Value>
            </ValueWrapper>
          </Wrapper>
        );
      })}
    </>
  );
};
