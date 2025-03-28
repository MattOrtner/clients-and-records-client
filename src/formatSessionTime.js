export default function formatSessionTime(scheduledTime) {
  const time = scheduledTime.split(":");
  const hour = parseInt(time[0]);
  const minute = time[1];

  if (hour > 12) {
    scheduledTime = `${hour - 12}:${minute} pm`;
  } else {
    scheduledTime = `${hour}:${minute} am`;
  }
  return scheduledTime.replace(/:00/g, "");
}
