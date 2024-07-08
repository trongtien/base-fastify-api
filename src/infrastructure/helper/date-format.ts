import dayjs from 'dayjs';

export const dateFormat = {
  dateMillisecond() {
    const day = dayjs().date();
    const month = dayjs().month();
    const year = dayjs().year();
    const house = dayjs().hour();
    const minute = dayjs().minute();
    const seconds = dayjs().second();
    const millisecond = dayjs().millisecond();

    return `${day}${month}${year}${house}${minute}${seconds}${millisecond}`;
  },

  dateNowSecond() {
    const day = dayjs().date();
    const month = dayjs().month();
    const year = dayjs().year();

    return `${year}${month}${day}`;
  },
};
