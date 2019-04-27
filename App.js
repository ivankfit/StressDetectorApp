import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,StatusBar,TouchableOpacity,ScrollView,Dimensions,
} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation';


import Home from './src/Home';
import Data from './src/Data';
import BT from './BT';




////// navigation 
const Navigation = createStackNavigator({
  First : {screen :Home,navigationOptions:{
    header:null,
  } },
  Second : {screen :BT,navigationOptions:{
    header:null,
  } },
  Third : {screen :Data,navigationOptions:{
    header:null,
  }},

  });

  const AppC =createAppContainer(Navigation);
export default AppC;
