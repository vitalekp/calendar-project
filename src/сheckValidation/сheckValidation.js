import { MILLS_IN_HOUR, MILLS_IN_MIN } from '../time/time';

export const checkEventTiming = (startMinute, endMinute) => {
  if (startMinute % 15 !== 0 || endMinute % 15 !== 0) {
    alert('Event timing must be a multiple of 15');
    return true;
  }
  return false;
};

export const checkEventStart = (dateFrom, dateTo) => {
  if (dateFrom > dateTo) {
    alert('Event cannot end earlier than it started');
    return true;
  }
  return false;
};

export const checkEventDuration = duration => {
  if (duration > MILLS_IN_HOUR * 6) {
    alert('One event cannot be longer than 6 hours');
    return true;
  }
  return false;
};

export const checkEventTimeCrossing = (allEvents, currentEvent) => {
  const timeCrossing = allEvents.some(({ dateFrom, dateTo }) => {
    if (dateFrom <= currentEvent.dateFrom && dateTo >= currentEvent.dateFrom) {
      return true;
    }
    if (dateFrom >= currentEvent.dateFrom && dateFrom <= currentEvent.dateTo) {
      return true;
    }
    return false;
  });

  if (timeCrossing) {
    alert('Two events cannot overlap in time');
    return true;
  }
  return false;
};

export const checkDeleteEvent = timeDifferent => {
  if (timeDifferent < MILLS_IN_MIN * -15) {
    alert('You cannot delete the event earlier than 15 minutes before the start');
    return true;
  }
  return false;
};
