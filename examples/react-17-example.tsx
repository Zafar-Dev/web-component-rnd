// examples/react-17-example.tsx
// Example for React 17 applications
import React from 'react';
import { WeatherWidget, getReactVersion, supportsModernReact } from 'react-web-component-widget';

function App() {
  React.useEffect(() => {
    console.log('React version:', getReactVersion());
    console.log('Supports modern React (18+):', supportsModernReact());
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px', flexDirection: 'column' }}>
      <h1>React 17 Compatibility Test</h1>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
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

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Compatibility Info</h3>
        <p>React Version: {getReactVersion()}</p>
        <p>Modern React Support: {supportsModernReact() ? 'Yes (React 18+)' : 'No (Legacy React 17)'}</p>
      </div>
    </div>
  );
}

export default App;
