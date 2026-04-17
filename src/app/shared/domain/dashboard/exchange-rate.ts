type Rates = Record<string, number>;

interface BaseResponse {
  success: boolean;
  base?: string;
  date?: string;
  // there might be more depending on endpoint, e.g. timestamp, query info, etc.
}

interface SymbolsResponse extends BaseResponse {
  symbols: Record<string, string>;
}

interface LatestRatesResponse extends BaseResponse {
  rates: Rates;
  timestamp?: number;
}

interface HistoricalRatesResponse extends BaseResponse {
  rates: Rates;
  historical?: boolean;
}

interface ConvertResponse extends BaseResponse {
  query: {
    from: string;
    to: string;
    amount: number;
    date?: string;
  };
  info: {
    rate: number;
    timestamp?: number;
  };
  result: number;
  date?: string;
}

interface TimeSeriesResponse extends BaseResponse {
  rates: Record<string, Rates>;
  start_date: string;
  end_date: string;
}

interface FluctuationResponse extends BaseResponse {
  rates: Record<string, {
    start_rate: number;
    end_rate: number;
    change: number;
    change_pct: number;
  }>;
  start_date: string;
  end_date: string;
}

export {
  SymbolsResponse,
  LatestRatesResponse,
  HistoricalRatesResponse,
  ConvertResponse,
  TimeSeriesResponse,
  FluctuationResponse
};
