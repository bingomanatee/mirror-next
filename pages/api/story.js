// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import  {getStory} from './../../lib/firebase';

export default (req, res) => {
  getStory((doc) => {
    res.statusCode = 200
    res.json(doc)
  })
}
