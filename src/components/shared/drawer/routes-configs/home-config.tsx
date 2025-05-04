import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawerItem from '../elements/custom-drawer-item';

const HomeConfig = () => {
  return <CustomDrawerItem label="Home" icon={<Ionicons name="grid-outline" size={24} />} route="home" />;
};

export default HomeConfig;
