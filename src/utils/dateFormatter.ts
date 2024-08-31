export const convertToTime = (publishedAt: string): string =>
  new Date(publishedAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

export const convertToDateFormat = (inputDate: Date): string =>
  inputDate.toISOString().split('T')[0];
