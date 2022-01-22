// Vendor
import React, { useState, useCallback } from 'react';
import { LayoutAnimation, Alert, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Components
import { PageWrapper } from '@uno/components/PageWrapper';
import { Title, Text } from '@uno/components/Texts';
import { AddPlayer } from '@uno/components/AddPlayer';
import { SelectPlayer } from '@uno/components/SelectPlayer';
import { Button } from '@uno/components/Button';

// Context
import { usePlayerContext } from '@uno/contexts/PlayersContext';
import { useGameContext } from '@uno/contexts/GameContext';
import { useAppContext } from '@uno/contexts/AppContext';

// Types
import { Player } from '@uno/types/player';
import theme from '@uno/constants/theme';

// Router
import { GameRouteNames, GameScreenProps } from '@uno/screens/Game/routes';

export const NewGame = ({ navigation }: GameScreenProps) => {
  const { gameInProgress, setGameInProgress } = useAppContext();
  const { playerList, setNewPlayer } = usePlayerContext();
  const { setPlayersInGame, setFinshGame } = useGameContext();

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
    const newPlayer: Player = setNewPlayer(newName);

    setPlayerToPlay(current => [...current, newPlayer]);
  };

  const handleStartGame = () => {
    setPlayersInGame(playerToPlay);
    setGameInProgress(true);
    navigation.navigate(GameRouteNames.GAME);
  };

  const handleFinshGame = () => {
    setFinshGame();
    setGameInProgress(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (gameInProgress) {
        Alert.alert(
          'Partida en progreso',
          'Tienes una partida en curso, pensamos que tal vez quieras continuarla. ¿Quieres continuarla?',
          [
            {
              text: 'Continuar Partida',
              onPress: () => navigation.navigate(GameRouteNames.GAME),
              style: 'cancel',
            },
            { text: 'Nueva Partida', onPress: () => handleFinshGame() },
          ],
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameInProgress]),
  );

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
            <View style={{ marginTop: theme.spaces['2xl'] }}>
              <Button disabled={playerToPlay.length < 2} onPress={handleStartGame}>
                Comenzar Partida
              </Button>
            </View>
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
