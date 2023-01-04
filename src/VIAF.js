import axios from 'axios';

/**
 * Mappings between VIAF and our common
 * icon vocab (place, person, work)
 */
const TYPES = {
  'personal': 'Person',
  'corporate': 'Group',
  'geographic': 'Place',
  'uniformtitlework': 'Work'
}

const query = async (query) => {
  const res = await axios.get('https://www.viaf.org/viaf/AutoSuggest?query=' + query);
  const result = res.data.result || []; // VIAF returns 'null' for 0 results!

  return result.map(result_2 => {
    const { viafid, displayForm, nametype } = result_2;

    return {
      uri: `https://viaf.org/viaf/${viafid}`,
      label: displayForm,
      type: TYPES[nametype]
    };
  });
}

export default {
  query
}
