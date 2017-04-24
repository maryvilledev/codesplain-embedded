import axios from 'axios';

const API_URL = process.env.API_URL;

const rulesCache = {};

// This will parse a csv into rows of columns
export const parseCSV = csv =>
  csv.split('\n')
  .slice(1, -1)
  .map(row => row.split(','));

export const getRules = async (lang) => {
  if (lang in rulesCache) {
    return rulesCache[lang];
  } else {
    const allRules = await axios.get(`${API_URL}/mappings/${lang}`)
      .then(res => parseCSV(res.data))
      .then(rows => {
        const reducer = (map, row) => {
          map[row[0]] = {
            prettyName: row[2],
            color: row[3]
          };
          return map;
        };
        const rules = rows.filter(row => row[1] === '1')
          .reduce(reducer, {});
        const ignoredRules = rows.filter(row => row[1] === '0')
          .map(row => row[0]);
        return [rules, ignoredRules];
      });
    rulesCache[lang] = allRules;
    return allRules;
  }
}
