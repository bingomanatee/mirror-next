import axios from 'axios';
import Story from "./mirrors/Story";

export function getStory(render) {
  axios.get('/api/story')
    .then(({data}) => render(data.filter(item => ((!item.ignore) && item.title)).map(dataItem => new Story(dataItem))))
    .catch(err => {
      console.log('error in getStory: ', err.message);
      render([]);
    })
}

export function saveStory(id, data) {
  console.log('saveStory: saving data:', id, 'data = ', data)
  if (id) {
    return axios.post('/api/story/' + id,   data)
      .then(({data: response}) => {
        console.log('response:', response);
        return response;
      })
      .catch(err => {
        console.log('error saving ', id, data,':', err);
      })
  }
  return axios.post('/api/story',   data)
    .then(({data: response}) => {
      console.log('response:', response);
      return response;
    })
    .catch(err => {
      console.log('error saving ', id, data,':', err);
    })
}

export function deleteStory(id) {
  return axios.delete('/api/story/' + id)
    .then(({data}) => data)
}
