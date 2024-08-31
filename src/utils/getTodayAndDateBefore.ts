import {convertToDateFormat} from './dateFormatter';

export const getTodayAndDateBefore = (dayBeforeCount: number) => {
  const today = new Date();
  const previousDate = new Date(today);
  previousDate.setDate(today.getDate() - dayBeforeCount);

  return [convertToDateFormat(previousDate), convertToDateFormat(today)];
};
