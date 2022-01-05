import axios from 'axios';

export const getCountrys = async () => {
  const { data } = await axios.get('https://restcountries.com/v3.1/all');
  const listContrys = data.map((country) => country.name.common);
  return listContrys.sort();
};
