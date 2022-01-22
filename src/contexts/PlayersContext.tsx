// Vendor
import React, { useContext, createContext, ReactElement, ReactNode, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
import { Player } from '@uno/types/player';

import mockUser from '@uno/mocks/users';

const KEY = 'uno-calculator-players';

type PlayersData = {
  playerList: Player[];
};

const setAppData = async (data: PlayersData) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
};

const getAppData = async (): Promise<PlayersData | null> => {
  try {
    const response = await AsyncStorage.getItem(KEY);
    if (response) {
      return JSON.parse(response);
    }
  } catch {}

  return null;
};

type PlayersContextType = {
  playerList: Player[];
  handleAddPlayer: (playerName: string) => Player;
  handleUpdateAllPlayers: (player: Player, winnerId: string) => void;
};

type Props = {
  children: ReactNode;
};

const DEFAULT_PLAYER = {
  id: '',
  name: '',
  totalPoints: 0,
  pointsInGame: 0,
  gamesWon: 0,
};

const PlayerContext = createContext<PlayersContextType>({
  playerList: [],
  handleAddPlayer: () => DEFAULT_PLAYER,
  handleUpdateAllPlayers: () => {},
});

export const PlayerContextProvider = ({ children }: Props): ReactElement => {
  const [playerList, setPlayerList] = useState<Player[]>([...mockUser]);

  const handleAddPlayer = useCallback((player: string) => {
    const newPlayer = { name: player, id: Date.now().toString(), totalPoints: 0, pointsInGame: 0, gamesWon: 0 };

    setPlayerList(current => {
      const newPlayerList = [...current, newPlayer];

      setAppData({ playerList: newPlayerList });

      return newPlayerList;
    });

    return newPlayer;
  }, []);

  const handleUpdateAllPlayers = useCallback((player: Player, winnerId: string) => {
    setPlayerList(current => {
      const newPlayerList = current.map(p => {
        if (p.id === player.id) {
          return {
            ...p,
            totalPoints: p.totalPoints + player.pointsInGame,
            gameWon: winnerId === p.id ? p.gamesWon + 1 : p.gamesWon,
            pointsInGame: 0,
          };
        } else {
          return p;
        }
      });

      setAppData({ playerList: newPlayerList });

      return newPlayerList;
    });
  }, []);

  useEffect(() => {
    AsyncStorage.clear();

    (async () => {
      const data = await getAppData();

      if (data) {
        setPlayerList(data.playerList);
      }
    })();
  }, []);

  return (
    <PlayerContext.Provider value={{ playerList, handleAddPlayer, handleUpdateAllPlayers }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
