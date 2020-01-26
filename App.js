import React, {Component} from 'react';
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
import { RNCamera } from 'react-native-camera-tflite';
import outputs from './Output.json';
import _ from 'lodash';

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

let _currentInstant = 0;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      output: ""
    };
  }processOutput({data}) {
    const probs = _.map(data, item => _.round(item/255.0, 0.02));
    const orderedData = _.chain(data).zip(outputs).orderBy(0, 'desc').map(item => [_.round(item[0]/255.0, 2), item[1]]).value();
    const outputData = _.chain(orderedData).take(3).map(item => `${item[1]}: ${item[0]}`).join('\n').value();
    const time = Date.now() - (_currentInstant || Date.now());
    const output = `Guesses:\n${outputData}\nTime:${time} ms`;
    this.setState(state => ({
      output
    }));
    _currentInstant = Date.now();
  }
  
  render() {
    const modelParams = {
      file: "waste_classifier.tflite",
      inputDimX: 512,
      inputDimY: 384,
      outputDim: 6,
      freqms: 0
    };
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
                this.camera = ref;
              }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onModelProcessed={data => this.processOutput(data)}
            modelParams={modelParams}
        >
          <Text style={styles.cameraText}>{this.state.output}</Text>
        </RNCamera>
      </View>
    );
  }
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
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
