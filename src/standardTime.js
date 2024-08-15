export default function standardTime(time) {
  if (time) {
    let minutes = time.slice(2);
    let afternoon = "PM";
    let numTime = parseInt(time);
    if (numTime > 13) {
      numTime -= 12;
    }
    numTime.toString();
    return `${numTime}${minutes} ${afternoon}`;
  }
}
