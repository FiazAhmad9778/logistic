export function getDateFormatMDY(date: Date | string | undefined) {
  if (!date) return '';

  const dateToChange = new Date(date);
  let month: string | number = dateToChange.getMonth() + 1;
  let date_: string | number = dateToChange.getDate();
  const year = dateToChange.getFullYear();
  if (date_ < 10) {
    date_ = '0' + date_;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return `${year}-${month}-${date_}`;
}
