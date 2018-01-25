import React from 'react';
import { Text, View, Button } from 'react-native';

export default class EmployeeScreen extends React.Component {
	handlePress = () => {
		this.props.navigation.navigate('NewScreen');
	}	
  render() {
    return (
      <View>
        <Text>Employee Screen</Text>
        <Button onPress={this.handlePress} title='new screen'/>
      </View>
    );
  }
}