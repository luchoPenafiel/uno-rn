// Vendor
import React from 'react';
import { View } from 'react-native';

import { Text } from '@uno/components/Texts';

// Types
import { Player } from '@uno/types/player';

export const TableOfPlayers = ({ playerList }: { playerList: Player[] }) => {
  return (
    <>
      {playerList.length > 0 ? (
        playerList.map(p => {
          return (
            <View key={p.id}>
              <Text>{p.name}</Text>
              <Text>{`Points: ${p.points}`}</Text>
              <Text>{`Games: ${p.gamesWon}`}</Text>
              <Text>-----</Text>
            </View>
          );
        })
      ) : (
        <Text>Juega algunas partidas para que los jugadores sumen puntos</Text>
      )}
    </>
  );
};
