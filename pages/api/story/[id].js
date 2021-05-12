// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import getDB from "../../../lib/firebase-db";
import pick from "lodash/pick";

export default async function storyAPI(req, res) {
  const {id} = req.query;
  const data = req.body;

  let out;
  const db = await getDB();

  console.log('------ data: ', data, typeof data);
  const fields = pick(data, ['text', 'title', 'order', 'skips', 'image', 'primaryImage']);
  console.log('req.method:', req.method);
  switch (req.method) {
    case 'DELETE':
      const response = await db.collection('narrative').doc(id).delete();
      out = res.status(200).json(response);
      break;
    case  'POST':
      if (!Array.isArray(fields.skips)) {
        fields.skips = [];
      }
      if (!Array.isArray(fields.image)) {
        fields.image = [];
      }
      if (id) {
        console.log('updating--- ', fields);
        out = await db.collection("farm").doc(id).update(fields)
          .catch((err) => {
            console.log('error saving ', data, err);
          });
      } else {
        console.log('creating--- ', fields);
        const response = await db.collection('farm').add(fields)
          .catch((err) => {
            console.log('error creating ', fields, err);
          });
        out = res.status(200).json(response);
      }
      break;

    default:
      console.log('cannot recognize method ', req.method);
  }

  console.log('done saving/updating', id, fields);
  res.status(200).send({result: 'done'});
}
