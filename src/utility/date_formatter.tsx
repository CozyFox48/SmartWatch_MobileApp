export const formatDate = (numericDate: number) => {
  const date = new Date(numericDate);
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
  return formattedDate.replace(',', '');
};

export const getCurrentFormattedDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // Adding 1 to month since months are zero-based
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();

  const formattedDateTime = year * 100000000 + month * 1000000 + day * 10000 + hour * 100 + minute;
  return formattedDateTime;
};