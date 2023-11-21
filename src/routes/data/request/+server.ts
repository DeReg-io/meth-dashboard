import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { saveData } from '$lib/db/index.js';

const queries = ['3210354'];

export async function POST(req) {
	console.log('req: ', req);

	await saveData();
	return json({ done: 'done' });

	//  Call the Dune API
	// const response = await fetch(
	// 	`https://api.dune.com/api/v1/execution/01HFH7JHSVBKK45MS5H5J8F6QZ/results`,
	// 	{
	// 		method: 'GET',
	// 		headers: {
	// 			'x-dune-api-key': env.DUNE_API_KEY
	// 		}
	// 	}
	// );

	const errors: any[] = [];
	const results: any[] = [];

	await Promise.all(
		queries.map(async (query) => {
			try {
				const response = await fetch(`https://api.dune.com/api/v1/query/${query}/execute`, {
					method: 'POST',
					headers: {
						'x-dune-api-key': env.DUNE_API_KEY
					}
				});
				const text = await response.text();
				results.push({ result: text, query });
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
