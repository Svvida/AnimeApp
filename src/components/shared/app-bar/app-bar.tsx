import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import exampleUserIcon from '@/assets/images/exampleUserIcon.png';
import logoHeader from '@/assets/images/logoheader.png';
import { useTransformFade } from '@/hooks/animations/use-transform-fade-in';

const AppBar: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  const animatedMenuStyle = useTransformFade({ direction: 'right' });
  const animatedProfileStyle = useTransformFade({ direction: 'left' });
  const animatedLogoStyle = useTransformFade({ direction: 'bottom' });

  const handleProfileClick = () => {
    navigation.navigate('home');
  };

  return (
    <View className="bg-primary flex flex-row justify-between items-center px-4 py-2">
      <Animated.View style={animatedMenuStyle}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={28} color="white" className="w-[50px]" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={animatedLogoStyle}>
        <Image source={logoHeader} style={{ width: 50, height: 50 }} resizeMode="contain" />
      </Animated.View>
      <View>
        <Animated.View style={animatedProfileStyle}>
          <TouchableOpacity onPress={handleProfileClick} style={animatedProfileStyle}>
            <Image source={exampleUserIcon} style={{ width: 50, height: 50 }} resizeMode="contain" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default AppBar;
