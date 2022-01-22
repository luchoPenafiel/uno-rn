// Vendor
import React, { useCallback } from 'react';
import { Alert, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Context
import { useAppContext } from '@uno/contexts/AppContext';
import { useGameContext } from '@uno/contexts/GameContext';
import { usePlayerContext } from '@uno/contexts/PlayersContext';

// Components
import { PageWrapper } from '@uno/components/PageWrapper';
import { Button } from '@uno/components/Button';
import { PlayerInGame } from '@uno/components/PlayerInGame';
import { Title, Text } from '@uno/components/Texts';

// Theme
import theme from '@uno/constants/theme';

// Router
import { GameRouteNames, GameScreenProps } from '@uno/screens/Game/routes';

export const Game = ({ navigation }: GameScreenProps) => {
  const { setGameInProgress } = useAppContext();
  const { playersInGame, setFinshGame, totalGamePoints } = useGameContext();
  const { setUpdateAllPlayers } = usePlayerContext();

  const handelCanelGame = () => {
    Alert.alert('Terminar partida', '¿Realmente quieres terminar esta partida? No podras continuarla luego.', [
      {
        text: 'Continuar partida',
        style: 'cancel',
      },
      {
        text: 'Terminar partida',
        onPress: () => {
          setGameInProgress(false);
          setFinshGame();
          navigation.navigate(GameRouteNames.NEW_GAME);
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      const hasWinner = playersInGame.find(p => p.pointsInGame > totalGamePoints - 1);

      if (hasWinner) {
        Alert.alert('¡Felicitaciones!', `¡${hasWinner.name} ha ganado la partida!`, [
          {
            text: 'OK',
            onPress: () => {
              setUpdateAllPlayers(playersInGame, hasWinner.id);
              setGameInProgress(false);
              setFinshGame();
              navigation.navigate(GameRouteNames.NEW_GAME);
            },
          },
        ]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playersInGame, totalGamePoints]),
  );

  return (
    <PageWrapper>
      <Title>Partida</Title>
      <Text>Selecciona al jugador que ganó la partida para sumarle puntos.</Text>
      <>
        {playersInGame
          .sort((a, b) => b.pointsInGame - a.pointsInGame)
          .map(p => (
            <PlayerInGame
              key={p.id}
              name={p.name}
              points={p.pointsInGame}
              onPress={() => navigation.navigate(GameRouteNames.ADD_POINTS, { player: p })}
            />
          ))}
      </>

      <View style={{ marginTop: theme.spaces['2xl'] }}>
        <Button onPress={handelCanelGame} color={theme.color.red} outlined>
          Terminar partida
        </Button>
      </View>
    </PageWrapper>
  );
};
