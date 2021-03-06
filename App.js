import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from "./components/StartScreen";
import PlayerScreen from "./components/PlayerScreen";
import ExpansionScreen from "./components/ExpansionScreen";
import Main from "./components/Main";
import BluePoints from "./components/BluePoints";
import GreenPoints from "./components/GreenPoints";
import BlackPoints from "./components/BlackPoints";
import RedPoints from "./components/RedPoints";
import YellowPoints from "./components/YellowPoints";
import WildPoints from "./components/WildPoints";
import FinalScores from "./components/FinalScores";
import End from "./components/End";
import GameHistory from "./components/GameHistory";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Alkuvalikko" component={StartScreen} />
        <Stack.Screen name="Historia" component={GameHistory} />
        <Stack.Screen name="Pelaajat" component={PlayerScreen} />
        <Stack.Screen name="Lisäosat" component={ExpansionScreen} />
        <Stack.Screen name="Laskuri" component={Main} />
        <Stack.Screen name="Sininen" component={BluePoints} />
        <Stack.Screen name="Vihreä" component={GreenPoints} />
        <Stack.Screen name="Musta" component={BlackPoints} />
        <Stack.Screen name="Punainen" component={RedPoints} />
        <Stack.Screen name="Keltainen" component={YellowPoints} />
        <Stack.Screen name="Extra" component={WildPoints} />
        <Stack.Screen name="Loppupisteytys" component={FinalScores} />
        <Stack.Screen name="Tulokset" component={End} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
