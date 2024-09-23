export function formatDate(dateString) {
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

  // Parse the dateString into a Date object
  const date = new Date(dateString);

  // Get the hours and minutes
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Format hours in 12-hour format with 'am' or 'pm'
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12

  // Add leading zero to minutes if necessary
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Get the day, month, and year
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Construct the formatted date string
  const formattedDate = `${hours}:${minutes} ${ampm}, ${day} ${month} ${year}`;

  return formattedDate;
}
