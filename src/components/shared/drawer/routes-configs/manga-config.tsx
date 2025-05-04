import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawerItem from '../elements/custom-drawer-item';

const MangaConfig = () => {
  return <CustomDrawerItem label="Manga" icon={<Ionicons name="film-outline" size={24} />} route="manga" />;
};

export default MangaConfig;
