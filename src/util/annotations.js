import _ from 'lodash';

export const getAnnotatedLines = annotations =>
  _.sortBy(_.keys(annotations).map(key => Number(key)));

export const getFirstAnnotation = annotations =>
  _.first(getAnnotatedLines(annotations));
