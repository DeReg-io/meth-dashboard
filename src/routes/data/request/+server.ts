import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { queryIds, saveRunningQuery } from '$lib/db/index.js';

type DuneResponseExecute = {
  execution_id: string;
  state: string;
};

export async function POST(req) {
  const errors: any[] = [];
  const results: any[] = [];

  await Promise.all(
    queryIds.map(async (query) => {
      try {
        const response = await fetch(
          `https://api.dune.com/api/v1/query/${query}/execute`,
          {
            method: 'POST',
            headers: {
              'x-dune-api-key': env.DUNE_API_KEY
            }
          }
        );
        const text = await response.text();
        results.push({ result: text, query });
        const result = JSON.parse(text) as DuneResponseExecute;
        await saveRunningQuery(query, result.execution_id);
        console.log(
          'saved running query: ',
          query,
          ', execution_id: ',
          result.execution_id
        );
      } catch (err) {
        console.error('Error requesting dune query execution: ', err);
        errors.push(err);
      }
    })
  );

  if (errors.length) {
    return json({ errors, results });
  }

  return json({ results });
}
