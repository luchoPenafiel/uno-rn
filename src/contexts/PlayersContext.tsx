// Vendor
import React, { useContext, createContext, ReactElement, ReactNode, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
import { Player } from '@uno/types/player';

const KEY = 'uno-calculator-players';

type PlayersData = {
  playerList: Player[];
};

const setAppData = async (data: PlayersData) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
};

export const getAppData = async (): Promise<PlayersData | null> => {
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
  setUpdateAllPlayers: (player: Player[], winnerId: string) => void;
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
  const [playerList, setStatePlayerList] = useState<Player[]>([]);

  const setNewPlayer = useCallback((player: string) => {
    const newPlayer = { name: player, id: Date.now().toString(), totalPoints: 0, pointsInGame: 0, gamesWon: 0 };

    setStatePlayerList(current => {
      const newPlayerList = [...current, newPlayer];

      setAppData({ playerList: newPlayerList });

      return newPlayerList;
    });

    return newPlayer;
  }, []);

  const setUpdateAllPlayers = (player: Player[], winnerId: string) => {
    const newPlayerList = playerList.map(p => {
      const playerToUpdate: Player | undefined = player.find(pl => pl.id === p.id);

      if (playerToUpdate) {
        return {
          ...playerToUpdate,
          totalPoints: playerToUpdate.totalPoints + playerToUpdate.pointsInGame,
          gamesWon: winnerId === playerToUpdate.id ? playerToUpdate.gamesWon + 1 : playerToUpdate.gamesWon,
          pointsInGame: 0,
        };
      } else {
        return p;
      }
    });

    setStatePlayerList(newPlayerList);
    setAppData({ playerList: [...newPlayerList] });
  };

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
