import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  listView: {paddingHorizontal: 15, marginVertical: 25},
  nameTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  nameIconContainer: {flexDirection: 'row', alignItems: 'center'},
  nameText: {color: 'gray', marginLeft: 5, fontSize: 15},
  timeText: {fontSize: 15},
  titleImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 20,
    width: '70%',
    fontWeight: 'bold',
    lineHeight: 30,
  },
  thumbnailImage: {width: 100, height: 100, borderRadius: 20},
  authorText: {color: 'gray', fontSize: 15, marginTop: 15},
});
