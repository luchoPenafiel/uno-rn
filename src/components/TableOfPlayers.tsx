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
  margin-bottom: 10px;

  background-color: ${theme.color.gray};
  border-radius: ${theme.bordeRadius};
`;

const ValueWrapper = styled(View)`
  flex-direction: row;
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

export const TableOfPlayers = ({ playerList, show }: { playerList: Player[]; show: 'points' | 'games' }) => {
  return (
    <>
      {playerList.map(p => {
        return (
          <Wrapper key={p.id}>
            <Name>{p.name}</Name>
            <ValueWrapper>
              {show === 'points' ? <Value>{`${p.points}`}</Value> : null}
              {show === 'games' ? <Value>{`${p.gamesWon}`}</Value> : null}
            </ValueWrapper>
          </Wrapper>
        );
      })}
    </>
  );
};
