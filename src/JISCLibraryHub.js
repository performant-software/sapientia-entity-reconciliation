import axios from 'axios';

const getData = (result, prop) =>
  result.bibliographic_data[prop] ? result.bibliographic_data[prop][0] : null;

const concatData = (result, props) => {
  const fields = props.map(p => getData(result, p))
  return fields.filter(f => f != null).join(', ');
}

const query = async (query) => {
  const res = await axios.get('https://discover.libraryhub.jisc.ac.uk/search?format=json&keyword=' + query);

  return res.data.records ?
    res.data.records.map(result => ({
      uri: result.uri,
      label: getData(result, 'title'),
      description: concatData(result, ['author', 'publication_details']),
      type: 'Work'
    })) : [];
}

export default {
  query
}
