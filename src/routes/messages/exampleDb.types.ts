import * as D from 'io-ts/lib/Decoder';

export const emptyRequestDec = D.type({});

const exampleResponse = D.type({
  id: D.number,
  exampleText: D.string,
  createdBy: D.number,
});

export const createExampleRequestDec = D.type({
  body: D.type({
    exampleText: D.string,
    userId: D.number,
  }),
});
export const createExampleResponseDec = exampleResponse;

export const getExamplesResponseDec = D.array(exampleResponse);

export const exampleRequestPaginatedDec = D.type({
  query: D.type({
    limit: D.string,
    offset: D.string,
  }),
});
