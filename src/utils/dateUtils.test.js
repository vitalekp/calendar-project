import { getWeekStartDate, generateWeekRange, formatMins, getDateTime } from './dateUtils';

test('should return first day of week (date) (getWeekStartDate(date))', () => {
  const date = new Date(2022, 6, 12, 10, 0, 0, 0);
  const firstDayOfWeek = new Date(2022, 6, 11, 0, 0, 0, 0);

  expect(getWeekStartDate(date)).toEqual(firstDayOfWeek);
  expect(typeof getWeekStartDate(date)).toBe('object');
});

test('should return week range (generateWeekRange(startDate))', () => {
  const startDate = new Date(2022, 6, 11);
  const weekRange = [11, 12, 13, 14, 15, 16, 17].map(day => new Date(2022, 6, day));

  expect(generateWeekRange(startDate)).toEqual(weekRange);
  expect(generateWeekRange(startDate).length).toEqual(7);
  expect(typeof generateWeekRange(startDate)).toBe('object');
});

test('should return date with minutes and hours set (getDateTime(date, time))', () => {
  const date = new Date(2022, 6, 12, 10, 0, 0, 0);
  const time = '20:15';

  expect(getDateTime(date, time)).toEqual(new Date(2022, 6, 12, 20, 15));
  expect(typeof getDateTime(date, time)).toBe('object');
});

test('should return correctly minutes (formatMins(min))', () => {
  const firstTestMinutes = new Date(2022, 5, 5, 3, 25).getMinutes();
  const secondTestMinutes = new Date(2022, 5, 5, 3, 5).getMinutes();

  expect(formatMins(firstTestMinutes)).toEqual(25);
  expect(formatMins(secondTestMinutes)).toEqual('05');
  expect(typeof formatMins(secondTestMinutes)).toBe('string');
});
