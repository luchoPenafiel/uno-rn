// Vendor
import React, { useState, useCallback } from 'react';
import { LayoutAnimation, Alert, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Components
import { PageWrapper } from '@uno/components/PageWrapper';
import { Title, Text, Subtitle } from '@uno/components/Texts';
import { AddPlayer } from '@uno/components/AddPlayer';
import { SelectPlayer } from '@uno/components/SelectPlayer';
import { Button } from '@uno/components/Button';
import { MaxPoints } from '@uno/components/MaxPoints';

// Context
import { usePlayerContext } from '@uno/contexts/PlayersContext';
import { useGameContext } from '@uno/contexts/GameContext';
import { useAppContext } from '@uno/contexts/AppContext';

// Types
import { Player } from '@uno/types/player';
import theme from '@uno/constants/theme';

// Utils
import { logEvent } from '@uno/utils/analytics';

// Router
import { GameRouteNames, GameScreenProps } from '@uno/screens/Game/routes';

export const NewGame = ({ navigation }: GameScreenProps) => {
  const { gameInProgress, setGameInProgress } = useAppContext();
  const { playerList, setNewPlayer } = usePlayerContext();
  const { setNewGame, setFinshGame, totalGamePoints } = useGameContext();

  const [playerToPlay, setPlayerToPlay] = useState<Player[]>([]);
  const [maxPointsToPlay, setMaxPointsToPlay] = useState<number>(totalGamePoints);

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

  const handeChangePoints = (points: string) => {
    setMaxPointsToPlay(+points);
  };

  const handleStartGame = () => {
    setNewGame(playerToPlay, maxPointsToPlay);
    setGameInProgress(true);

    setMaxPointsToPlay(totalGamePoints);
    setPlayerToPlay([]);

    logEvent('new_game', { playerToPlay: playerToPlay.length, maxPointsToPlay });
    navigation.navigate(GameRouteNames.GAME);
  };

  const handleFinshGame = () => {
    setFinshGame();
    setGameInProgress(false);
    logEvent('gip_cancel');
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
              onPress: () => {
                navigation.navigate(GameRouteNames.GAME);
                logEvent('gip_continue');
              },
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
      <Text>{`${playerList.length > 1 ? 'Selecciona' : 'Agrega'} al menos dos jugadores para iniciar`}</Text>
      <>
        {playerList
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((p: Player) => {
            return (
              <SelectPlayer
                key={p.id}
                player={p}
                isActive={playerToPlay.some(({ id }) => id === p.id)}
                onPress={handleToggleIncludePlayerToPlay}
              />
            );
          })}
      </>
      <AddPlayer handlePress={handleAddNewPlayer} />

      <View style={{ marginTop: theme.spaces['2xl'] }}>
        <Subtitle>¿A cuantos puntos quieres jugar?</Subtitle>
        <MaxPoints defaultPoints={totalGamePoints} onChange={handeChangePoints} />
      </View>

      <View style={{ marginTop: theme.spaces['2xl'] }}>
        <Button disabled={playerToPlay.length < 2 || !maxPointsToPlay} onPress={handleStartGame}>
          Comenzar Partida
        </Button>
      </View>
    </PageWrapper>
  );
};
