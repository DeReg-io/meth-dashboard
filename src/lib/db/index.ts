import { kv } from '@vercel/kv';

export async function saveData() {
	const test = await kv.json.set('tes:1', '$', {
		zeug: [1, 2, 3]
	});
	console.log('test: ', test);
}
