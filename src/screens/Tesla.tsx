import React, {useEffect, useState} from 'react';
import {axiosInstance} from '../network';
import {NETWORK_URLS} from '../constants/networkUrls';
import {FlashList} from '@shopify/flash-list';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {styles} from './styles';
import Separator from '../components/Separator';
import {TApiArticles, TApiNeededFields} from '../types/apiDataType';

const Tesla = () => {
  const [listData, setListData] = useState<TApiNeededFields[]>([]);

  useEffect(() => {
    axiosInstance.post<TApiArticles>(NETWORK_URLS.TESLA_ENDPOINT).then(data => {
      console.log(data.data);

      if (data.data?.articles) {
        setListData(data.data?.articles);
      }
    });
  }, []);

  return (
    <View style={styles.listContainer}>
      <FlashList
        estimatedItemSize={142}
        ItemSeparatorComponent={Separator}
        data={listData}
        renderItem={({item}) => (
          <View style={styles.listView}>
            <View style={styles.nameTimeContainer}>
              <View style={styles.nameIconContainer}>
                <Icon name="newsletter" size={30} color="black" />
                <Text style={styles.nameText}>{item?.source?.name}</Text>
              </View>
              <Text style={styles.timeText}>{'Time'}</Text>
            </View>
            <View style={styles.titleImageContainer}>
              <Text style={styles.titleText}>{item?.title}</Text>
              <Image
                source={{uri: item?.urlToImage}}
                style={styles.thumbnailImage}
              />
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
