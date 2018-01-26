import React from 'react';
import { StackNavigator } from 'react-navigation';
import { TabNavigator } from 'react-navigation';

import ClientScreen from '../screens/ClientScreen';
import EmployeeScreen from '../screens/EmployeeScreen';
import NewScreen from '../screens/NewScreen';
import AddCarScreen from '../screens/AddCarScreen';
import BoughtCarsScreen from '../screens/BoughtCarsScreen';

export const Router = TabNavigator({
  ClientScreenNavigator: {
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
      },
      BoughtCarsScreen: {
        screen: BoughtCarsScreen,
        navigationOptions: {
          title: 'Your Cars'
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
      AddCarScreen: {
        screen: AddCarScreen,
        navigationOptions: {
          title: 'Add Car'
        }
      }
    })
  }
});