// examples/react-example.tsx
import React from 'react';
import { WeatherWidget } from '@your-org/react-web-component-widget';

function App() {
  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* Basic usage */}
      <WeatherWidget />
      
      {/* With custom props */}
      <WeatherWidget 
        city="New York"
        theme="dark"
        showForecast={true}
      />
      
      {/* With custom styling */}
      <WeatherWidget 
        city="Tokyo"
        theme="light"
        style={{ 
          width: '350px', 
          height: '300px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
        className="custom-weather-widget"
      />
    </div>
  );
}

export default App;
