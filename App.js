import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ImageBackground, Image, TouchableOpacity, Switch, FlatList, Touchable, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AppLoading from 'expo-app-loading';
import { useFonts, Fondamento_400Regular } from '@expo-google-fonts/fondamento';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from "@react-navigation/native";


const Stack = createStackNavigator();


//Aloitusnäyttö
function StartScreen({ navigation }) {

  let [fontsLoaded] = useFonts({
    Fondamento_400Regular,
  });

  const startTitle = "Uusi peli";
  const historyTitle = "Menneet pelit";

  const startCounter = () => {
    navigation.navigate("Pelaajat");
  }
  const showHistory = () => {
    console.log("Historia")
  }

  const StartButton = () => (
    <TouchableOpacity onPress={startCounter} style={styles.menuButtonContainer}>
      <Text style={styles.menuButtonText}>{startTitle}</Text>
    </TouchableOpacity>
  );

  const HistoryButton = () => (
    <TouchableOpacity onPress={showHistory} style={styles.menuButtonContainer}>
      <Text style={styles.menuButtonText}>{historyTitle}</Text>
    </TouchableOpacity>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ImageBackground
      style={styles.imgBackground}
      resizeMode='cover'
      source={require("./img/starttile1_edit_blur.jpg")}>
      <View style={styles.main}>
        <View style={styles.menuHeader}>
          <Image style={styles.logo} source={require("./img/carcassonne_icons_main_only.png")} />
          <Text style={styles.menuText}>Pistelaskuri</Text></View>
        <View style={styles.mainContainer}>
          <StartButton></StartButton>
          <HistoryButton></HistoryButton>
        </View>
      </View>
    </ImageBackground >
  )
}

// Pelaajien määritys
function PlayerScreen({ navigation }) {

  let [fontsLoaded] = useFonts({
    Fondamento_400Regular,
  });

  const [score, setScore] = useState(0);
  const [blueName, setBlueName] = useState('');
  const [greenName, setGreenName] = useState('');
  const [blackName, setBlackName] = useState('');
  const [redName, setRedName] = useState('');
  const [yellowName, setYellowName] = useState('');
  const [wildName, setWildName] = useState('');
  const [votes, setVotes] = useState(0);
  const [players, setPlayers] = useState([]);
  const db = SQLite.openDatabase('laskuri.db');
  const title = "Seuraava";

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('drop table players;');
    }, updateList);

  }, []);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists players (id integer primary key not null, score int, name text, votes int, color text);');
      tx.executeSql('create table if not exists bluepoints (id integer primary key not null, feature text, score int, color text);');
      tx.executeSql('create table if not exists greenpoints (id integer primary key not null, feature text, score int, color text);');
    }, updateList);
  }, []);

  const saveBlue = () => {
    db.transaction(tx => {
      tx.executeSql('insert into players (score, name, votes, color) values (?, ?, ?, ?);',
        [parseInt(score), blueName, parseInt(votes), 'blue']);
    }, null, updateList
    )
  }

  const saveGreen = () => {
    db.transaction(tx => {
      tx.executeSql('insert into players (score, name, votes, color) values (?, ?, ?, ?);',
        [parseInt(score), greenName, parseInt(votes), 'green']);
    }, null, updateList
    )
  }

  const saveBlack = () => {
    db.transaction(tx => {
      tx.executeSql('insert into players (score, name, votes, color) values (?, ?, ?, ?);',
        [parseInt(score), blackName, parseInt(votes), 'black']);
    }, null, updateList
    )
  }

  const saveRed = () => {
    db.transaction(tx => {
      tx.executeSql('insert into players (score, name, votes, color) values (?, ?, ?, ?);',
        [parseInt(score), redName, parseInt(votes), 'red']);
    }, null, updateList
    )
  }

  const saveYellow = () => {
    db.transaction(tx => {
      tx.executeSql('insert into players (score, name, votes, color) values (?, ?, ?, ?);',
        [parseInt(score), yellowName, parseInt(votes), 'yellow']);
    }, null, updateList
    )
  }

  const saveWild = () => {
    db.transaction(tx => {
      tx.executeSql('insert into players (score, name, votes, color) values (?, ?, ?, ?);',
        [parseInt(score), wildName, parseInt(votes), 'wild']);
    }, null, updateList
    )
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from players;', [], (_, { rows }) =>
        setPlayers(rows._array)
      );
    });
  }

  const savePlayers = () => {
    if (!blueName == '') {
      saveBlue()
    }
    if (!greenName == '') {
      saveGreen()
    }
    if (!blackName == '') {
      saveBlack()
    }
    if (!redName == '') {
      saveRed()
    }
    if (!yellowName == '') {
      saveYellow()
    }
    if (!wildName == '') {
      saveWild()
    }
    navigation.navigate('Lisäosat');
  }

  const AppButton = () => (
    <TouchableOpacity onPress={savePlayers} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (

    <ImageBackground
      style={styles.imgBackground}
      resizeMode='cover'
      source={require("./img/starttile1_edit_blur.jpg")}>
      <View style={styles.container}>
        <Text style={styles.header}>Pelaajat</Text>
        <View style={styles.playerWrapper}>
          <Image style={styles.meeple} source={require("./img/carcassonne_icons_ukko_blue.png")} />
          <TextInput style={styles.input} placeholder='Sininen' onChangeText={blueName => setBlueName(blueName)}
            value={blueName} />
        </View>
        <View style={styles.playerWrapper}>
          <Image style={styles.meeple} source={require("./img/carcassonne_icons_ukko_green.png")} />
          <TextInput style={styles.input} placeholder='Vihreä' onChangeText={greenName => setGreenName(greenName)}
            value={greenName} />
        </View>
        <View style={styles.playerWrapper}>
          <Image style={styles.meeple} source={require("./img/carcassonne_icons_ukko_black.png")} />
          <TextInput style={styles.input} placeholder='Musta' onChangeText={blackName => setBlackName(blackName)}
            value={blackName} />
        </View>
        <View style={styles.playerWrapper}>
          <Image style={styles.meeple} source={require("./img/carcassonne_icons_ukko_red.png")} />
          <TextInput style={styles.input} placeholder='Punainen' onChangeText={redName => setRedName(redName)}
            value={redName} />
        </View>
        <View style={styles.playerWrapper}>
          <Image style={styles.meeple} source={require("./img/carcassonne_icons_ukko_yellow.png")} />
          <TextInput style={styles.input} placeholder='Keltainen' onChangeText={yellowName => setYellowName(yellowName)}
            value={yellowName} />
        </View>
        <View style={styles.playerWrapper}>
          <Image style={styles.meepleGrey} source={require("./img/carcassonne_icons_ukko_grey.png")} />
          <Image style={styles.meeplePink} source={require("./img/carcassonne_icons_ukko_pink.png")} />
          <TextInput style={styles.input} placeholder='Extra' onChangeText={wildName => setWildName(wildName)}
            value={wildName} />
        </View>
        <View style={styles.buttonWrapper}>
          <AppButton></AppButton>
        </View>
      </View>
    </ImageBackground >
  )
}


// Määritetään käytettävät lisäosat
function ExpansionScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Fondamento_400Regular,
  });

  const [enabledKirkot, setEnabledKirkot] = useState(false);
  const [enabledKirjurit, setEnabledKirjurit] = useState(false);
  const title = "Seuraava";

  const toggleKirkot = (value) => {
    setEnabledKirkot(value);
  }

  const toggleKirjurit = (value) => {
    setEnabledKirjurit(value);
  }


  const AppButton = () => (
    <TouchableOpacity onPress={test} style={styles.appButtonContainerExpansion}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  const test = () => {
    console.log(enabledKirkot);
    console.log(enabledKirjurit);
    navigation.navigate("Laskuri");
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (

    <ImageBackground
      style={styles.imgBackground}
      resizeMode='cover'
      source={require("./img/starttile1_edit_blur.jpg")}>
      <View style={styles.expansionContainer}>
        <Text style={styles.header}>Lisäosat</Text>
        <View style={styles.expansionWrapper}>
          <Image style={styles.exMeeple} source={require("./img/carcassonne_icons_ukko_black.png")} />
          <Text style={styles.expansionText}>Kirkot ja kievarit</Text>
          <Switch style={{ marginRight: 5 }} onValueChange={toggleKirkot} value={enabledKirkot}></Switch>
        </View>
        <View style={styles.expansionWrapper}>
          <Image style={styles.pig} source={require("./img/carcassonne_icons_possu.png")} />
          <Text style={styles.expansionText}>Kirjurit ja kauppiaat</Text>
          <Switch style={{ marginRight: 5 }} onValueChange={toggleKirjurit} value={enabledKirjurit}></Switch>
        </View>
        <View style={styles.buttonWrapper}>
          <AppButton></AppButton>
        </View>
      </View>
    </ImageBackground >
  )
}

// Pistelaskuri
function Main({ navigation }) {

  let [fontsLoaded] = useFonts({
    Fondamento_400Regular,
  });
  const [players, setPlayers] = useState([]);
  const db = SQLite.openDatabase('laskuri.db');
  const title = "Loppupisteytys";

  /*useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('select * from players order by score desc;', [], (_, { rows }) =>
        setPlayers(rows._array)
      );
    }, null, updateList);
  }, []);*/

  useFocusEffect(React.useCallback(() => {
    db.transaction(tx => {
      tx.executeSql('select * from players order by score desc;', [], (_, { rows }) =>
        setPlayers(rows._array)
      );
    }, null, updateList);
  }, []));

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from players order by score desc;', [], (_, { rows }) =>
        setPlayers(rows._array)
      );
    });
  }

  const AppButton = () => (
    <TouchableOpacity onPress={console.log("Loppu")} style={styles.mainAppButtonContainer}>
      <Text style={styles.mainAppButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  const navigateBlue = () => {
    navigation.navigate("Sininen");
  }
  const navigateGreen = () => {
    navigation.navigate("Vihreä");
  }
  const navigateBlack = () => {
    navigation.navigate("Musta");
  }
  const navigateRed = () => {
    navigation.navigate("Punainen");
  }
  const navigateYellow = () => {
    navigation.navigate("Keltainen");
  }
  const navigateWild = () => {
    navigation.navigate("Extra");
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (

    <ImageBackground
      style={styles.imgBackground}
      resizeMode='cover'
      source={require("./img/starttile1_edit_blur.jpg")}>
      <View style={styles.counterContainer}>
        <Text style={styles.header}>Pisteet</Text>
        <FlatList
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            if (item.color == 'blue') {
              return (
                <TouchableOpacity style={styles.bluePlayer} onPress={navigateBlue}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text></TouchableOpacity>
              )
            }
            if (item.color == 'green') {
              return (
                <TouchableOpacity style={styles.greenPlayer} onPress={navigateGreen}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text></TouchableOpacity>
              )
            }
            if (item.color == 'black') {
              return (
                <TouchableOpacity style={styles.blackPlayer} onPress={navigateBlack}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text></TouchableOpacity>
              )
            }
            if (item.color == 'red') {
              return (
                <TouchableOpacity style={styles.redPlayer} onPress={navigateRed}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text></TouchableOpacity>
              )
            }
            if (item.color == 'yellow') {
              return (
                <TouchableOpacity style={styles.yellowPlayer} onPress={navigateYellow}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text></TouchableOpacity>
              )
            }
            if (item.color == 'wild') {
              return (
                <TouchableOpacity onPress={navigateWild}>
                  <LinearGradient
                    style={styles.wildPlayer} colors={['#d673be', '#8a8f8b']}><Text style={styles.playersText}>{item.name}</Text><Text style={styles.playersText}>{item.score}</Text></LinearGradient></TouchableOpacity>
              )
            }
          }}
          data={players}
        />
        <View style={styles.mainButtonWrapper}>
          <AppButton></AppButton>
        </View>
      </View>
    </ImageBackground >
  )
}

//Pistetemplatet
function bluePoints({ navigation }) {

  const db = SQLite.openDatabase('laskuri.db');
  const [blue, setBlue] = useState([]);
  const [scoreTown, setScoreTown] = useState(0);
  const [scoreRoad, setScoreRoad] = useState(0);
  const [scoreMonastery, setScoreMonastery] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

  let [fontsLoaded] = useFonts({
    Fondamento_400Regular,
  });

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('select * from bluepoints order by id desc;', [], (_, { rows }) =>
        setBlue(rows._array)
      );
    }, null, updateList, updateScore);
  }, []);

  const saveBlueTown = () => {
    db.transaction(tx => {
      tx.executeSql('insert into bluepoints (feature, score, color) values (?, ?, ?);',
        ['Kaupunki', parseInt(scoreTown * 2), 'blue']);
    }, null, updateList
    )
  }

  const saveBlueRoad = () => {
    db.transaction(tx => {
      tx.executeSql('insert into bluepoints (feature, score, color) values (?, ?, ?);',
        ['Tie', parseInt(scoreRoad), 'blue']);
    }, null, updateList
    )
  }

  const saveBlueMonastery = () => {
    db.transaction(tx => {
      tx.executeSql('insert into bluepoints (feature, score, color) values (?, ?, ?);',
        ['Luostari', parseInt(scoreMonastery), 'blue']);
    }, null, updateList
    )
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from bluepoints where id = ?;`, [id]);
      }, null, updateList
    )
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from bluepoints order by id desc;', [], (_, { rows }) =>
        setBlue(rows._array)
      );
    }, null, updateScore
    )
  }

  const updateScore = () => {
    db.transaction(tx => {
      tx.executeSql('select sum(score) as finalpoints from bluepoints;', [], (_, { rows }) =>
        setFinalScore(rows.item(0).finalpoints)
      );
    }, null, updatePlayer
    )
  }

  const updatePlayer = () => {
    db.transaction(tx => {
      tx.executeSql('update players set score = ? where color="blue";',
        [finalScore]);
    }
    )
  }

  const ListSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "black"
        }}
      />
    );
  };

  const backTo = () => {
    updateScore();
    navigateBack();
  }

  const navigateBack = () => {
    navigation.navigate("Laskuri");
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ImageBackground
      style={styles.imgBackground}
      resizeMode='cover'
      source={require("./img/starttile1_edit_blur.jpg")}>
      <View style={styles.pointcontainer}>
        <Text style={styles.pointsheader}>Sininen</Text>
        <View style={styles.featureWrapper}>
          <View style={styles.playerFeatureWrapper}>
            <Image style={styles.city} source={require("./img/city.png")} />
            <TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(scoreTown) => setScoreTown(scoreTown)}
              value={scoreTown} />
            <Button title="Tallenna" onPress={saveBlueTown}></Button>
          </View>
          <View style={styles.playerFeatureWrapper}>
            <Image style={styles.road} source={require("./img/road.png")} />
            <TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(scoreRoad) => setScoreRoad(scoreRoad)}
              value={scoreRoad} />
            <Button title="Tallenna" onPress={saveBlueRoad}></Button>
          </View>
          <View style={styles.playerFeatureWrapper}>
            <Image style={styles.monastery} source={require("./img/monastery.png")} />
            <TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(scoreMonastery) => setScoreMonastery(scoreMonastery)}
              value={scoreMonastery} />
            <Button title="Tallenna" onPress={saveBlueMonastery}></Button>
          </View>
        </View>
        <View style={styles.returnWrapper}>
          <Button onPress={backTo} title="Takaisin"></Button>
          <Text>{finalScore}</Text>
        </View>
        <View style={styles.playerFlatlist}>
          <FlatList
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <View><View style={styles.listcontainer}><Text style={{ fontSize: 18 }}>{item.feature}, pisteet: {item.score} </Text>
              <Text style={{ fontSize: 18, color: '#ffffff', borderWidth: 1, backgroundColor: 'crimson', borderRadius: 5, padding: 3, marginLeft: "5%" }} onPress={() => deleteItem(item.id)}>Peru</Text></View>
              <View><ListSeparator /></View></View>}
            data={blue}
          />
        </View>
      </View>
    </ImageBackground>
  )
}

function greenPoints({ navigation }) {
  const db = SQLite.openDatabase('laskuri.db');
  const [green, setGreen] = useState([]);
  const [scoreTown, setScoreTown] = useState(0);
  const [scoreRoad, setScoreRoad] = useState(0);
  const [scoreMonastery, setScoreMonastery] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

  let [fontsLoaded] = useFonts({
    Fondamento_400Regular,
  });

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('select * from greenpoints order by id desc;', [], (_, { rows }) =>
        setBlue(rows._array)
      );
    }, null, updateList, updateScore);
  }, []);

  const saveTown = () => {
    db.transaction(tx => {
      tx.executeSql('insert into greenpoints (feature, score, color) values (?, ?, ?);',
        ['Kaupunki', parseInt(scoreTown * 2), 'green']);
    }, null, updateList
    )
  }

  const saveRoad = () => {
    db.transaction(tx => {
      tx.executeSql('insert into greenpoints (feature, score, color) values (?, ?, ?);',
        ['Tie', parseInt(scoreRoad), 'green']);
    }, null, updateList
    )
  }

  const saveMonastery = () => {
    db.transaction(tx => {
      tx.executeSql('insert into greenpoints (feature, score, color) values (?, ?, ?);',
        ['Luostari', parseInt(scoreMonastery), 'green']);
    }, null, updateList
    )
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from greenpoints where id = ?;`, [id]);
      }, null, updateList
    )
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from greenpoints order by id desc;', [], (_, { rows }) =>
        setGreen(rows._array)
      );
    }, null, updateScore
    )
  }

  const updateScore = () => {
    db.transaction(tx => {
      tx.executeSql('select sum(score) as finalpoints from greenpoints;', [], (_, { rows }) =>
        setFinalScore(rows.item(0).finalpoints)
      );
    }, null, updatePlayer
    )
  }

  const updatePlayer = () => {
    db.transaction(tx => {
      tx.executeSql('update players set score = ? where color="green";',
        [finalScore]);
    }
    )
  }

  const ListSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "black"
        }}
      />
    );
  };

  const backTo = () => {
    updateScore();
    navigateBack();
  }

  const navigateBack = () => {
    navigation.navigate("Laskuri");
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ImageBackground
      style={styles.imgBackground}
      resizeMode='cover'
      source={require("./img/starttile1_edit_blur.jpg")}>
      <View style={styles.pointcontainer}>
        <Text style={styles.pointsheader}>Vihreä</Text>
        <View style={styles.featureWrapper}>
          <View style={styles.playerFeatureWrapper}>
            <Image style={styles.city} source={require("./img/city.png")} />
            <TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(scoreTown) => setScoreTown(scoreTown)}
              value={scoreTown} />
            <Button title="Tallenna" onPress={saveTown}></Button>
          </View>
          <View style={styles.playerFeatureWrapper}>
            <Image style={styles.road} source={require("./img/road.png")} />
            <TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(scoreRoad) => setScoreRoad(scoreRoad)}
              value={scoreRoad} />
            <Button title="Tallenna" onPress={saveRoad}></Button>
          </View>
          <View style={styles.playerFeatureWrapper}>
            <Image style={styles.monastery} source={require("./img/monastery.png")} />
            <TextInput style={styles.playerinput} keyboardType="numeric" placeholder='Laattojen määrä:' onChangeText={(scoreMonastery) => setScoreMonastery(scoreMonastery)}
              value={scoreMonastery} />
            <Button title="Tallenna" onPress={saveMonastery}></Button>
          </View>
        </View>
        <View style={styles.returnWrapper}>
          <Button onPress={backTo} title="Takaisin"></Button>
          <Text>{finalScore}</Text>
        </View>
        <View style={styles.playerFlatlist}>
          <FlatList
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <View><View style={styles.listcontainer}><Text style={{ fontSize: 18 }}>{item.feature}, pisteet: {item.score} </Text>
              <Text style={{ fontSize: 18, color: '#ffffff', borderWidth: 1, backgroundColor: 'crimson', borderRadius: 5, padding: 3, marginLeft: "5%" }} onPress={() => deleteItem(item.id)}>Peru</Text></View>
              <View><ListSeparator /></View></View>}
            data={green}
          />
        </View>
      </View>
    </ImageBackground>
  )
}

function blackPoints({ navigation }) {
  return (
    <View></View>
  )
}

function redPoints({ navigation }) {
  return (
    <View></View>
  )
}

function yellowPoints({ navigation }) {
  return (
    <View></View>
  )
}

function wildPoints({ navigation }) {
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
        <Stack.Screen name="Sininen" component={bluePoints} />
        <Stack.Screen name="Vihreä" component={greenPoints} />
        <Stack.Screen name="Musta" component={blackPoints} />
        <Stack.Screen name="Punainen" component={redPoints} />
        <Stack.Screen name="Keltainen" component={yellowPoints} />
        <Stack.Screen name="Extra" component={wildPoints} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  //Pelaajanäytön tyylit
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 24,
    fontFamily: 'Fondamento_400Regular',
    height: '100%',
    borderWidth: 1,
    borderColor: 'black'
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  playerWrapper: {
    backgroundColor: '#e5e5e5',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '90%',
    margin: 20,
    borderRadius: 5,
    flexDirection: 'row'
  },
  header: {
    marginTop: 15,
    fontSize: 30,
    fontFamily: 'Fondamento_400Regular'
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    width: '90%',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#145FB8",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: 'Fondamento_400Regular',
    alignSelf: "center",
    textTransform: "uppercase"
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: '70%',
    height: '70%',
    borderRadius: 5,
    backgroundColor: 'white',
    marginRight: 10,
    textAlign: 'center'
  },
  meeple: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  meepleGrey: {
    width: 25,
    height: 25,
  },
  meeplePink: {
    width: 25,
    height: 25,
    marginRight: 5
  },

  //Lisäosien tyylit
  expansionText: {
    fontFamily: 'Fondamento_400Regular',
    fontSize: 20,
  },
  expansionWrapper: {
    backgroundColor: '#e5e5e5',
    justifyContent: "center",
    alignItems: "center",
    width: '90%',
    margin: 20,
    marginBottom: 0,
    borderRadius: 5,
    flexDirection: 'row',
    height: '20%',
    justifyContent: "space-between"

  },
  expansionContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 24,
    fontFamily: 'Fondamento_400Regular',
    height: '40%',
    borderWidth: 1,
    borderColor: 'black'
  },
  pig: {
    width: 55,
    height: 30,
    marginLeft: 15
  },
  exMeeple: {
    width: 40,
    height: 40,
    marginLeft: 25
  },
  appButtonContainerExpansion: {
    elevation: 8,
    backgroundColor: "#145FB8",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 20
  },

  //Alkuvalikon tyylit
  menuButtonContainer: {
    elevation: 8,
    backgroundColor: "#145FB8",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '70%',
    height: '10%',
    marginTop: 40,
    borderWidth: 1
  },
  menuButtonText: {
    fontSize: 30,
    color: "#fff",
    fontFamily: 'Fondamento_400Regular',
    alignSelf: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuHeader: {
    backgroundColor: "#145FB8",
    width: '80%',
    margin: 50,
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1
  },
  menuText: {
    fontSize: 32,
    color: "#E8EC30",
    fontFamily: 'Fondamento_400Regular',
    alignSelf: "center",
    marginRight: 50,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textShadowColor: '#000',
  },
  main: {
    flex: 1
  },
  logo: {
    width: 80,
    height: 80,
  },

  //Pistelaskurin tyylit
  bluePlayer: {
    backgroundColor: '#00445e',
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: '90%',
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  greenPlayer: {
    backgroundColor: '#005b1c',
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: '90%',
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  blackPlayer: {
    backgroundColor: '#000000',
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: '90%',
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  redPlayer: {
    backgroundColor: '#c80000',
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: '90%',
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  yellowPlayer: {
    backgroundColor: '#dac603',
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: '90%',
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  wildPlayer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: '90%',
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  playersText: {
    fontFamily: 'Fondamento_400Regular',
    fontSize: 26,
    margin: 10,
    color: "white",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textShadowColor: '#000',
  },
  counterContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 24,
    fontFamily: 'Fondamento_400Regular',
    borderWidth: 1,
    borderColor: 'black',
  },
  mainAppButtonContainer: {
    elevation: 8,
    backgroundColor: "#145FB8",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  mainButtonWrapper: {
    alignItems: 'center',
    width: '90%',
    marginBottom: 50
  },
  mainAppButtonText: {
    fontSize: 24,
    color: "#fff",
    fontFamily: 'Fondamento_400Regular',
    alignSelf: "center",
  },

  //Pelaajien pistetyylit
  featureWrapper: {
    height: '40%',
    marginTop: 350
  },
  playerFeatureWrapper: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    margin: 10,
    flexDirection: 'row',
    borderRadius: 10
  },
  playerFlatlist: {
    marginBottom: 10,
  },
  listcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: 10,
  },
  pointcontainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 24,
    fontFamily: 'Fondamento_400Regular',
    height: '100%',
    borderWidth: 1,
    borderColor: 'black',
  },
  city: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  monastery: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  road: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  playerinput: {
    borderColor: 'black',
    borderWidth: 1,
    width: '50%',
    height: '50%',
    borderRadius: 5,
    backgroundColor: 'white',
    marginRight: 10,
    textAlign: 'center'
  },
  returnWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '50%',
    margin: 20,
    flexDirection: 'row',
    borderRadius: 10
  }
})

