
const numRE = /[.\-\d]+/;
function isNumeric(char){
  return numRE.test(char)
}
export default function scale(text, props) {
  if (!props.scale) return text;
  if (typeof text === 'number') {
    return text * props.scale;
  }
  let list = text.split('').reduce((list, char) => {
    if (!list.length) return [char];
    const last = list.pop();
    if (isNumeric(last) === isNumeric(char)) {
      return [...list, last + char];
    }
    return [...list, last, char];
  }, []);
  return list.map((item) => {
    if (isNumeric(item)) {
      return Number.parseFloat(item) * props.scale;
    }
    return item;
  }).join(' ');
}
