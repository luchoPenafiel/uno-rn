// Vendor
import React, { useState } from 'react';

// Components
import { PageWrapper } from '@uno/components/PageWrapper';
import { TabSelector } from '@uno/components/TabSelector';
import { Title } from '@uno/components/Texts';
import { TableOfPlayers } from '@uno/components/TableOfPlayers';
import { Text } from '@uno/components/Texts';

// Context
import { usePlayerContext } from '@uno/contexts/PlayersContext';

export const Leaderboard = () => {
  const [sortBy, setSortBy] = useState('games');
  const { playerList } = usePlayerContext();

  const handleChangeSortBy = (value: string) => {
    setSortBy(value);
  };

  return (
    <PageWrapper>
      <Title>Tabla de posiciones</Title>
      {playerList.length ? (
        <>
          <TabSelector onPress={handleChangeSortBy} />
          {sortBy === 'games' ? (
            <TableOfPlayers playerList={playerList.sort((a, b) => b.gamesWon - a.gamesWon)} show={'games'} />
          ) : (
            <TableOfPlayers playerList={playerList.sort((a, b) => b.points - a.points)} show={'points'} />
          )}
        </>
      ) : (
        <Text>Juega algunas partidas para que los jugadores sumen puntos.</Text>
      )}
    </PageWrapper>
  );
};
