import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Constants from 'expo-constants';

const Tela1 = () => {
  return (
    <View style={Pai.container}>
      <View style={Filho1.container}>
        <View style={Filho3.container}>
          <Image
            style={logo.container}
            source={require('../assets/adaptive-icon.png')} 
          />
        </View>
        <View style={Filho4.container}>
          <View style={Filho5.container}>
            <Image
              style={logo.container}
              source={require('../assets/adaptive-icon.png')} 
            />
          </View>
          <View style={Filho6.container}>
            <Image
              style={logo.container}
              source={require('../assets/adaptive-icon.png')} 
            />
          </View>
        </View>
      </View>
      <View style={Filho2.container}>
        <Image
          style={logo.container}
          source={require('../assets/adaptive-icon.png')} 
        />
      </View>
    </View>
  );
}

const Pai = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Constants.statusBarHeight,
  },
});

const Filho1 = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

const Filho2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'salmon',
    justifyContent: 'center',
  },
});

const Filho3 = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: 'lime',
    justifyContent: 'center',
  },
});

const Filho4 = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const Filho5 = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: 'teal',
    justifyContent: 'center',
  },
});

const Filho6 = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
  },
});

const logo = StyleSheet.create({
  container: {
    width: 100,  
    height: 100, 
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default Tela1;
