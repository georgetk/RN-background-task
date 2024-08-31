import {ASYNC_STORAGE_KEYS} from '../constants/asyncStorageKeys';
import {convertToDateFormat} from '../utils/dateFormatter';
import {useCustomAsyncStorage} from './useCustomAsyncStorage';

type TCheckFetchingRequired = {
  isFetchingRequired: boolean;
  currentDate: string | null;
  isFullDataDisplayed: string | null;
};

export const useCheckFetchingRequired = () => {
  const [getItem] = useCustomAsyncStorage();

  const checkIfFetchingIsRequired =
    async (): Promise<TCheckFetchingRequired> => {
      const toDate = await getItem(ASYNC_STORAGE_KEYS.TO_DATE);
      const isFullDataDisplayed = await getItem(
        ASYNC_STORAGE_KEYS.IS_FULL_DATA_DISPLAYED,
      );

      const currentDate = convertToDateFormat(new Date());

      if (toDate !== currentDate) {
        return {isFetchingRequired: true, currentDate, isFullDataDisplayed};
      } else if (isFullDataDisplayed === 'true') {
        return {
          isFetchingRequired: true,
          currentDate: null,
          isFullDataDisplayed,
        };
      } else {
        return {isFetchingRequired: false, currentDate, isFullDataDisplayed};
      }
    };

  return checkIfFetchingIsRequired;
};
