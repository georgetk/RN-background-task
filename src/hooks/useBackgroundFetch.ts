import BackgroundFetch from 'react-native-background-fetch';
import {useCheckFetchingRequired} from './useCheckFetchingRequired';
import {useCustomAsyncStorage} from './useCustomAsyncStorage';
import {ASYNC_STORAGE_KEYS} from '../constants/asyncStorageKeys';
import {LOGIC_CONSTANTS} from '../constants/logicConstants';

export const useBackgroundFetch = () => {
  const checkIfFetchingIsRequired = useCheckFetchingRequired();
  const [getItem, setItem] = useCustomAsyncStorage();

  const checkAndFetch = async (fetchArticlesFromApi: () => Promise<void>) => {
    const result = await checkIfFetchingIsRequired();
    if (!result.isFetchingRequired) {
      return;
    } else if (result.currentDate) {
      await setItem(
        ASYNC_STORAGE_KEYS.DAY_BEFORE_COUNT,
        `${LOGIC_CONSTANTS.INITIAL_DAY_BEFORE_COUNT}`,
      );
    } else if (result.isFullDataDisplayed) {
      const daysBefore = await getItem(ASYNC_STORAGE_KEYS.DAY_BEFORE_COUNT);
      const newDaysBefore =
        (Number(daysBefore) || LOGIC_CONSTANTS.INITIAL_DAY_BEFORE_COUNT) + 1;

      await setItem(ASYNC_STORAGE_KEYS.DAY_BEFORE_COUNT, `${newDaysBefore}`);
    }

    await fetchArticlesFromApi();
  };

  const initBackgroundFetch = async (
    fetchArticlesFromApi: () => Promise<void>,
  ) => {
    // BackgroundFetch event handler.
    const onEvent = async (taskId: string) => {
      // Background work...
      await checkAndFetch(fetchArticlesFromApi);

      // Signal to the OS that task is complete.
      BackgroundFetch.finish(taskId);
    };

    // Timeout callback is executed when Task has exceeded its allowed running-time.
    // Must stop what we're doing immediately BackgroundFetch.finish(taskId)
    const onTimeout = async (taskId: string) => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    };

    // Initialize BackgroundFetch only once when component mounts.
    await BackgroundFetch.configure(
      {minimumFetchInterval: 15},
      onEvent,
      onTimeout,
    );
  };

  return initBackgroundFetch;
};
