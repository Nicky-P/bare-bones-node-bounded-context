import * as D from 'io-ts/lib/Decoder';

export const emptyRequestDec = D.type({});

export const createExampleRequestDec = D.type({
  exampleText: D.string,
  userId: D.number,
});

const ExampleResponse = D.type({
  id: D.number,
  exampleText: D.string,
  createdBy: D.number,
  updatedBy: D.number,
  updatedAt: D.string,
  createdAt: D.string,
});
export const createExampleResponseDec = ExampleResponse;
export const getExamplesResponseDec = D.array(ExampleResponse);
