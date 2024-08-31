import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ListEmptyComponent = () => {
  const [isVisible, setVisible] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {isVisible ? (
        <Text style={styles.text}>
          No new headlines available now. Please visit after some time.
        </Text>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get('screen').height / 3,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },
  text: {color: 'black'},
});

export default ListEmptyComponent;
