export interface MetalPriceResponse {
  status: string;
  timestamp: number;
  currency: string;
  unit: string;
  metal: string;
  rate: Record<string, number>;
}
