export const today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  if (month < 10) {
    return `${year}-0${month}-${day}`;
  } else {
    return `${year}-${month}-${day}`;
  }
};
