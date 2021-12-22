import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  process.env.REACT_APP_APP_ID,
  process.env.REACT_APP_SEARCH_API_KEY
);
const index = client.initIndex(process.env.REACT_APP_ALGOLIA_INDEX);

export const search = async (value) => {
  const { results } = await index.search(value);
  console.log(results);

  const resultsFiltered = results.map((res) => {
    const { objectID, ...rest } = res;
    return rest;
  });
  return results;
};
