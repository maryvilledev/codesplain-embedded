import axios from 'axios';
import _ from 'lodash'

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
      })
      .catch(err => console.error(err));
    rulesCache[lang] = allRules;
    return allRules;
  }
}


/*
Given a CodeMirror instance, styleRegion() will apply the specified css style to
the given region of code. The code is treated as a single string, and characters
in that string must be identified by their index (as opposed to row/col). Both
start and end are inclusive.
*/
export function styleRegion(codeMirror, start, end, css) {
  if (end < start) throw new Error('end must be greater than start');
  codeMirror.markText(codeMirror.posFromIndex(start), codeMirror.posFromIndex(end), { css });
}

/*
Recursive function for highlighting code in a CodeMirror. highlight() is an
exported wrapper func for this, and starts the recursion.
*/
export function highlightNode(codeMirror, node, filters, parentColor, rules, ignoredRules) {
  let color = parentColor;

  // If we aren't ignoring this token...
  if (ignoredRules.indexOf(node.type) === -1) {
    const rule = rules[node.type]; // Get the rule obj for this rule
    if (!rule) {
      return; // Remove this return and the highlighting will sometimes fail
    }
    // Use this node's color if it has one
    if (rule.color) {
      color = rule.color;
    }

    // If this token's filter is not selected
    if (!filters[node.type] || !filters[node.type].selected) {
      color = parentColor;
    }

    // Apply the background color CSS to this token
    styleRegion(codeMirror, node.begin, node.end, `background-color: ${color};`);
  }

  // Highlight all children of this token
  node.children.forEach((child) => {
    if (_.isObject(child)) { highlightNode(codeMirror, child, filters, color, rules, ignoredRules); }
  });
}

/*
Given a CodeMirror instance styleLine() will apply the specified css style to the
specified line of code in the editor. The first line is considered line 0, not 1.
*/
export function styleLine(codeMirror, line, css) {
  const lineStart = { line, ch: 0 };
  const lineEnd = { line, ch: codeMirror.getLine(line).length };
  codeMirror.markText(lineStart, lineEnd, { css });
}

/*
Given a CodeMirror instance, styleAll() will apply the specified css style to all
code in the editor.
*/
export function styleAll(codeMirror, css) {
  styleRegion(codeMirror, 0, codeMirror.getValue().length, css);
}

/*
Given a CodeMirror instance, highlight() will use the specified AST and filters
objects to apply highlighting to the code in the CodeMirror editor.
*/
export default async function highlight(codeMirror, AST, filters, language) {
  const [rules, ignoredRules] = await getRules(language);
  // Make this a first-class function
  const func = () => highlightNode(codeMirror, AST, filters, 'transparent', rules, ignoredRules);
  // Codemirror buffers its calls ahead of time, then performs them atomically
  codeMirror.operation(func);
}
