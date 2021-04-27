const UNSPLASH_ACCESS = process.env.UNSPLASH_ACCESS;
console.log('unsplash access: ', UNSPLASH_ACCESS);

import groupBy from 'lodash/groupBy';
import nodeFetch from 'node-fetch';
import pick from 'lodash/pick';
import { inspect } from 'util';
import flattenDeep from 'lodash/flattenDeep';

const unsplashUrl = 'https://api.unsplash.com/search/photos/?client_id=' + UNSPLASH_ACCESS;
console.log('---- unsplashUrl: ', unsplashUrl);

import axios from 'axios';
import {
  english
} from 'stopwords';
import diff from 'lodash/difference';
import sortBy from 'lodash/sortBy'

const DEF_FIELDS = ['id', 'width', 'height', 'urls', 'color']
export default async function sti(str, maxWords = 3, maxImages = 3, fields = DEF_FIELDS) {
  if (!(str && typeof str === 'string')) {
    return {
      in: [], out: []
    };
  }
  const words = sortBy(str.split(/[\W\s]+/g), (s) => -s.length);
  const inWords = diff(words, english).slice(0, maxWords);
  const response = await Promise.all(inWords.map(async (word) => {
    try {
      const {data: result} = await axios.get(unsplashUrl + '&query=' + encodeURIComponent(word));


      const images = result.results.slice(0, maxImages);
      if (fields) {
        return images.map((img) => {
            try {
              const out = {word};
              Object.assign(out, pick(img, fields));
              return out;
            } catch (err) {
              console.log('error in stringToImage:', err);
              return img;
            }
          }
        )
          .map((img) => {
            if (img.urls && (typeof img.urls === 'object')) {
              return {...img.urls, ...img};
            }
            return img;
          })
      }
      return images;
    } catch (err) {
      console.log('stringToImage error: ', err);
      return [];
    }
  }));
  const images = groupBy(flattenDeep(response), 'word');
  return {
    in: inWords,
    out: images
  };
}
