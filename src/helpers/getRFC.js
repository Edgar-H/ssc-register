import RfcaFacil from 'rfc-facil';

export const getRfc = ({
  name,
  first_last_name,
  second_last_name,
  date_birth,
}) => {
  let fullDatebirth = new Date(date_birth).toISOString();
  let day = fullDatebirth.substring(8, 10);
  let month = fullDatebirth.substring(5, 7);
  let year = fullDatebirth.substring(0, 4);

  const rfc = RfcaFacil.forNaturalPerson({
    name: name,
    firstLastName: first_last_name,
    secondLastName: second_last_name,
    day: day,
    month: month,
    year: year,
  });
  return rfc;
};
