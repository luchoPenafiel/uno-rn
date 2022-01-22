// Vendor
import React, { useContext, createContext, ReactElement, ReactNode, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
import { Player } from '@uno/types/player';

export const KEY = 'uno-calculator-game';

type GameData = {
  playersInGame: Player[];
};

const setAppData = async (data: GameData) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
};

const getAppData = async (): Promise<GameData | null> => {
  try {
    const response = await AsyncStorage.getItem(KEY);
    if (response) {
      return JSON.parse(response);
    }
  } catch {}

  return null;
};

type GameContextType = {
  playersInGame: Player[];
  handleStartNewGame: (players: Player[]) => void;
  handleUpdateGame: (player: Player, points: number) => void;
  handleFinshGame: () => void;
};

type Props = {
  children: ReactNode;
};

const GameContext = createContext<GameContextType>({
  playersInGame: [],
  handleStartNewGame: () => {},
  handleUpdateGame: () => {},
  handleFinshGame: () => {},
});

export const GameContextProvider = ({ children }: Props): ReactElement => {
  const [playersInGame, setPlayersInGame] = useState<Player[]>([]);

  const handleStartNewGame = useCallback((players: Player[]) => {
    setPlayersInGame(players);
  }, []);

  const handleUpdateGame = useCallback((player: Player, points: number) => {
    setPlayersInGame(current => {
      const newPlayersInGame = current.map(p => {
        if (p.id === player.id) {
          return {
            ...p,
            pointsInGame: p.pointsInGame + points,
          };
        } else {
          return p;
        }
      });

      setAppData({ playersInGame: newPlayersInGame });

      return newPlayersInGame;
    });
  }, []);

  const handleFinshGame = () => {
    setPlayersInGame([]);
    AsyncStorage.removeItem(KEY);
  };

  useEffect(() => {
    (async () => {
      const data = await getAppData();

      console.log('data recuperada', data);

      if (data) {
        setPlayersInGame(data.playersInGame);
      }
    })();
  }, []);

  return (
    <GameContext.Provider value={{ playersInGame, handleStartNewGame, handleUpdateGame, handleFinshGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
