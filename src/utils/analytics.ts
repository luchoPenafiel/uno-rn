import analytics from '@react-native-firebase/analytics';

export const trackScreen = async (screen: string): Promise<void> => {
  try {
    await analytics().logScreenView({
      screen_name: screen,
      screen_class: screen,
    });
  } catch {}
};

export const logEvent = async (event: string, details?: any): Promise<void> => {
  try {
    await analytics().logEvent(event, details);
  } catch {}
};
