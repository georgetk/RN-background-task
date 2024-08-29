import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Tesla from './src/screens/Tesla';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Tesla />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: 'white'},
});

export default App;
