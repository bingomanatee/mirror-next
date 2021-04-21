const {USPLASH_SECRET, USPLASH_ACCESS} = process.env;
import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';
global.URL = require('url').URL;

const unsplash = createApi({
  accessKey: USPLASH_ACCESS,
  fetch: nodeFetch,
});

import axios from 'axios';
import {
  english
} from 'stopwords';
import diff from 'lodash/difference';
import sortBy from 'lodash/sortBy'

export default async function sti(str, max = 3) {
  if (!(str && typeof str === 'string')) return {
    in: [], out: []
  };
  const words = sortBy(str.split(/[\W\s]+/g), (s) => -s.length);

  return {
    in: diff(words, english).slice(0, max),
    out: await Promise.all(words.map(async(word) => {
      const result = unsplash.search.getPhotos({query: word});
      return result
    }))
  };
}
