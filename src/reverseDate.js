export default function reverseDate(date) {
  if (date) {
    const year = date.slice(0, 4);
    const monthDay = date.slice(5);
    return `${monthDay}-${year}`;
  }
}
