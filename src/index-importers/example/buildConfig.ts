import * as elastic from 'elasticsearch';

var client = new elastic.Client({ host: 'localhost:9200' });
var index = 'exampleindex';

(function init() {
  Promise.resolve().then(deleteIndex, errorHandler).then(createIndex, errorHandler).then(putMapping, errorHandler);
})();

function deleteIndex() {
  console.log(`Deleting index ${index}...`);

  return client.indices
    .delete({
      index: index,
      ignore: [404],
    })
    .then(handleResolve);
}

function createIndex() {
  console.log(`Creating index ${index}...`);

  return client.indices
    .create({
      index: index,
    })
    .then(handleResolve);
}

function putMapping() {
  console.log('Put mapping...');

  return client.indices
    .putMapping({
      index: index,
      type: 'document',
      includeTypeName: true,
      body: {
        properties: {
          example: {
            type: 'completion',
          },
        },
      },
    })
    .then(handleResolve);
}

function handleResolve(body: any) {
  if (!body.error) {
    console.log('\x1b[32m' + 'Success' + '\x1b[37m');
  } else {
    console.log('\x1b[33m' + 'Failed' + '\x1b[37m');
  }

  return Promise.resolve();
}

function errorHandler(err: any) {
  console.error(JSON.stringify(err.body, null, 2));

  return Promise.reject();
}
