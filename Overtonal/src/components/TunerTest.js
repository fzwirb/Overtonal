// // import PitchFinder from "pitchfinder";
// import * as React from 'react'
// import { StatusBar } from 'expo-status-bar';
// import { Audio } from 'expo-av';
// import { Text, View, Button, StyleSheet, NativeModules } from 'react-native';
// import * as Permissions from 'expo-permissions';
// import * as Sharing from 'expo-sharing';

// const FrequencyDetector = NativeModules.RNFrequencyDetectorBridge;


// export default function TunerTest()  {


//   FrequencyDetector.listen();
    


//   _frequencyListener = event => {
//     console.log('Event: ', event);
    
//     let freq = parseInt(event.freq);
//     console.log(freq);
//   }


//   // componentDidMount() {
//   //   getSelectedInstrument().then(instrument => {
//   //     if (instrument) {
//   //       this.setState({ instrument });
//   //     }
//   //   });
//   //   DeviceEventEmitter.addListener('frequency', this._frequencyListener);
//   //   AppState.addEventListener('change', this._handleAppStateChange);
//   //   FrequencyDetector.listen();
//   // }

//   // componentWillUnmount() {
//   //   console.log('Unmounting');
//   //   AppState.removeEventListener('change', this._handleAppStateChange);
//   //   DeviceEventEmitter.removeAllListeners();
//   // }


  
//     return (
//       <View style={styles.container}>
//         <StatusBar backgroundColor={colors.background} />
//       </View>
//     );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// // export default function App() {
// //   const [recording, setRecording] = React.useState();
// //   const [recordings, setRecordings] = React.useState([]);
// //   const [message, setMessage] = React.useState("");

// //   async function startRecording() {
// //     try {
// //       const {permission} = await Audio.requestPermissionsAsync();
// //     console.log(permission);
// //       if (permission.status === "granted") {
// //         await Audio.setAudioModeAsync({
// //           allowsRecordingIOS: true,
// //           playsInSilentModeIOS: true
// //         });
        
// //         const { recording } = await Audio.Recording.createAsync(
// //           Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
// //         );

// //         setRecording(recording);
// //       } else {
// //         setMessage("Please grant permission to app to access microphone");
// //       }
// //     } catch (err) {
// //       console.error('Failed to start recording', err);
// //     }
// //   }

// //   async function stopRecording() {
// //     setRecording(undefined);
// //     await recording.stopAndUnloadAsync();

// //     let updatedRecordings = [...recordings];
// //     const { sound, status } = await recording.createNewLoadedSoundAsync();
// //     updatedRecordings.push({
// //       sound: sound,
// //       duration: getDurationFormatted(status.durationMillis),
// //       file: recording.getURI()
// //     });

// //     setRecordings(updatedRecordings);
// //   }

// //   function getDurationFormatted(millis) {
// //     const minutes = millis / 1000 / 60;
// //     const minutesDisplay = Math.floor(minutes);
// //     const seconds = Math.round((minutes - minutesDisplay) * 60);
// //     const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
// //     return `${minutesDisplay}:${secondsDisplay}`;
// //   }

// //   function getRecordingLines() {
// //     return recordings.map((recordingLine, index) => {
// //       return (
// //         <View key={index} style={styles.row}>
// //           <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
// //           <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
// //           <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
// //         </View>
// //       );
// //     });
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <Text>{message}</Text>
// //       <Button
// //         title={recording ? 'Stop Recording' : 'Start Recording'}
// //         onPress={recording ? stopRecording : startRecording} />
// //       {getRecordingLines()}
// //       <StatusBar style="auto" />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   row: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   fill: {
// //     flex: 1,
// //     margin: 16
// //   },
// //   button: {
// //     margin: 16
// //   }
// // });

// // let recording = new Audio.Recording();

// // export default function Tuner() {
// //     // const [recording, setRecording] = React.useState();
// //     // const [recordings, setRecordings] = React.useState([]);
// //     // const [message, setMessage] = React.useState("");

// //     async function startRecording (){
// //         try {
// //             console.log('Requesting permissions..');
// //             await Audio.requestPermissionsAsync();
// //             await Audio.setAudioModeAsync({
// //               allowsRecordingIOS: true,
// //               playsInSilentModeIOS: true,
// //             });
// //             console.log('Starting recording..');
// //             await recording.prepareToRecordAsync(
// //               Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
// //             );
// //             await recording.startAsync();
// //             console.log('Recording started');
// //           } catch (err) {
// //             console.error('Failed to start recording', err);
// //           }
// //         }
// //     async function stopRecording (){
// //         console.log('Stopping recording..');
// //         await recording.stopAndUnloadAsync();
// //         const uri = recording.getURI();
// //         console.log('Recording stopped and stored at', uri);
// //     }

// //     // function getDurationFormatted(millis) {
// //     //     const minutes = millis / 1000 / 60;
// //     //     const minutesDisplay = Math.floor(minutes);
// //     //     const seconds = Math.round((minutes - minutesDisplay) * 60);
// //     //     const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
// //     //     return `${minutesDisplay}:${secondsDisplay}`;
// //     //   }
    
// //     //   function getRecordingLines() {
// //     //     return recordings.map((recordingLine, index) => {
// //     //       return (
// //     //         <View key={index} style={styles.row}>
// //     //           <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
// //     //           <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
// //     //           <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
// //     //         </View>
// //     //       );
// //     //     });
// //     //   }
    
// //     return (
// //         <View>
// //             <Text>TUNER TEST</Text>
// //             <Button 
// //                 title={recording ? 'Stop Recording' : 'Start Recording'}
// //                 onPress={recording ? stopRecording : startRecording}
// //             />

// //         </View>
// //     );  
// // }