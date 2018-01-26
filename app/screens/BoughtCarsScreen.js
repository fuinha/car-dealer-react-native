import React from 'react';
import { Text, View, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import RequestService from '../services/requestService';

export default class BoughtCarsScreen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      cars: []
    };
  }
  componentWillMount() {
    //console.log(this.props.navigation.state);
    this.setState(() => {
      return {
        cars: this.props.navigation.state.params
      }
    });
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.state.cars}
          extraData={this.state}
          renderItem={({item}) => (
            <ListItem roundAvatar
                      //avatar={item.avatar}
                      title={`${item.name} | ${item.type}`}
                      subtitle={`Quantity: ${item.quantity}`}
                      // onPress={() => this.editMovie(item)}
                      // onLongPress={() => this.openModal(item)} 
            />
          )}
        />
      </View>
    );
  }
}