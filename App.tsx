/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import {
//   useColorScheme,
// } from 'react-native';

// import {
//   Colors,
// } from 'react-native/Libraries/NewAppScreen';
import { Router } from './src/routes/Routes';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
      // <StatusBar
      //   barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      //   backgroundColor={backgroundStyle.backgroundColor}
      // />
      <Router />
  );
}


export default App;
