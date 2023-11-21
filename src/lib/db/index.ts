import 'dotenv/config';
import { kv } from '@vercel/kv';

export type WethGasSpentPerDay = {
  day: string; //"2017-12-18",
  total_gas_spent: number;
  total_gas_spent_usd: number | null;
};

type WethGasSpentSummary = {
  perDay: WethGasSpentPerDay[];
  total: {
    gas: number;
    usd: number;
  };
};

type WethGasSpent = {
  allTime: WethGasSpentSummary;
  year: WethGasSpentSummary;
  lastYear: WethGasSpentSummary;
  month: WethGasSpentSummary;
  lastMonth: WethGasSpentSummary;
};

type RunningQuery = {
  createdAt: string;
  executionId: string;
};

export const queryIds = ['3210354'];

function getDataSummary(data: WethGasSpentPerDay[]): WethGasSpentSummary {
  return {
    perDay: data,
    total: {
      gas: data.reduce((acc, curr) => acc + curr.total_gas_spent, 0),
      usd: data.reduce((acc, curr) => acc + (curr.total_gas_spent_usd || 0), 0)
    }
  };
}

export async function saveWethGasSpent(data: WethGasSpentPerDay[]) {
  const dataYear = data.slice(-365);
  const dataLastYear = data.slice(0, -365).slice(-365);
  const dataMonth = data.slice(-30);
  const dataLastMonth = data.slice(0, -30).slice(-30);

  await kv.json.set('wethGasSpentPerDay', '$', {
    data: {
      allTime: getDataSummary(data),
      year: getDataSummary(dataYear),
      lastYear: getDataSummary(dataLastYear),
      month: getDataSummary(dataMonth),
      lastMonth: getDataSummary(dataLastMonth)
    }
  });

  await kv.json.set('wethGasSpentAllTime', '$', {
    data: {
      gas: dataYear.reduce((acc, curr) => acc + curr.total_gas_spent, 0),
      usd: dataYear.reduce(
        (acc, curr) => acc + (curr.total_gas_spent_usd || 0),
        0
      )
    }
  });
}

export async function getWethGasSpent(): Promise<WethGasSpent> {
  const { data } = await kv.json.get('wethGasSpentPerDay');
  return data;
}

export async function saveRunningQuery(queryId: string, executionId: string) {
  await kv.json.set(`queries:${queryId}`, '$', {
    createdAt: new Date().toISOString(),
    executionId
  });
}

export async function getExecutionIdsFromQueries(): Promise<
  { executionId: string; queryId: string }[]
> {
  const result = await Promise.all(
    queryIds.map(async (queryId) => {
      const { executionId } = (await kv.json.get(
        `queries:${queryId}`
      )) as RunningQuery;
      return { executionId, queryId };
    })
  );
  return result;
}
