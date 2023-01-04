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

export default (router) => {
    router.get('/test', (_req, res) => {
      return res.send('it works!')
    })

    router.get('/:connector', (req, res) => {
      if (!Object.keys(BUILTIN_CONNECTORS).includes(req.params.connector)) {
        res.status = 400
        return res.send('not a valid connector')
      }

      if (!req.query.search) {
        res.status = 400
        return res.send('missing search query')
      }

      return BUILTIN_CONNECTORS[req.params.connector]
        .query(req.query.search)
        .then(queryRes => res.send(queryRes))
    })
}
