
function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const charString = 'abcdefghijklmnopqrstuvwxyz0123456789';
const charArray = charString.split('');

export function idGenerator(testFunction) {
  while (true) {
    const value = [];

    for (let i=0; i<5; i++) {
      value.push(charArray[randomInt(charArray.length)]);
    }

    const result = value.join('');

    if (!testFunction || testFunction(result)) {
      return result;
    }
  }
}
