import React from 'react';
import { StackNavigator } from 'react-navigation';
import { TabNavigator } from 'react-navigation';

import ClientScreen from '../screens/ClientScreen';
import EmployeeScreen from '../screens/EmployeeScreen';
import NewScreen from '../screens/NewScreen';

export const Router = TabNavigator({
  ClienScreenNavigator: {
    screen: StackNavigator({
      ClientScreen: {
        screen: ClientScreen,
        navigationOptions: {
          title: 'Client'
        }
      },
      NewScreen: {
        screen: NewScreen,
        navigationOptions: {
          title: 'New'
        }
      }
    })
  },
  EmployeeScreenNavigator: {
    screen: StackNavigator({
      EmployeeScreen: {
        screen: EmployeeScreen,
        navigationOptions: {
          title: 'Employee'
        }
      },
      NewScreen: {
        screen: NewScreen,
        navigationOptions: {
          title: 'New'
        }
      }
    })
  }
});