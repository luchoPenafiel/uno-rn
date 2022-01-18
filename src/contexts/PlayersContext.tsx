// Vendor
import React, { useContext, createContext, ReactElement, ReactNode, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
import { Player } from '@uno/types/player';

const KEY = 'uno-calculator-data';

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
  handleAddPlayer: (selectedMood: Player) => void;
  handleUpdatePlayer: (selectedMood: Player) => void;
};

type Props = {
  children: ReactNode;
};

const PlayerContext = createContext<PlayersContextType>({
  playerList: [],
  handleAddPlayer: () => {},
  handleUpdatePlayer: () => {},
});

export const PlayerContextProvider = ({ children }: Props): ReactElement => {
  const [playerList, setPlayerList] = useState<Player[]>([]);

  const handleAddPlayer = useCallback((player: Player) => {
    setPlayerList(current => {
      const newPlayer = [...current, { name: player.name, id: Date.now().toString(), points: 0 }];

      setAppData({ playerList: newPlayer });

      return newPlayer;
    });
  }, []);

  const handleUpdatePlayer = useCallback((player: Player) => {
    setPlayerList(current => {
      const newPlayerList = current.map(p => {
        if (p.id === player.id) {
          return {
            ...p,
            points: p.points + player.points,
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
        setPlayerList(data.playerList);
      }
    })();
  }, []);

  return (
    <PlayerContext.Provider value={{ playerList, handleAddPlayer, handleUpdatePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
