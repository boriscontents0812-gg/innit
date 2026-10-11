export interface CountryConfig {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  flag: string;
}

export const SUPPORTED_COUNTRIES: CountryConfig[] = [
  { code: "US", name: "United States", currency: "USD", currencySymbol: "$", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", currency: "GBP", currencySymbol: "£", flag: "🇬🇧" },
  { code: "EU", name: "European Union", currency: "EUR", currencySymbol: "€", flag: "🇪🇺" },
  { code: "NZ", name: "New Zealand", currency: "NZD", currencySymbol: "NZ$", flag: "🇳🇿" },
  { code: "AU", name: "Australia", currency: "AUD", currencySymbol: "A$", flag: "🇦🇺" },
  { code: "CA", name: "Canada", currency: "CAD", currencySymbol: "CA$", flag: "🇨🇦" },
  { code: "JP", name: "Japan", currency: "JPY", currencySymbol: "¥", flag: "🇯🇵" },
];

// Approximate real-time baseline conversion rates to USD (1 USD = X Currency)
export const EXCHANGE_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.78,
  NZD: 1.68,
  AUD: 1.54,
  CAD: 1.38,
  JPY: 154.5,
};

export function convertPrice(amountInUsd: number, targetCurrency: string): number {
  const rate = EXCHANGE_RATES[targetCurrency] || 1.0;
  const converted = amountInUsd * rate;
  if (targetCurrency === "JPY") {
    return Math.round(converted);
  }
  return Math.round(converted * 100) / 100;
}

export function formatPrice(amountInUsd: number, targetCurrency: string = "USD"): string {
  const symbol = SUPPORTED_COUNTRIES.find((c) => c.currency === targetCurrency)?.currencySymbol || "$";
  const converted = convertPrice(amountInUsd, targetCurrency);
  
  if (targetCurrency === "JPY") {
    return `${symbol}${converted.toLocaleString()}`;
  }
  
  return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
