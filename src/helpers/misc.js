import Color from 'color';

export function randomColor() {
  return Color.rgb(
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
  );
}

let uniqueId_count = 0;

export function uniqueId(preffix) {
  return `${preffix || ''}${uniqueId_count++}`;
}

export default {
  randomColor,
  uniqueId
};
