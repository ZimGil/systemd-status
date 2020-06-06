export default function(str, sep = ' ') {
  const splitedStr = str.split(sep);
  return splitedStr.length > 1
    ? splitedStr.slice(0, -1).join(sep)
    : str;
}
