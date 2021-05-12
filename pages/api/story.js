// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import getDB from "../../lib/firebase-db";

export default (req, res) => {
  const query = getDB()
    .collection('narrative')
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
}
