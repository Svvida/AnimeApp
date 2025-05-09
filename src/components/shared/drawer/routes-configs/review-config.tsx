import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawerItem from '../elements/custom-drawer-item';

const ReviewsConfig = () => {
  return <CustomDrawerItem label="Reviews" icon={<Ionicons name="document-text-outline" size={24} />} route="reviews" />;
};

export default ReviewsConfig;
