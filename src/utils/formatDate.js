export default function formatDate(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateFormatter = new Intl.DateTimeFormat("id-ID", options);
  const formattedDate = dateFormatter.format(date);

  return formattedDate;
}
