import {ASYNC_STORAGE_KEYS} from '../constants/asyncStorageKeys';
import {LOGIC_CONSTANTS} from '../constants/logicConstants';
import {getTeslaEndpoint} from '../constants/networkUrls';
import {axiosInstance} from '../network';
import {TApiRawArticles} from '../types/apiDataType';
import {getTodayAndDateBefore} from '../utils/getTodayAndDateBefore';
import {useCustomAsyncStorage} from './useCustomAsyncStorage';
import {useDB} from './useDB';

export const useAxiosFetch = () => {
  const [getDBConnection, , insertArticles] = useDB();
  const [getItem, setItem] = useCustomAsyncStorage();

  const fetchArticlesFromApi = async () => {
    try {
      const daysBefore = await getItem(ASYNC_STORAGE_KEYS.DAY_BEFORE_COUNT);

      const [fromDate, toDate] = getTodayAndDateBefore(
        Number(daysBefore) ?? LOGIC_CONSTANTS.INITIAL_DAY_BEFORE_COUNT,
      );

      setItem(
        `${Number(daysBefore) ?? LOGIC_CONSTANTS.INITIAL_DAY_BEFORE_COUNT}`,
        ASYNC_STORAGE_KEYS.DAY_BEFORE_COUNT,
      );

      const data = await axiosInstance.post<TApiRawArticles>(
        getTeslaEndpoint(fromDate, toDate),
      );
      if (data.data?.articles) {
        const db = await getDBConnection();

        await insertArticles(db, data.data);

    

        setItem(
          `${data.data.articles.length}`,
          ASYNC_STORAGE_KEYS.TOTAL_RECORDS_AVAILABLE,
        );

        setItem(toDate, ASYNC_STORAGE_KEYS.TO_DATE);
      }
    } catch (error) {
    }
  };

  return fetchArticlesFromApi;
};
