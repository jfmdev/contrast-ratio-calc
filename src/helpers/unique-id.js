let count = 0;

export default function uniqueId(preffix) {
  return `${preffix || ''}${count++}`;
}
