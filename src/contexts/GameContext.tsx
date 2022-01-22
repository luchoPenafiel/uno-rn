// Vendor
import React, { useContext, createContext, ReactElement, ReactNode, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
import { Player } from '@uno/types/player';

export const KEY = 'uno-calculator-game';

type GameData = {
  playersInGame: Player[];
};

const setGameData = async (data: GameData) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
};

const getGameData = async (): Promise<GameData | null> => {
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
  setPlayersInGame: (players: Player[]) => void;
  setUpdateGame: (player: Player, points: number) => void;
  setFinshGame: () => void;
};

type Props = {
  children: ReactNode;
};

const GameContext = createContext<GameContextType>({
  playersInGame: [],
  setPlayersInGame: () => {},
  setUpdateGame: () => {},
  setFinshGame: () => {},
});

export const GameContextProvider = ({ children }: Props): ReactElement => {
  const [playersInGame, setStatePlayersInGame] = useState<Player[]>([]);

  const setPlayersInGame = useCallback((players: Player[]) => {
    setStatePlayersInGame(players);
  }, []);

  const setUpdateGame = useCallback((player: Player, points: number) => {
    setStatePlayersInGame(current => {
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

      setGameData({ playersInGame: newPlayersInGame });

      return newPlayersInGame;
    });
  }, []);

  const setFinshGame = () => {
    setStatePlayersInGame([]);
    AsyncStorage.removeItem(KEY);
  };

  useEffect(() => {
    (async () => {
      const data = await getGameData();

      if (data) {
        setPlayersInGame(data.playersInGame);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GameContext.Provider value={{ playersInGame, setPlayersInGame, setUpdateGame, setFinshGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
