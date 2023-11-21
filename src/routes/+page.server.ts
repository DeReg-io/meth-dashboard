import { getWethGasSpent } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  return await getWethGasSpent();
}) satisfies PageServerLoad;
