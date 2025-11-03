import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symbols } = await req.json();
    
    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
      throw new Error('Symbols array is required');
    }

    console.log('Fetching stock data for:', symbols);

    // Convert NSE symbols to Yahoo Finance format (SYMBOL.NS)
    const yahooSymbols = symbols.map(symbol => {
      // If already has .NS suffix, keep it, otherwise add it
      return symbol.includes('.NS') ? symbol : `${symbol}.NS`;
    });

    // Yahoo Finance API endpoint for multiple quotes
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${yahooSymbols.join(',')}`;
    
    console.log('Fetching from Yahoo Finance:', url);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Yahoo Finance API error: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('Yahoo Finance response:', JSON.stringify(data, null, 2));

    // Format the response to match our expected format
    const formattedData = data.quoteResponse.result.map((quote: any) => {
      const currentPrice = quote.regularMarketPrice || 0;
      const previousClose = quote.regularMarketPreviousClose || currentPrice;
      const change = currentPrice - previousClose;
      const changePercent = previousClose !== 0 ? (change / previousClose) * 100 : 0;

      return {
        symbol: quote.symbol.replace('.NS', ''), // Remove .NS for display
        company_name: quote.longName || quote.shortName || quote.symbol,
        current_price: currentPrice,
        change_percent: changePercent,
        change_amount: change,
        day_high: quote.regularMarketDayHigh || currentPrice,
        day_low: quote.regularMarketDayLow || currentPrice,
        previous_close: previousClose,
        volume: quote.regularMarketVolume || 0,
        exchange: quote.exchange || 'NSE',
        last_updated: new Date().toISOString(),
        market_cap: quote.marketCap || null,
        fifty_two_week_high: quote.fiftyTwoWeekHigh || null,
        fifty_two_week_low: quote.fiftyTwoWeekLow || null,
        is_market_open: quote.marketState === 'REGULAR',
        isFallback: false
      };
    });

    return new Response(
      JSON.stringify({ success: true, data: formattedData }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error fetching stock data:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
})
