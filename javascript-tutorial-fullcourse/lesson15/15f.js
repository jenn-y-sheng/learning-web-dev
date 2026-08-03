// import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

function isWeekend(date) {
  const formatted = date.format('dddd');
  return formatted === 'Saturday' || formatted === 'Sunday';
}

export default isWeekend;