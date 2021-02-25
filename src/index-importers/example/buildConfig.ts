import * as elastic from 'elasticsearch';

var client = new elastic.Client({ host: 'localhost:9200' });
var index = 'exampleindex';

(function init() {
  Promise.resolve()
    .then(deleteIndex, errorHandler)
    .then(createIndex, errorHandler)
    .then(checkStatus, errorHandler)
    .then(closeIndex, errorHandler)
    .then(putSettings, errorHandler)
    .then(putMapping, errorHandler)
    .then(openIndex, errorHandler);
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
      body: {
        settings: {
          index: {
            number_of_replicas: 0,
          },
        },
      },
    })
    .then(handleResolve);
}

function checkStatus() {
  console.log('Checking status...');

  return client.cluster
    .health({
      index: index,
    })
    .then(handleResolve);
}

function closeIndex() {
  console.log('Closing index...');

  return client.indices
    .close({
      index: index,
    })
    .then(handleResolve);
}

function putSettings() {
  console.log('Put settings...');

  return client.indices
    .putSettings({
      index: index,
      body: {
        settings: {
          analysis: {
            analyzer: {
              folding: {
                tokenizer: 'standard',
                filter: ['lowercase', 'asciifolding'],
              },
            },
          },
        },
      },
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

function openIndex() {
  console.log('Open index ...');

  return client.indices
    .open({
      index: index,
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
