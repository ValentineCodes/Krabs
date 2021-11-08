const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getTimestamp = () => {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  return {
    date: `${MONTHS[monthIndex]} ${day}, ${year}`,
    time: `${hour}:${minutes}${hour >= 0 && hour < 12 ? 'am' : 'pm'}`,
  };
};
