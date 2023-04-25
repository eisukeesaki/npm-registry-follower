const ChangesStream = require('changes-stream');
const request = require('rock-req');

const db = 'https://replicate.npmjs.com';

var changes = new ChangesStream({
  db: db,
  include_docs: true,
});

request.get(db, (err, res, data) => { // data is type of Buffer
  const body = JSON.parse(data.toString());
  const end_sequence = body.end_seq;

  changes.on('data', (change) => {
    if (change.seq >= end_sequence)
      process.exit(0);
    console.log(change.doc);
  });
});

