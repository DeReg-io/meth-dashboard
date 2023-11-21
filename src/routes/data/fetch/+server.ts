import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import {
  getExecutionIdsFromQueries,
  saveWethGasSpent,
  type WethGasSpentPerDay
} from '$lib/db/index.js';

type DuneResultData = {
  rows: WethGasSpentPerDay[];
};

type DuneResponseResult = {
  execution_id: string;
  state: string;
  query_id: string;
  submitted_at: string;
  expires_at: string; // Date, usually 90 days valid
  execution_started_at: string;
  execution_ended_at: string;
  result: DuneResultData | null;
};

export async function POST(req) {
  const executionIds = await getExecutionIdsFromQueries();
  const errors: any[] = [];
  const results: any[] = [];

  await Promise.all(
    executionIds.map(async ({ executionId, queryId }) => {
      try {
        const response = await fetch(
          `https://api.dune.com/api/v1/execution/${executionId}/results`,
          {
            method: 'GET',
            headers: {
              'x-dune-api-key': env.DUNE_API_KEY
            }
          }
        );
        const text = await response.text();
        const result = JSON.parse(text) as DuneResponseResult;
        if (result.result) {
          await saveWethGasSpent(result.result.rows);
          console.log(
            `Saved ${result.result.rows.length} rows for query ${queryId}`
          );
        } else {
          errors.push({ queryId, message: 'No data returned', result });
        }
      } catch (err) {
        console.error('Error fetching data from finished query: ', err);
        errors.push(err);
      }
    })
  );

  if (errors.length) {
    return json({ errors, results });
  }

  return json({ result: 'Saved all data' });
}
