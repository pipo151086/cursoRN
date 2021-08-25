import React from 'react';
//import { AppProvider } from "./src/providers"
import BootSetup from "./src/boot/setup";
import { LogBox } from 'react-native';

const App = () => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    LogBox.ignoreAllLogs(true);
    return (
        <BootSetup />
    );
}

export default App;
