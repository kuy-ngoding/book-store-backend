// add date by month or year or week or day
export function addDateByPeriod(
  date: Date,
  period: string,
  interval: number,
): Date {
  const result = new Date(date);
  if (period === 'month') {
    result.setMonth(result.getMonth() + interval);
  } else if (period === 'year') {
    result.setFullYear(result.getFullYear() + interval);
  } else if (period === 'day') {
    result.setDate(result.getDate() + interval);
  } else if (period === 'week') {
    result.setDate(result.getDate() + interval * 7);
  }
  return result;
}
