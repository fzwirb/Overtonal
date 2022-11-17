import * as React from 'react';
import { LogBox,View } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications


import Navbar from "./src/components/Navbar";


function App() {
   return (
         <Navbar />
   );
}

export default App;