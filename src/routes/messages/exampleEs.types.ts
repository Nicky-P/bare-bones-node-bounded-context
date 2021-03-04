import * as D from 'io-ts/lib/Decoder';
import { pipe } from 'fp-ts/function';
import * as t from 'io-ts';

interface ShardsResponse {
  total: number;
  successful: number;
  failed: number;
  skipped: number;
}

interface Explanation {
  value: number;
  description: string;
  details: Explanation[];
}

export interface ExampleSuggestionResponse<T> {
  took: number;
  timed_out: boolean;
  _scroll_id?: string;
  _shards: ShardsResponse;
  hits: {
    total: {
      value: number;
      relation: string;
    };
    max_score: number;
    hits: Array<{
      _index: string;
      _type: string;
      _id: string;
      _score: number;
      _source: T;
      _version?: number;
      _explanation?: Explanation;
      fields?: any;
      highlight?: any;
      inner_hits?: any;
      matched_queries?: string[];
      sort?: string[];
    }>;
  };
  suggest: {
    exampleAutoComplete: Array<{
      text: string;
      offset: number;
      length: number;
      options: Array<{
        text: string;
        _index: string;
        _type: string;
        _id: string;
        _score: number;
        _source: T;
      }>;
    }>;
  };
  aggregations?: any;
}

export const esExampleRequestDec = pipe(
  D.type({
    query: D.type({
      queryText: D.string,
    }),
  }),
  D.intersect(
    D.partial({
      size: D.string,
    })
  )
);
export const esExampleResponseDec = D.type({ exampleSuggestions: D.array(D.string) });
