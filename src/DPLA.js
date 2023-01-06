import axios from 'axios';

const query = async (query, env) => {
  if (query.length <= 1) {
    return [];
  }

  const res = await axios.get(`https://api.dp.la/v2/items?q=${query}&api_key=${env['DPLA_API_KEY']}`);

  return res.data.docs.map(doc => {
    const uri = doc.isShownAt;
    const label = doc.sourceResource.title[0];
    const description = doc.sourceResource.creator && doc.sourceResource.creator[0];
    const type = 'Work';

    return {
      uri,
      label,
      description,
      type
    };
  });
}

export default {
  query
}
