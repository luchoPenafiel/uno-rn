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
  setNewPlayer: (playerName: string) => Player;
  setUpdateAllPlayers: (player: Player, winnerId: string) => void;
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
  setNewPlayer: () => DEFAULT_PLAYER,
  setUpdateAllPlayers: () => {},
});

export const PlayerContextProvider = ({ children }: Props): ReactElement => {
  const [playerList, setStatePlayerList] = useState<Player[]>([...mockUser]);

  const setNewPlayer = useCallback((player: string) => {
    const newPlayer = { name: player, id: Date.now().toString(), totalPoints: 0, pointsInGame: 0, gamesWon: 0 };

    setStatePlayerList(current => {
      const newPlayerList = [...current, newPlayer];

      setAppData({ playerList: newPlayerList });

      return newPlayerList;
    });

    return newPlayer;
  }, []);

  const setUpdateAllPlayers = useCallback((player: Player, winnerId: string) => {
    setStatePlayerList(current => {
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
    (async () => {
      const data = await getAppData();

      if (data) {
        setStatePlayerList(data.playerList);
      }
    })();
  }, []);

  return (
    <PlayerContext.Provider value={{ playerList, setNewPlayer, setUpdateAllPlayers }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
