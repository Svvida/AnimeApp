import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import AnimeConfig from './routes-configs/anime-config';
import HomeConfig from './routes-configs/home-config';
import MangaConfig from './routes-configs/manga-config';
import ReviewsConfig from './routes-configs/review-config';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
      <View className="px-2 py-4 flex flex-grow">
        <View className="flex items-end">
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()} className="p-[0.1] ml-auto">
            <Ionicons name="close" size={22} color="black" />
          </TouchableOpacity>
        </View>

        <View className="flex gap-4 flex-grow">
          {/* All navigation options visible to everyone */}
          <HomeConfig />
          <AnimeConfig />
          <MangaConfig />
          <ReviewsConfig />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
