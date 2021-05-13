// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import getDB from "../../lib/firebase-db";
import pick from "lodash/pick";

export default async (req, res) => {
  const data = req.body || {};

  const db = await getDB();

  console.log('------ data: ', data, typeof data);
  const fields = pick(data, ['text', 'title', 'order', 'skips', 'image', 'primaryImage']);
  console.log('req.method:', req.method);
  switch (req.method) {
    case 'GET':
      const query = getDB()
        .collection('narration')
        .orderBy('order', 'asc')
        .get()
        .then((snap) => {
          let story = [];
          snap.forEach((record) => {
            story.push({id: record.id, ...record.data()})
          })
          res.status(200).json(story);
        })
        .catch((err) => {
          console.log('error getting story:', err.message);
          res.status(5000).send(err.message);
        })
      break;
    case  'POST':
        console.log('creating--- ', fields);
        const response = await db.collection('narration').add(fields)
          .catch((err) => {
            console.log('error creating ', fields, err);
          });
        res.status(200).json(response);
      break;

    default:
      console.log('cannot recognize method ', req.method);
      res.send('unknown method for story api')
  }
}
