import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Shield } from 'lucide-react';

const apiFields = [
  { key: 'stock_data_api_key', label: 'Stock Data API Key', placeholder: 'Enter your stock data API key (e.g., Alpha Vantage, Finnhub)' },
  { key: 'news_api_key', label: 'News API Key', placeholder: 'Enter your NewsAPI.org or other news provider key' },
  { key: 'google_maps_api_key', label: 'Google Maps API Key', placeholder: 'Enter your Google Maps platform key for location features' },
];

export default function ManageApiCredentials({ settings, onChange }) {
  const handleInputChange = (key, value) => {
    onChange({ [key]: value });
  };

  return (
    <div className="space-y-6">
      <Alert className="border-amber-200 bg-amber-50">
        <Shield className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Security Notice:</strong> API credentials are stored encrypted in the database. 
          For maximum security, consider using Supabase Secrets for backend API keys and only store 
          publishable keys here if they need to be accessed from the frontend.
        </AlertDescription>
      </Alert>

      {apiFields.map(field => (
        <div key={field.key} className="space-y-2">
          <Label htmlFor={field.key} className="font-semibold">{field.label}</Label>
          <Input
            id={field.key}
            type="password"
            value={settings[field.key] || ''}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            placeholder={field.placeholder}
          />
          <p className="text-xs text-muted-foreground">
            This key is sensitive and will not be shown again once saved. Make sure to save it securely.
          </p>
        </div>
      ))}
      
      <Alert className="border-blue-200 bg-blue-50">
        <AlertTriangle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 text-sm">
          <strong>Best Practice:</strong> For API keys used in backend operations (edge functions), 
          use Supabase Secrets instead of storing them in the database. This provides better security 
          and prevents accidental exposure.
        </AlertDescription>
      </Alert>
    </div>
  );
}