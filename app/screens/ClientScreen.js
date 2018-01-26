import React from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import WS from 'react-native-websocket';

import RequestService from '../services/requestService';

export default class ClientScreen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      cars: [],
      boughtCars: [],
      indicatorVisible: false
    };
  }
  componentDidMount() {
    this.toggleIndicator();
    new Promise((resolve, reject) => {
      RequestService.get('/cars')
        .then((res) => {
          resolve(res);
          this.toggleIndicator();

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
          this.toggleIndicator();
        })
    })
  }
	handlePress = () => {
		this.props.navigation.navigate('NewScreen');
	}
  yourCars = () => {
    this.props.navigation.navigate('BoughtCarsScreen', this.state.boughtCars);
  }
  buyCar = (car) => {
    this.setState(() => {
      return {
        boughtCars: [
          ...this.state.boughtCars,
          car
        ]
      }
    });

    this.props.navigation.navigate('BoughtCarsScreen', this.state.boughtCars);
  }
  handleReceiveWs = (event) => {
    const newCar = JSON.parse(event.data)
    newCar.key = newCar.id

    this.setState(() => {
      return {
        cars: [
          newCar,
          ...this.state.cars
        ]
      }
    });
  }
  toggleIndicator = () => {
    this.setState(() => {
      return {
        indicatorVisible: !this.state.indicatorVisible
      }
    });
  }
  render() {
    return (
      <View>
        <ActivityIndicator size="small" color="#00ff00" animating={this.state.indicatorVisible}/>
        <FlatList
          data={this.state.cars}
          extraData={this.state}
          renderItem={({item}) => (
            <ListItem roundAvatar
                      //avatar={item.avatar}
                      title={`${item.name} | ${item.type}`}
                      subtitle={`Quantity: ${item.quantity}`}
                      onPress={() => this.buyCar(item)}
                      // onLongPress={() => this.openModal(item)} 
            />
          )}
        />
        <Text />
        <Button onPress={this.handlePress} title='New Screen'/>
        <Text />
        <Button onPress={this.yourCars} title='Your Cars'/>
        <WS
          ref={ref => {this.ws = ref}}
          url="ws://192.168.1.100:4000"
          onOpen={() => {
            console.log('Open!')
          }}
          onMessage={this.handleReceiveWs}
          // onError={console.log('eroare ws')}
          onClose={console.log('CLOSE WS')}
          reconnect // Will try to reconnect onClose
        />
      </View>
    );
  }
}