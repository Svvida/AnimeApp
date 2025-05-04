import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawerItem from '../elements/custom-drawer-item';

const AnimeConfig = () => {
  return <CustomDrawerItem label="Anime" icon={<Ionicons name="film-outline" size={24} />} route="anime" />;
};

export default AnimeConfig;
