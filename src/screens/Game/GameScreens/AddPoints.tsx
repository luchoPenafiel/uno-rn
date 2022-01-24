/* eslint-disable react-native/no-inline-styles */
// Vendor
import React, { useState } from 'react';
import { View, Alert } from 'react-native';

// Components
import { PageWrapper } from '@uno/components/PageWrapper';
import { Title, Text } from '@uno/components/Texts';
import { Button } from '@uno/components/Button';
import { Card } from '@uno/components/Card';

// Context
import { useGameContext } from '@uno/contexts/GameContext';

// Router
import { GameScreenProps } from '@uno/screens/Game/routes';

// Theme
import theme from '@uno/constants/theme';

export const AddPoints = ({ navigation, route }: GameScreenProps) => {
  const { setPlayerPoints } = useGameContext();

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
          setPlayerPoints(route.params.player, points);
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
      <Title>{`Puntaje: ${points}`}</Title>
      <Text>{`Selecciona cartas para ir sumando puntos para ${route.params.player.name}`}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Card color={theme.color.blue} label="0" onPress={() => handleAddPoints(0)} />
        <Card color={theme.color.yellow} label="1" onPress={() => handleAddPoints(1)} />
        <Card color={theme.color.green} label="2" onPress={() => handleAddPoints(2)} />
        <Card color={theme.color.red} label="3" onPress={() => handleAddPoints(3)} />

        <Card color={theme.color.yellow} label="4" onPress={() => handleAddPoints(4)} />
        <Card color={theme.color.green} label="5" onPress={() => handleAddPoints(5)} />
        <Card color={theme.color.red} label="6" onPress={() => handleAddPoints(6)} />
        <Card color={theme.color.blue} label="7" onPress={() => handleAddPoints(7)} />

        <Card color={theme.color.green} label="8" onPress={() => handleAddPoints(8)} />
        <Card color={theme.color.red} label="9" onPress={() => handleAddPoints(9)} />
        <Card color={theme.color.blue} label="+2" onPress={() => handleAddPoints(20)} />
        <Card color={theme.color.yellow} specialCard="revert" onPress={() => handleAddPoints(20)} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
        <Card color={theme.color.red} specialCard="block" onPress={() => handleAddPoints(20)} />
        <Card
          color={theme.color.dark}
          label="+4"
          specialCard="plus-four"
          withMarginLeft
          onPress={() => handleAddPoints(50)}
        />
        <Card color={theme.color.dark} specialCard="wildcard" withMarginLeft onPress={() => handleAddPoints(50)} />
      </View>
      <View style={{ marginTop: theme.spaces.m }}>
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
