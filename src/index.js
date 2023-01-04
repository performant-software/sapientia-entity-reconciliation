import BNF from './BNF';
import DPLA from './DPLA';
import JISCLibraryHub from './JISCLibraryHub';
import VIAF from './VIAF';
import Wikidata from './Wikidata';

const BUILTIN_CONNECTORS = {
  'bnf': BNF,
  'dpla': DPLA,
  'jisc': JISCLibraryHub,
  'viaf': VIAF,
  'wikidata': Wikidata
}

export default (router, { env }) => {
    router.get('/:connector', async (req, res) => {
      if (!Object.keys(BUILTIN_CONNECTORS).includes(req.params.connector)) {
        res.status = 400
        return res.send('not a valid connector')
      }

      if (!req.query.search) {
        res.status = 400
        return res.send('missing search query')
      }

      const results = await BUILTIN_CONNECTORS[req.params.connector].query(req.query.search, env);

      return res.send(results);
    })
}
