import React, {useEffect, useRef, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {styles} from './styles';
import Separator from '../components/Separator';
import {TApiNeededFields} from '../types/apiDataType';
import {useDataFetching} from '../hooks/useDataFetching';
import ListEmptyComponent from '../components/ListEmptyComponent';
import {useDB} from '../hooks/useDB';

const Tesla = () => {
  const [listData, setListData] = useState<TApiNeededFields[]>([]);
  const [fetchInitialData, fetchUpdates] = useDataFetching();
  const [getDBConnection, createTable] = useDB();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const loadDataAndTimer = async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);

      const initialData = await fetchInitialData();

      if (initialData?.length) {
        setListData(initialData);
      }

      intervalRef.current = setInterval(async () => {
        const updatedData = await fetchUpdates(intervalRef);

        if (updatedData) {
          setListData(prevData => [...updatedData, ...prevData]);
        }
      }, 10000);
    } catch (error) {}
  };

  useEffect(() => {
    loadDataAndTimer();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.listContainer}>
      <FlashList
        estimatedItemSize={142}
        ItemSeparatorComponent={Separator}
        data={listData}
        ListEmptyComponent={<ListEmptyComponent />}
        renderItem={({item}) => (
          <View style={styles.listView}>
            <View style={styles.nameTimeContainer}>
              <View style={styles.nameIconContainer}>
                <Icon name="newsletter" size={30} color="black" />
                <Text style={styles.nameText}>{item?.sourceName}</Text>
              </View>
              <Text style={styles.timeText}>{item?.publishedAt}</Text>
            </View>
            <View style={styles.titleImageContainer}>
              <Text style={styles.titleText}>{item?.title}</Text>
              {item?.urlToImage ? (
                <Image
                  source={{uri: item?.urlToImage}}
                  style={styles.thumbnailImage}
                />
              ) : (
                <Icon name="image" size={100} color="black" />
              )}
            </View>
            <Text style={styles.authorText} numberOfLines={4}>
              {item?.author}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Tesla;
