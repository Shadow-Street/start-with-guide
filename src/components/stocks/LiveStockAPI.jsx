import { supabase } from '@/integrations/supabase/client';

class LiveStockAPI {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 60000; // 1 minute cache for real-time data
    this.subscribers = new Map();
    this.batchTimeout = null;
    this.pendingSymbols = new Set();
    this.batchDelay = 500; // Batch requests every 500ms
  }

  // Batch fetch multiple symbols efficiently
  async fetchMultipleStocksFromAPI(symbols) {
    try {
      console.log('Fetching stocks from Yahoo Finance:', symbols);
      
      const { data, error } = await supabase.functions.invoke('yahoo-stock-data', {
        body: { symbols: Array.from(symbols) }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch stock data');
      }

      console.log('Yahoo Finance data received:', data.data);

      // Cache all results
      data.data.forEach(stock => {
        this.cache.set(stock.symbol, { ...stock, timestamp: Date.now() });
      });

      return data.data;
    } catch (error) {
      console.error('Error fetching from Yahoo Finance:', error);
      // Return fallback data for all symbols
      return Array.from(symbols).map(symbol => {
        const fallbackData = this.generateFallbackData(symbol);
        this.cache.set(symbol, { ...fallbackData, timestamp: Date.now() });
        return fallbackData;
      });
    }
  }

  // Process batched requests
  async processBatch() {
    if (this.pendingSymbols.size === 0) return;

    const symbols = Array.from(this.pendingSymbols);
    this.pendingSymbols.clear();
    
    await this.fetchMultipleStocksFromAPI(symbols);
  }

  // Get market status
  getMarketStatus() {
    const now = new Date();
    const day = now.getUTCDay();
    const hours = now.getUTCHours();
    
    const isWeekday = day >= 1 && day <= 5;
    const isMarketTime = hours >= 4 && hours < 10;
    
    return { 
      isOpen: isWeekday && isMarketTime,
      status: isWeekday && isMarketTime ? "Market Open" : "Market Closed"
    };
  }

  // Get trending stocks
  getTrendingStocks() {
    return ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'BHARTIARTL'];
  }

  // Generate fallback data when API fails
  generateFallbackData(symbol) {
    const basePrices = {
      'RELIANCE': 2456.75,
      'TCS': 3842.50,
      'HDFCBANK': 1654.30,
      'INFY': 1567.25,
      'ICICIBANK': 956.40,
      'BHARTIARTL': 1234.80,
      'SBIN': 542.30,
      'ITC': 458.90
    };

    const basePrice = basePrices[symbol] || 1000;
    const changePercent = (Math.random() - 0.5) * 4; // -2% to +2%
    const currentPrice = basePrice * (1 + changePercent / 100);
    const changeAmount = currentPrice - basePrice;

    return {
      symbol,
      company_name: `${symbol} Limited`,
      current_price: Math.round(currentPrice * 100) / 100,
      change_percent: Math.round(changePercent * 100) / 100,
      change_amount: Math.round(changeAmount * 100) / 100,
      day_high: Math.round(currentPrice * 1.02 * 100) / 100,
      day_low: Math.round(currentPrice * 0.98 * 100) / 100,
      previous_close: basePrice,
      volume: Math.floor(Math.random() * 1000000) + 500000,
      exchange: 'NSE',
      last_updated: new Date().toISOString(),
      isFallback: true
    };
  }


  // Main method to get stock price
  async getStockPrice(symbol) {
    if (!symbol) return null;

    // Check cache first
    const cached = this.cache.get(symbol);
    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return cached;
    }

    // Add to pending batch
    this.pendingSymbols.add(symbol);

    // Clear existing timeout
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
    }

    // Set new timeout to process batch
    this.batchTimeout = setTimeout(() => {
      this.processBatch();
    }, this.batchDelay);

    // Wait for batch to complete and return from cache
    await new Promise(resolve => setTimeout(resolve, this.batchDelay + 1000));
    return this.cache.get(symbol) || this.generateFallbackData(symbol);
  }

  // Fetch multiple stocks with proper queuing
  async getMultipleStocks(symbols) {
    const promises = symbols.map(symbol => this.getStockPrice(symbol));
    const results = await Promise.all(promises);
    return results.filter(r => r !== null);
  }

  // Subscribe to updates (every 30 seconds for real-time feel)
  subscribe(symbol, callback) {
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, []);
    }
    this.subscribers.get(symbol).push(callback);

    // Start periodic updates
    const updateInterval = setInterval(async () => {
      const data = await this.getStockPrice(symbol);
      if (data && this.subscribers.has(symbol)) {
        this.subscribers.get(symbol).forEach(cb => cb(data));
      }
    }, 30000); // 30 seconds for more real-time updates

    // Return unsubscribe function
    return () => {
      clearInterval(updateInterval);
      const symbolSubscribers = this.subscribers.get(symbol);
      if (symbolSubscribers) {
        const index = symbolSubscribers.indexOf(callback);
        if (index > -1) {
          symbolSubscribers.splice(index, 1);
        }
      }
    };
  }
}

// Export singleton instance
export const stockAPI = new LiveStockAPI();