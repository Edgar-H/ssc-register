import algoliasearch from 'algoliasearch/lite';

const APP_ID = process.env.REACT_APP_APPLICATION_ID;
const SEARCH_API_KEY = process.env.REACT_APP_SEARCH_API_KEY;
const ALGOLIA_INDEX = process.env.REACT_APP_ALGOLIA_INDEX;

export const performSearch = async (value) => {
  const client = algoliasearch(APP_ID, SEARCH_API_KEY);
  const index = client.initIndex(ALGOLIA_INDEX);
  const { hits } = await index.search(value);

  const results = hits.map((hit) => {
    const {
      objectID: key,
      full_name: name,
      alias,
      date_birth: birth,
      date_arrest: arrest,
      img_profile: img,
    } = hit;
    return { key, name, alias, birth, arrest, img };
  });
  console.log('results', results);
  return results;
};
