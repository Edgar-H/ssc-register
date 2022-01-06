import algoliasearch from 'algoliasearch/lite';

export const performSearch = async (value) => {
  const client = algoliasearch(
    process.env.REACT_APP_APP_ID,
    process.env.REACT_APP_SEARCH_API_KEY
  );
  const index = client.initIndex(process.env.REACT_APP_ALGOLIA_INDEX);

  const { hits } = await index.search(value);

  const results = hits.map((hit) => {
    const { objectID: key, href, _highlightResult } = hit;
    const {
      title: { value: title },
    } = _highlightResult;
    return {
      key,
      href,
      title,
    };
  });
  return results;
};
