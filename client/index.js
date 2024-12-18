/**
 * @format
 */
import {AppRegistry, LogBox} from 'react-native';
// import App from './App';
import App from './src/App';
import {name as appName} from './app.json';

LogBox.ignoreAllLogs(true);

if (typeof global.GLOBAL === 'undefined') {
    global.GLOBAL = global;
  }

AppRegistry.registerComponent(appName, () => App);
