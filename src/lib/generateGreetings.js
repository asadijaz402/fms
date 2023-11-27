const moment = require('moment');

export default function generateGreetings() {
  const currentHour = moment().format('HH');
  console.log(currentHour);

  if (currentHour >= 3 && currentHour < 12) {
    return 'Good Morning';
  }
  if (currentHour >= 12 && currentHour < 15) {
    return 'Good Afternoon';
  }
  if (currentHour >= 15 && currentHour < 20) {
    return 'Good Evening';
  }
  if (currentHour >= 20 || currentHour < 3) {
    return 'Good Night';
  }
  return 'Hello';
}
