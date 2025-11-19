export function formatNumber(num: number, options?: Intl.NumberFormatOptions): string {
    const defaultOptions: Intl.NumberFormatOptions = {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    };
  
    const formattedOptions = { ...defaultOptions, ...options };
  
    return num.toLocaleString(undefined, formattedOptions);
  }