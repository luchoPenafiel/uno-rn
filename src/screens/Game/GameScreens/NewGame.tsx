// Vendor
import React, { useState, useLayoutEffect } from 'react';
import { LayoutAnimation, Alert, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

// Components
import { PageWrapper } from '@uno/components/PageWrapper';
import { Title, Text } from '@uno/components/Texts';
import { AddPlayer } from '@uno/components/AddPlayer';
import { SelectPlayer } from '@uno/components/SelectPlayer';
import { Button } from '@uno/components/Button';

// Context
import { usePlayerContext } from '@uno/contexts/PlayersContext';
import { useGameContext } from '@uno/contexts/GameContext';

// Types
import { Player } from '@uno/types/player';
import { GameStackParamList, GameRouteNames } from '@uno/screens/Game/routes';
import theme from '@uno/constants/theme';

type ProfileScreenNavigationProp = StackNavigationProp<GameStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export const NewGame = ({ navigation }: Props) => {
  const { playerList, handleAddPlayer } = usePlayerContext();
  const { playersInGame, handleFinshGame } = useGameContext();

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

  useLayoutEffect(() => {
    if (playersInGame.length) {
      Alert.alert(
        'Partina en progreso',
        'Tienes una partida en curso, pensamos que tal vez quieras continuarla. ¿Quieres continuarla?',
        [
          {
            text: 'Continuar Partida',
            onPress: () => {
              console.log('Continuar Partida');
              navigation.navigate(GameRouteNames.GAME);
            },
            style: 'cancel',
          },
          { text: 'Nueva Partida', onPress: () => handleFinshGame() },
        ],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playersInGame]);

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
