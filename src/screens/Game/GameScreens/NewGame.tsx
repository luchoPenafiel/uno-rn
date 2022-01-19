// Vendor
import React from 'react';
import { Pressable } from 'react-native';

// Components
import { PageWrapper } from '@uno/components/PageWrapper';
import { Title, Text } from '@uno/components/Texts';
import { AddPlayer } from '@uno/components/AddPlayer';

// Context
import { usePlayerContext } from '@uno/contexts/PlayersContext';

// Types
import { Player } from '@uno/types/player';

export const NewGame = () => {
  const { playerList, handleAddPlayer } = usePlayerContext();

  const handlePress = (newName: string) => handleAddPlayer(newName);

  return (
    <PageWrapper>
      <Title>Nueva Partida</Title>
      <>
        {playerList.length > 1 ? (
          <>
            <Text>Selecciona al menos dos jugadores para iniciar</Text>
            {playerList.map((p: Player) => {
              return (
                <Pressable key={p.id}>
                  <Text>{p.name}</Text>
                </Pressable>
              );
            })}
            <AddPlayer handlePress={handlePress} />
          </>
        ) : (
          <>
            <Text>Agrega al menos dos jugadores para iniciar una partida</Text>
            <AddPlayer handlePress={handlePress} />
          </>
        )}
      </>
    </PageWrapper>
  );
};
