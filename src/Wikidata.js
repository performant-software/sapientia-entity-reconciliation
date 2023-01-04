import axios from 'axios';
import wd from 'wikidata-sdk';

const query = async (query, globalConfig) => {
  const lang = globalConfig.language || 'en';
  const limit = globalConfig.limit || 20;

  const url = wd.searchEntities(query, lang, limit);

  const res = await axios.get(url);

  return res.data.search.map(result => {
    const { label, description, concepturi } = result;
    return {
      uri: concepturi,
      label,
      description
    };
  });
}

export default {
  query
}
