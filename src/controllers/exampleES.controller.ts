import { Request, Response, NextFunction } from 'express';
import { Client } from '@elastic/elasticsearch';
import { assignEsResValidatorValues } from '../utils/helpers';
import { esExampleResponseDec } from '../routes/messages/exampleTypes';

const client = new Client({ node: 'http://localhost:9200' });

// Define the type of the body for the Search request
interface SearchBody {
  query: {
    match_all: {};
  };
}

// Complete definition of the Search response
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

export interface SearchResponse<T> {
  took: number;
  timed_out: boolean;
  _scroll_id?: string;
  _shards: ShardsResponse;
  hits: {
    total: number;
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
  aggregations?: any;
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
  const response = await client.search<SearchResponse<String>, SearchBody>({
    index: 'example',
    body: {
      query: {
        match_all: {},
      },
    },
  });
  try {
    console.log(response.body);
    assignEsResValidatorValues(res, response.body, esExampleResponseDec);
    next();
  } catch (e) {
    res.status(500).send({
      message: e.message || 'Some error occurred while retriving examples from Elasticsearch',
    });
  }
}
