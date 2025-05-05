import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawerItem from '../elements/custom-drawer-item';

const ReviewsConfig = () => {
  return <CustomDrawerItem label="Reviews" icon={<Ionicons name="book-outline" size={24} />} route="reviews" />;
};

export default ReviewsConfig;
