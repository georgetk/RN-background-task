import {ASYNC_STORAGE_KEYS} from '../constants/asyncStorageKeys';
import {TApiNeededFields} from '../types/apiDataType';
import {useAxiosFetch} from './useAxiosFetch';
import {useCustomAsyncStorage} from './useCustomAsyncStorage';
import {useDB} from './useDB';

export const useDataFetching = (): [
  () => Promise<TApiNeededFields[] | undefined>,
  (
    intervalRef: React.MutableRefObject<NodeJS.Timeout | null>,
  ) => Promise<TApiNeededFields[] | undefined>,
] => {
  const [
    getDBConnection,
    ,
    ,
    getSavedArticlesForInitial,
    getSavedArticlesForUpdate,
  ] = useDB();

  const fetchArticlesFromApi = useAxiosFetch();
  const [getItem, setItem] = useCustomAsyncStorage();

  const fetchInitialData = async (): Promise<
    TApiNeededFields[] | undefined
  > => {
    try {
      setItem('false', ASYNC_STORAGE_KEYS.IS_FULL_DATA_DISPLAYED);

      await fetchArticlesFromApi();

      let previouslyDisplayedCount = Number(
        await getItem(ASYNC_STORAGE_KEYS.TOTAL_RECORDS_DISPLAYED),
      );
      const db = await getDBConnection();

      return await getSavedArticlesForInitial(
        db,
        previouslyDisplayedCount,
        setItem,
      );
    } catch (error) {
      console.error('Error fetching initial data:', error);
      return undefined;
    }
  };

  const fetchUpdates = async (
    intervalRef: React.MutableRefObject<NodeJS.Timeout | null>,
  ): Promise<TApiNeededFields[] | undefined> => {
    try {
      const db = await getDBConnection();
      const previouslyDisplayedCount = Number(
        await getItem(ASYNC_STORAGE_KEYS.TOTAL_RECORDS_DISPLAYED),
      );
      const totalRecordsAvailable = Number(
        await getItem(ASYNC_STORAGE_KEYS.TOTAL_RECORDS_AVAILABLE),
      );

      if (previouslyDisplayedCount < totalRecordsAvailable) {
        return await getSavedArticlesForUpdate(
          db,
          previouslyDisplayedCount,
          setItem,
        );
      } else {
        if (intervalRef.current) {

          clearInterval(intervalRef.current);
        }

        setItem('true', ASYNC_STORAGE_KEYS.IS_FULL_DATA_DISPLAYED);

        return []; // Return an empty array if no updates are available
      }
    } catch (error) {
      console.error('Error fetching updates:', error);
      return undefined;
    }
  };

  return [fetchInitialData, fetchUpdates];
};
