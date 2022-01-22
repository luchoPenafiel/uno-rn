// Vendor
import React, { useState } from 'react';
import { Pressable, View, Alert } from 'react-native';

// Components
import { PageWrapper } from '@uno/components/PageWrapper';
import { Title, Subtitle, Text } from '@uno/components/Texts';
import { Button } from '@uno/components/Button';

// Context
import { useGameContext } from '@uno/contexts/GameContext';

// Router
import { GameScreenProps } from '@uno/screens/Game/routes';

// Theme
import theme from '@uno/constants/theme';

export const AddPoints = ({ navigation, route }: GameScreenProps) => {
  const { setUpdateGame } = useGameContext();

  const [points, setPoints] = useState(0);

  const handleCancelSum = () => {
    Alert.alert('Cancelar suma', '¿Realmente quieres cancelar esta sumatoria?', [
      {
        text: 'Continuar sumando',
        style: 'cancel',
      },
      {
        text: 'Cancelar sumatoria',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const handleSavePoints = async () => {
    Alert.alert('Guardar puntos', `¿Estas seguro de querer sumar estos puntos a ${route.params.player.name}?`, [
      {
        text: 'Guardar puntos',
        style: 'cancel',
        onPress: () => {
          setUpdateGame(route.params.player, points);
          navigation.goBack();
        },
      },
      {
        text: 'Continuar sumando',
      },
    ]);
  };

  const handleAddPoints = (value: number) => {
    setPoints(current => current + value);
  };

  return (
    <PageWrapper>
      <Title>Puntaje</Title>
      <Text>{`Selecciona cartas para ir sumando puntos para ${route.params.player.name}`}</Text>

      <Pressable onPress={() => handleAddPoints(1)}>
        <Text>+1</Text>
      </Pressable>

      <Pressable onPress={() => handleAddPoints(2)}>
        <Text>+2</Text>
      </Pressable>

      <Pressable onPress={() => handleAddPoints(3)}>
        <Text>+3</Text>
      </Pressable>

      <Subtitle>{`Puntos en la ronda:  ${points}`}</Subtitle>
      <Subtitle>{`Puntos totales:  ${route.params.player.pointsInGame + points}`}</Subtitle>

      <View style={{ marginTop: theme.spaces['2xl'] }}>
        <Button onPress={handleSavePoints} color={theme.color.green}>
          Guardar Puntos
        </Button>

        <Button onPress={handleCancelSum} color={theme.color.red} outlined>
          Cancelar
        </Button>
      </View>
    </PageWrapper>
  );
};
