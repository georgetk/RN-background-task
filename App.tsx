import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Tesla from './src/screens/Tesla';
import {useBackgroundFetch} from './src/hooks/useBackgroundFetch';
import {useAxiosFetch} from './src/hooks/useAxiosFetch';

function App(): React.JSX.Element {
  const fetchArticlesFromApi = useAxiosFetch();
  const initBackgroundFetch = useBackgroundFetch();

  useEffect(() => {
    initBackgroundFetch(fetchArticlesFromApi);
  }, []);

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
