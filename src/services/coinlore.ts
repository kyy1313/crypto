export interface Crypto {
  id: string;
  symbol: string;
  name: string;
  rank: number;
  price_usd: string;
}

const API_URL = 'https://api.coinlore.net/api/tickers/';

export async function getCryptos(): Promise<Crypto[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Gagal mengambil data dari API Coinlore');
  }
  const json = await response.json();
  return json.data;
}