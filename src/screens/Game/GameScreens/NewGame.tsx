// Vendor
import React, { useState } from 'react';
import { LayoutAnimation } from 'react-native';

// Components
import { PageWrapper } from '@uno/components/PageWrapper';
import { Title, Text } from '@uno/components/Texts';
import { AddPlayer } from '@uno/components/AddPlayer';
import { SelectPlayer } from '@uno/components/SelectPlayer';
import { Button } from '@uno/components/Button';

// Context
import { usePlayerContext } from '@uno/contexts/PlayersContext';

// Types
import { Player } from '@uno/types/player';

export const NewGame = () => {
  const { playerList, handleAddPlayer } = usePlayerContext();
  const [playerToPlay, setPlayerToPlay] = useState<Player[]>([]);

  const handleToggleIncludePlayerToPlay = (player: Player) => {
    const isAlreadyIncluded = playerToPlay.some(({ id }) => id === player.id);

    if (isAlreadyIncluded) {
      const newList = playerToPlay.filter(({ id }) => id !== player.id);
      setPlayerToPlay(newList);
    } else {
      setPlayerToPlay(current => [...current, player]);
    }
  };

  const handleAddNewPlayer = (newName: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newPlayer: Player = handleAddPlayer(newName);

    setPlayerToPlay(current => [...current, newPlayer]);
  };

  const handleStartGame = () => {
    console.log('Start game');
  };

  return (
    <PageWrapper>
      <Title>Nueva Partida</Title>
      <>
        {playerList.length > 1 ? (
          <>
            <Text>Selecciona al menos dos jugadores para iniciar</Text>
            {playerList.map((p: Player) => {
              return (
                <SelectPlayer
                  key={p.id}
                  player={p}
                  isActive={playerToPlay.some(({ id }) => id === p.id)}
                  onPress={handleToggleIncludePlayerToPlay}
                />
              );
            })}
            <AddPlayer handlePress={handleAddNewPlayer} />
            <Button disabled={playerToPlay.length < 2} onPress={handleStartGame}>
              Comenzar Partida
            </Button>
          </>
        ) : (
          <>
            <Text>Agrega al menos dos jugadores para iniciar una partida</Text>
            <AddPlayer handlePress={handleAddNewPlayer} />
          </>
        )}
      </>
    </PageWrapper>
  );
};
