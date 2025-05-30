import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import '@/assets/styles/global.css';
import SpaceMonoFont from '../src/assets/fonts/Rubik-VariableFont_wght.ttf';
import Header from '@/components/shared/app-bar/app-bar';
import { CustomDrawerContent } from '@/components/shared/drawer/drawer';
import SnackbarProvider from '@/providers/snackbar/snackbar-provider';
import { store } from '@/redux/config/store';
import '@/configs/day-js-config';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: SpaceMonoFont,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <Host>
      <SnackbarProvider>
        <Provider store={store}>
          <GestureHandlerRootView className="flex-1 bg-white">
            <Drawer
              screenOptions={{
                header: () => <Header />,
                sceneStyle: {
                  backgroundColor: 'white',
                },
              }}
              drawerContent={props => <CustomDrawerContent {...props} />}
            >
              <Slot />
            </Drawer>
          </GestureHandlerRootView>
        </Provider>
      </SnackbarProvider>
    </Host>
  );
}
