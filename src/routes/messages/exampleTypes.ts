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
});
export const createExampleResponseDec = ExampleResponse;
export const getExamplesResponseDec = D.array(ExampleResponse);

export const esExampleResponseDec = D.array(D.type({ exampleText: D.string }));
