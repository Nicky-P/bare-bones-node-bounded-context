import { Request, Response, NextFunction } from 'express';
import { Client } from '@elastic/elasticsearch';
import { assignEsResValidatorValues } from '../utils/helpers';
import { ExampleSuggestionResponse, SearchBody, esExampleResponseDec } from '../routes/messages/exampleEs.types';

const client = new Client({ node: 'http://localhost:9200' });

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await client.search<ExampleSuggestionResponse<String>>({
      index: 'exampleindex',
      body: {
        suggest: {
          exampleAutoComplete: {
            prefix: req.query.queryText,
            completion: {
              field: 'example',
              size: 3,
              fuzzy: {
                fuzziness: 2,
              },
            },
          },
        },
      },
    });
    const suggestions = { exampleSuggestions: response.body.suggest.exampleAutoComplete[0].options.map(res => res.text) };
    assignEsResValidatorValues(res, suggestions, esExampleResponseDec);
    next();
  } catch (e) {
    res.status(500).send({
      message: e.message || 'Some error occurred while retriving examples from Elasticsearch',
    });
  }
}
