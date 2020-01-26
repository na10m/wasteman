import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    SafeAreaView,
} from 'react-native';
import logo from './assets/wasteman_logo.png';
import { SplashScreen } from 'expo';
import Constants from 'expo-constants';
import AwesomeButton from "react-native-really-awesome-button";

function Separator() {
    return <View style={styles.separator} />;
}

function ScanButton() {
    return (
            <AwesomeButton raiseLevel={0} >
        Scan an item
     </AwesomeButton>
    );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <View>
          <Image source={logo} style={styles.logo} />
        </View>
        <Separator />
        <View>
          <ScanButton />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
    resizeMode:'contain'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
