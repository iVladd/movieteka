export function transformDate(date: string | undefined) {
  if (!date) return "";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateArray = date.split("-");

  return `${months[+dateArray[1] - 1]} ${dateArray[2]}, ${dateArray[0]}`;
}
