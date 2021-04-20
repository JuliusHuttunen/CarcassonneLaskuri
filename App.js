import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from "./components/StartScreen";
import PlayerScreen from "./components/PlayerScreen";
import ExpansionScreen from "./components/ExpansionScreen";
import Main from "./components/Main";
import BluePoints from "./components/BluePoints";
import GreenPoints from "./components/GreenPoints";

const Stack = createStackNavigator();

function BlackPoints({ navigation }) {
  return (
    <View></View>
  )
}

function RedPoints({ navigation }) {
  return (
    <View></View>
  )
}

function YellowPoints({ navigation }) {
  return (
    <View></View>
  )
}

function WildPoints({ navigation }) {
  return (
    <View></View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Alkuvalikko" component={StartScreen} />
        <Stack.Screen name="Pelaajat" component={PlayerScreen} />
        <Stack.Screen name="Lisäosat" component={ExpansionScreen} />
        <Stack.Screen name="Laskuri" component={Main} />
        <Stack.Screen name="Sininen" component={BluePoints} />
        <Stack.Screen name="Vihreä" component={GreenPoints} />
        <Stack.Screen name="Musta" component={BlackPoints} />
        <Stack.Screen name="Punainen" component={RedPoints} />
        <Stack.Screen name="Keltainen" component={YellowPoints} />
        <Stack.Screen name="Extra" component={WildPoints} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
