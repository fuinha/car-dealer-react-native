import React from 'react';
import { Text, View, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import RequestService from '../services/requestService';

export default class ClientScreen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      cars: []
    };
  }
  componentDidMount() {
    new Promise((resolve, reject) => {
      RequestService.get('/cars')
        .then((res) => {
          resolve(res);

          let cars = res.map((el) => {
            let obj = Object.assign({}, el);
            obj.key = el.id
            return obj;
          })

          this.setState(() => {
            return {
              cars: [
                ...cars,
              ]
            }
          });
        })
        .catch((err) => {
          reject(err);
        })
    })
  }
	handlePress = () => {
		this.props.navigation.navigate('NewScreen');
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
                      title={item.name}
                      subtitle={`Quantity: ${item.quantity} # Type: ${item.type}`}
                      // onPress={() => this.editMovie(item)}
                      // onLongPress={() => this.openModal(item)} 
            />
          )}
        />
        <Button onPress={this.handlePress} title='new screen'/>
      </View>
    );
  }
}