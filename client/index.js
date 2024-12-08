/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import App from './src/App';
import {name as appName} from './app.json';

if (typeof global.GLOBAL === 'undefined') {
    global.GLOBAL = global;
  }

AppRegistry.registerComponent(appName, () => App);
