import * as D from 'io-ts/lib/Decoder';

export const createExampleRequestDec = D.type({
  exampleText: D.string,
  userId: D.number,
});

export const emptyRequestDec = D.type({});
