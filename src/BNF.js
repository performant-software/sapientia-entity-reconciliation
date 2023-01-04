import { parseString } from 'browser-xml2js';
import axios from 'axios';

const buildParams = (query, limit) => ({
  operation: 'searchRetrieve',
  startRecord: 1,
  recordSchema: 'dublincore',
  version: 1.2,
  maximumRecords: limit,
  query: `bib.anywhere+all+"${query}"`
})

const getProp = (record, prop) =>
  record[prop] ? record[prop][0] : null;

const query = async query => {
  const limit = 20;

  const res = await axios.get('https://catalogue.bnf.fr/api/SRU', { params: buildParams(query, limit) })

  parseString(res.data, (error, result) => {
      // SRU. Why?!?
      const recordPayload = result['srw:searchRetrieveResponse']['srw:records'][0]['srw:record'];

      if (recordPayload && !error) {
        const records = recordPayload.map(record => record['srw:recordData'][0]['oai_dc:dc'][0]);

        return records.map(record => {
          return {
            uri: getProp(record, 'dc:identifier'),
            label: JSON.stringify(getProp(record, 'dc:title')),
            description: getProp(record, 'dc:description'),
            type: 'Work'
          }
        });
      } else {
        return [];
      }
    })
}

export default {
  query
}
