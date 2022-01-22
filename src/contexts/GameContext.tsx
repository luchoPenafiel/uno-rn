// Vendor
import React, { useContext, createContext, ReactElement, ReactNode, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
import { Player } from '@uno/types/player';

export const KEY = 'uno-calculator-game';

type GameData = {
  playersInGame: Player[];
  totalGamePoints: number;
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
  totalGamePoints: number;
  setNewGame: (players: Player[], points: number) => void;
  setPlayerPoints: (player: Player, points: number) => void;
  setFinshGame: () => void;
};

const GameContext = createContext<GameContextType>({
  playersInGame: [],
  totalGamePoints: 500,
  setNewGame: () => {},
  setPlayerPoints: () => {},
  setFinshGame: () => {},
});

export const GameContextProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [playersInGame, setStatePlayersInGame] = useState<Player[]>([]);
  const [totalGamePoints, setStateTotalGamePoints] = useState(500);

  const setNewGame = useCallback((players: Player[], points) => {
    setStatePlayersInGame(players);
    setStateTotalGamePoints(points);

    setGameData({ totalGamePoints: points, playersInGame: players });
  }, []);

  const setPlayerPoints = useCallback((player: Player, points: number) => {
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

      setGameData({ totalGamePoints, playersInGame: newPlayersInGame });

      return newPlayersInGame;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setFinshGame = () => {
    setStatePlayersInGame([]);
    setStateTotalGamePoints(500);
    AsyncStorage.removeItem(KEY);
  };

  useEffect(() => {
    (async () => {
      const data = await getGameData();

      if (data) {
        setStatePlayersInGame(data.playersInGame);
        setStateTotalGamePoints(data.totalGamePoints);
      }
    })();
  }, []);

  return (
    <GameContext.Provider value={{ playersInGame, setNewGame, setPlayerPoints, setFinshGame, totalGamePoints }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
